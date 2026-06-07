// Central, validated environment config. Import `env` everywhere instead of
// reaching into process.env directly so misconfiguration fails loud and early.

import dotenv from "dotenv";

dotenv.config();

const required = (key, fallback) => {
  const v = process.env[key] ?? fallback;
  if (v === undefined || v === "") {
    throw new Error(`Missing required env var: ${key}`);
  }
  return v;
};

const isProd = process.env.NODE_ENV === "production";

// Allowlist of emails permitted to access the admin panel. This is the single
// source of truth for who can request an OTP, verify it, and reach any /admin
// route — a DB "admin" role alone is NOT enough. Set ADMIN_EMAILS to a comma-
// separated list; falls back to SEED_ADMIN_EMAIL so the seeded admin always works.
const adminEmails = (process.env.ADMIN_EMAILS || process.env.SEED_ADMIN_EMAIL || "admin@myholidaybro.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  isProd,
  port: Number(process.env.PORT || 5000),

  mongoUri: required("MONGODB_URI", "mongodb://127.0.0.1:27017/myholidaybro"),

  jwtSecret: required("JWT_SECRET", isProd ? undefined : "dev-insecure-secret-change-me"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:3000,http://localhost:5173")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  seedAdmin: {
    name: process.env.SEED_ADMIN_NAME || "MHB Admin",
    email: (process.env.SEED_ADMIN_EMAIL || "admin@myholidaybro.com").toLowerCase(),
    password: process.env.SEED_ADMIN_PASSWORD || "Admin@12345",
  },

  // Emails allowed to access the admin panel (see note above).
  adminEmails,

  // ─── AWS S3 (media storage) ───────────────────────────────────────────
  // Enabled only when bucket + credentials are present, so the API still runs
  // without storage configured.
  s3: {
    region: process.env.AWS_REGION || "ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    bucket: process.env.S3_BUCKET || "",
    // Public base for object URLs (CloudFront/CDN or the S3 website endpoint).
    // Falls back to the virtual-hosted S3 URL when unset.
    publicBaseUrl: (process.env.S3_PUBLIC_BASE_URL || "").replace(/\/$/, ""),
    uploadPrefix: process.env.S3_UPLOAD_PREFIX || "uploads",
    get enabled() {
      return Boolean(this.bucket && this.accessKeyId && this.secretAccessKey);
    },
  },

  // ─── AWS SES (transactional email) ────────────────────────────────────
  // Preferred email transport when configured. Uses a dedicated IAM key so it
  // never collides with the S3 credentials above. Falls back to the generic
  // AWS_* vars if the SES-specific ones aren't set.
  ses: {
    region: process.env.AWS_SES_REGION || process.env.AWS_REGION || "ap-south-1",
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || "",
    fromEmail: process.env.AWS_SES_FROM_EMAIL || "",
    fromName: process.env.AWS_SES_FROM_NAME || "",
    // In SES sandbox mode you can only send TO verified addresses; this is the
    // verified test recipient.
    verifiedEmail: process.env.AWS_SES_VERIFIED_EMAIL || "",
    get enabled() {
      return Boolean(this.accessKeyId && this.secretAccessKey && this.fromEmail);
    },
  },

  // ─── Brevo (transactional email + contacts) ───────────────────────────
  brevo: {
    apiKey: process.env.BREVO_API_KEY || "",
    newsletterListId: process.env.BREVO_NEWSLETTER_LIST_ID
      ? Number(process.env.BREVO_NEWSLETTER_LIST_ID)
      : null,
    get enabled() {
      return Boolean(this.apiKey);
    },
  },

  mail: {
    fromEmail: process.env.MAIL_FROM_EMAIL || "no-reply@myholidaybro.com",
    fromName: process.env.MAIL_FROM_NAME || "MyHolidayBro",
    // Where new-enquiry / new-booking notifications are sent internally.
    adminNotify: process.env.ADMIN_NOTIFY_EMAIL || "contact@myholidaybro.com",
  },

  // Public site base, used to build links in emails.
  siteUrl: (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
};

/** True only if `email` is on the .env admin allowlist (case-insensitive). */
export const isAllowedAdminEmail = (email) =>
  env.adminEmails.includes(String(email || "").trim().toLowerCase());

if (env.adminEmails.length === 0) {
  console.warn("[env] ADMIN_EMAILS is empty — no one can access the admin panel.");
}
