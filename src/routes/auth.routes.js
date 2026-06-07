import { Router } from "express";
import { signup, login, me } from "../controllers/auth.controller.js";
import { requestAdminOtp, verifyAdminOtp } from "../controllers/adminAuth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { authLimiter } from "../middleware/rateLimit.js";
import {
  signupSchema, loginSchema, otpRequestSchema, otpVerifySchema,
} from "../validators/auth.validators.js";

const router = Router();

router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), login);
router.get("/me", requireAuth, me);

// Passwordless admin login (email OTP).
router.post("/admin/otp/request", authLimiter, validate(otpRequestSchema), requestAdminOtp);
router.post("/admin/otp/verify", authLimiter, validate(otpVerifySchema), verifyAdminOtp);

export default router;
