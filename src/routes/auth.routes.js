import { Router } from "express";
import { login, me } from "../controllers/auth.controller.js";
import { requestAdminOtp, verifyAdminOtp } from "../controllers/adminAuth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { authLimiter } from "../middleware/rateLimit.js";
import {
  loginSchema, otpRequestSchema, otpVerifySchema,
} from "../validators/auth.validators.js";

const router = Router();

// Customer self-registration (/signup) is disabled — the website no longer has
// customer accounts. `login` + `me` are kept because the admin panel uses them
// (alongside the admin email-OTP flow below). The signup controller/validator
// files are left in place for an easy future re-enable.
router.post("/login", authLimiter, validate(loginSchema), login);
router.get("/me", requireAuth, me);

// Passwordless admin login (email OTP).
router.post("/admin/otp/request", authLimiter, validate(otpRequestSchema), requestAdminOtp);
router.post("/admin/otp/verify", authLimiter, validate(otpVerifySchema), verifyAdminOtp);

export default router;
