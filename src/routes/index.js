// Mounts every route group under /api and exposes a health check.

import { Router } from "express";
import authRoutes from "./auth.routes.js";
import publicRoutes from "./public.routes.js";
import accountRoutes from "./account.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

router.use("/auth", authRoutes);
router.use("/account", accountRoutes);
router.use("/admin", adminRoutes);

// Public read + form endpoints mount at the /api root (e.g. /api/destinations).
// Mounted last so the named groups above take precedence.
router.use("/", publicRoutes);

export default router;
