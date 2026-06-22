// Mounts every route group under /api and exposes a health check.

import { Router } from "express";
import authRoutes from "./auth.routes.js";
import publicRoutes from "./public.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

router.use("/auth", authRoutes);
// Customer self-service (/account: profile, wishlist sync, bookings) is
// disabled while the site has no customer accounts. The route file
// (account.routes.js) is kept in place for an easy future re-enable.
router.use("/admin", adminRoutes);

// Public read + form endpoints mount at the /api root (e.g. /api/destinations).
// Mounted last so the named groups above take precedence.
router.use("/", publicRoutes);

export default router;
