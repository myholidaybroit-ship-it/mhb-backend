// Authentication & authorisation middleware.
//   requireAuth  → rejects unless a valid Bearer token is present, loads req.user
//   requireAdmin → requireAuth + role === "admin"
//   optionalAuth → attaches req.user if a token is present, never rejects

import { verifyToken } from "../utils/token.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/index.js";
import { isAllowedAdminEmail } from "../config/env.js";

function extractToken(req) {
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) return header.slice(7).trim();
  return null;
}

async function loadUser(req) {
  const token = extractToken(req);
  if (!token) return null;
  const payload = verifyToken(token); // throws on invalid/expired
  const user = await User.findById(payload.sub);
  return user || null;
}

export async function requireAuth(req, _res, next) {
  try {
    const user = await loadUser(req);
    if (!user) throw ApiError.unauthorized();
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof ApiError) return next(err);
    next(ApiError.unauthorized("Invalid or expired session"));
  }
}

export async function requireAdmin(req, res, next) {
  await requireAuth(req, res, (err) => {
    if (err) return next(err);
    // Defense in depth: every /admin route requires BOTH the admin role AND an
    // email on the .env allowlist — so a token minted any other way (e.g. the
    // password login) still can't reach admin endpoints unless allowlisted.
    if (req.user.role !== "admin" || !isAllowedAdminEmail(req.user.email)) {
      return next(ApiError.forbidden("Admin access required"));
    }
    next();
  });
}

export async function optionalAuth(req, _res, next) {
  try {
    req.user = await loadUser(req);
  } catch {
    req.user = null;
  }
  next();
}
