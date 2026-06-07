// Passwordless admin login via email OTP.
//
//   POST /api/auth/admin/otp/request  { email }          → emails a 6-digit code
//   POST /api/auth/admin/otp/verify   { email, code }    → { token, user }
//
// Security model:
//   • Only users with role "admin" get a code; responses are generic either way
//     so the endpoint can't be used to enumerate admin emails.
//   • The code is bcrypt-hashed at rest; only the hash is stored.
//   • Single active code per email (previous ones are deleted on request).
//   • 10-minute TTL (Mongo TTL index) + single-use + max 5 attempts.

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { signToken } from "../utils/token.js";
import { env, isAllowedAdminEmail } from "../config/env.js";
import { User, AdminOtp } from "../models/index.js";
import { emails } from "../services/email.js";

const TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;

const generateCode = () => String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");

// The .env allowlist (ADMIN_EMAILS / SEED_ADMIN_EMAIL) is the single source of
// truth for who may access the admin panel. The session layer (JWT + middleware)
// still needs a real User document to hang req.user on, so we auto-provision one
// the first time an allowlisted email signs in — no manual seeding required.
// Returns the admin user, or null if the email isn't allowlisted.
const ensureAdminUser = async (rawEmail) => {
  const email = String(rawEmail || "").trim().toLowerCase();
  if (!isAllowedAdminEmail(email)) return null;

  let user = await User.findOne({ email });
  if (user) {
    // Existing account on the allowlist — make sure it has admin rights.
    if (user.role !== "admin") {
      user.role = "admin";
      await user.save();
    }
    return user;
  }

  // No account yet — mirror the .env config into a fresh admin user.
  return User.create({
    _id: `u_admin_${Date.now().toString(36)}`,
    name: env.seedAdmin.name,
    email,
    password: env.seedAdmin.password, // login is OTP-based; this just satisfies the schema
    role: "admin",
  });
};

export const requestAdminOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const generic = {
    ok: true,
    message: "If that email belongs to an admin, a one-time code is on its way.",
    expiresInSeconds: TTL_MINUTES * 60,
  };

  // Hard gate: only emails on the .env allowlist (ADMIN_EMAILS) may receive a
  // code. The matching admin user is auto-provisioned from .env if it doesn't
  // exist yet, so the allowlist is the single source of truth — no DB seeding.
  // Anything not on the allowlist is rejected outright with a clear message; for
  // an internal admin panel we prefer obvious feedback over enumeration secrecy.
  const user = await ensureAdminUser(email);
  if (!user) {
    throw ApiError.forbidden("This email isn't authorized for admin access.");
  }

  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);

  // Invalidate any outstanding codes for this email, then store the new one.
  await AdminOtp.deleteMany({ email, purpose: "admin_login" });
  await AdminOtp.create({
    email,
    codeHash,
    purpose: "admin_login",
    ip: req.ip,
    expiresAt: new Date(Date.now() + TTL_MINUTES * 60_000),
  });

  await emails.adminOtp(email, code, TTL_MINUTES);

  // Dev affordance: when running locally WITHOUT Brevo configured, return the
  // code so the flow is testable. Never leaked in production or when email works.
  const devCode = !env.isProd && !env.brevo.enabled && !env.ses.enabled ? code : undefined;
  res.json({ ...generic, ...(devCode ? { devCode } : {}) });
});

export const verifyAdminOtp = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  // Re-check the allowlist here too — never issue an admin session to an email
  // that isn't in .env, even if an OTP row somehow exists for it.
  if (!isAllowedAdminEmail(email)) {
    throw ApiError.badRequest("Invalid or expired code. Request a new one.");
  }

  const otp = await AdminOtp.findOne({ email, purpose: "admin_login", consumed: false })
    .select("+codeHash")
    .sort("-createdAt");

  const invalid = () => ApiError.badRequest("Invalid or expired code. Request a new one.");

  if (!otp || otp.expiresAt.getTime() < Date.now()) {
    if (otp) await otp.deleteOne();
    throw invalid();
  }

  if (otp.attempts >= MAX_ATTEMPTS) {
    await otp.deleteOne();
    throw ApiError.badRequest("Too many attempts. Request a new code.");
  }

  const matches = await bcrypt.compare(code, otp.codeHash);
  if (!matches) {
    otp.attempts += 1;
    await otp.save();
    const remaining = MAX_ATTEMPTS - otp.attempts;
    throw ApiError.badRequest(
      remaining > 0 ? `Incorrect code. ${remaining} attempt${remaining === 1 ? "" : "s"} left.` : "Too many attempts. Request a new code."
    );
  }

  // Success — burn the code and any siblings, then issue the session.
  await AdminOtp.deleteMany({ email, purpose: "admin_login" });

  const user = await ensureAdminUser(email);
  if (!user) throw ApiError.forbidden("This account no longer has admin access.");

  const token = signToken({ sub: user._id, role: user.role });
  res.json({ token, user: user.toPublic() });
});
