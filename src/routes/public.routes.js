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

const router = Router();

// ── Singleton content sections ──────────────────────────────────────────
router.get("/content", getAllSingletons);          // every section in one map
router.get("/content/:key", getSingleton);         // home | nav | footer | …

// ── Read-only catalog collections (destinations, weekends, moments, …) ────
for (const resource of PUBLIC_RESOURCES) {
  const c = makeCrudController(resource);
  router.get(`/${resource.path}`, c.list);
  router.get(`/${resource.path}/:id`, c.getOne);
}

// ── Public form intake ────────────────────────────────────────────────────
router.post("/enquiries", formLimiter, validate(enquirySchema), createEnquiry);
router.post("/newsletter", formLimiter, validate(newsletterSchema), subscribe);
router.post("/newsletter/subscribe", formLimiter, validate(newsletterSchema), subscribe); // alias

export default router;
