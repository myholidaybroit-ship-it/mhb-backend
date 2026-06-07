// One-time passcodes for passwordless admin login.
//
// The code itself is never stored — only a bcrypt hash. Documents auto-expire
// via a TTL index on `expiresAt`, and each code is single-use and
// attempt-limited to blunt brute force against the small (6-digit) keyspace.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    codeHash: { type: String, required: true, select: false },
    purpose: { type: String, default: "admin_login" },
    attempts: { type: Number, default: 0 },
    consumed: { type: Boolean, default: false },
    ip: { type: String, default: "" },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

// TTL: Mongo removes the document once `expiresAt` passes.
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AdminOtp = mongoose.model("AdminOtp", schema, "admin_otps");
