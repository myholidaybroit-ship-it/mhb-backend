// Accounts for both public travellers (role "customer") and CMS operators
// (role "admin"). Passwords are bcrypt-hashed and never serialised.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String }, // e.g. "u_demo01"; auto-generated if omitted
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["customer", "admin"], default: "customer", index: true },
    phone: { type: String, default: "" },
    city: { type: String, default: "" },
    prefs: {
      emails: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: true },
    },
  },
  { timestamps: true, versionKey: false, minimize: false }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Safe shape sent to clients — never leaks the password hash.
userSchema.methods.toPublic = function toPublic() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    phone: this.phone,
    city: this.city,
    prefs: this.prefs,
    createdAt: this.createdAt,
  };
};

export const User = mongoose.model("User", userSchema);
