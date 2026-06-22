// Public, read-only content + the public write endpoints (enquiries, newsletter).

import { Router } from "express";
import { makeCrudController } from "../utils/crudFactory.js";
import { PUBLIC_RESOURCES } from "../config/resources.js";
import { getSingleton, getAllSingletons } from "../controllers/content.controller.js";
import { createEnquiry } from "../controllers/enquiry.controller.js";
import { subscribe } from "../controllers/newsletter.controller.js";
import { validate } from "../middleware/validate.js";
import { formLimiter } from "../middleware/rateLimit.js";
import { enquirySchema, newsletterSchema } from "../validators/enquiry.validators.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Destination } from "../models/index.js";
import { ensurePackageSlugs } from "../utils/packageSlugs.js";

const router = Router();

// ── Singleton content sections ──────────────────────────────────────────
router.get("/content", getAllSingletons);          // every section in one map
router.get("/content/:key", getSingleton);         // home | nav | footer | …

// ── Single package within a destination (its own SEO detail page) ─────────
// Declared before the generic /destinations/:id route so the extra path
// segment matches here. Returns the package plus its parent destination so the
// detail page has full context (rating, best time, inclusions, …).
router.get("/destinations/:id/packages/:packageSlug", asyncHandler(async (req, res) => {
  const dest = await Destination.findById(req.params.id).lean();
  if (!dest) throw ApiError.notFound("Destination not found");
  ensurePackageSlugs(dest);
  const pkg = (dest.packages || []).find((p) => p.slug === req.params.packageSlug);
  if (!pkg) throw ApiError.notFound("Package not found");
  res.json({ data: { destination: dest, package: pkg } });
}));

// ── Read-only catalog collections (destinations, weekends, moments, …) ────
for (const resource of PUBLIC_RESOURCES) {
  const c = makeCrudController(resource, { scope: "public" });
  router.get(`/${resource.path}`, c.list);
  router.get(`/${resource.path}/:id`, c.getOne);
}

// ── Public form intake ────────────────────────────────────────────────────
router.post("/enquiries", formLimiter, validate(enquirySchema), createEnquiry);
router.post("/newsletter", formLimiter, validate(newsletterSchema), subscribe);
router.post("/newsletter/subscribe", formLimiter, validate(newsletterSchema), subscribe); // alias

export default router;
