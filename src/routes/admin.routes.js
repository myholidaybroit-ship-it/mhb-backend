// Admin API. Every route requires an authenticated user with role "admin".
// Generic CRUD is generated for every registered resource; bespoke endpoints
// handle content sections, users, bookings, newsletter and export/import.

import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { makeCrudController } from "../utils/crudFactory.js";
import { RESOURCES } from "../config/resources.js";
import { validate } from "../middleware/validate.js";
import { statusSchema } from "../validators/enquiry.validators.js";

import { upload } from "../middleware/upload.js";
import { getSingleton, getAllSingletons, putSingleton } from "../controllers/content.controller.js";
import { updateStatus } from "../controllers/enquiry.controller.js";
import {
  storageStatus, presign, createRecord, uploadFile, listMedia, patchMedia, deleteMedia,
} from "../controllers/media.controller.js";
import { listSubscribers, removeSubscriber } from "../controllers/newsletter.controller.js";
import { listBookings, updateBooking, deleteBooking } from "../controllers/booking.controller.js";
import {
  dashboardStats, listUsers, createUser, updateUser, deleteUser, exportContent, importContent,
} from "../controllers/admin.controller.js";

const router = Router();
router.use(requireAdmin);

// ── Dashboard + content tree utilities ────────────────────────────────────
router.get("/stats", dashboardStats);
router.get("/export", exportContent);
router.post("/import", importContent);

// ── Singleton content sections ─────────────────────────────────────────────
router.get("/content", getAllSingletons);
router.get("/content/:key", getSingleton);
router.put("/content/:key", putSingleton);

// ── Users ──────────────────────────────────────────────────────────────────
router.get("/users", listUsers);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// ── Newsletter subscribers ───────────────────────────────────────────────
router.get("/newsletter", listSubscribers);
router.delete("/newsletter/:id", removeSubscriber);

// ── Media library (S3) ─────────────────────────────────────────────────────
router.get("/media/status", storageStatus);
router.get("/media", listMedia);
router.post("/media/presign", presign);              // → presigned PUT URL
router.post("/media/upload", upload.single("file"), uploadFile); // server upload
router.post("/media", createRecord);                 // record after presigned upload
router.patch("/media/:id", patchMedia);
router.delete("/media/:id", deleteMedia);

// ── Bookings ─────────────────────────────────────────────────────────────
router.get("/bookings", listBookings);
router.patch("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

// ── Generic CRUD for every registered collection ──────────────────────────
for (const resource of RESOURCES) {
  const c = makeCrudController(resource);
  router.get(`/${resource.path}`, c.list);
  router.get(`/${resource.path}/:id`, c.getOne);
  router.post(`/${resource.path}`, c.create);
  router.put(`/${resource.path}/:id`, c.upsert);
  router.patch(`/${resource.path}/:id`, c.patch);
  router.delete(`/${resource.path}/:id`, c.remove);
}

// Enquiry status shortcut (mounted after the generic routes so it's additive).
router.patch("/enquiries/:id/status", validate(statusSchema), updateStatus);

export default router;
