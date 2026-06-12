// Admin-only utilities: dashboard stats and a full content export/import that
// mirrors the admin CMS store's JSON shape — so the existing admin
// "Export / Import JSON" feature can round-trip through the API.

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  Destination, Weekend,
  Testimonial, Moment, Itinerary, Place, Hotel, Block, TripTemplate,
  TripQuery, TeamMember, CustomPackage, QuoteTemplate, User, NewsletterSubscriber, Singleton, SINGLETON_KEYS,
} from "../models/index.js";

// Map of export key → model, matching keys used by the admin store SEED.
const COLLECTION_MAP = {
  destinations: Destination,
  weekends: Weekend,
  testimonials: Testimonial,
  moments: Moment,
  itineraries: Itinerary,
  places: Place,
  hotels: Hotel,
  blocks: Block,
  tripTemplates: TripTemplate,
  tripQueries: TripQuery,
  teamMembers: TeamMember,
  customPackages: CustomPackage,
  quoteTemplates: QuoteTemplate,
};

// Read-only list of site account holders — used by the CRM's traveller picker.
// (Full user management was removed; this is intentionally listing-only.)
export const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().sort("name").lean();
  res.json({ data: users.map(({ password, ...u }) => u), total: users.length });
});

// Strip Mongo bookkeeping so exported docs read like the original seed objects.
const clean = (doc) => {
  const { _id, createdAt, updatedAt, __v, ...rest } = doc;
  return { id: _id, ...rest };
};

export const dashboardStats = asyncHandler(async (_req, res) => {
  const [destinations, weekends, itineraries, moments, subscribers] = await Promise.all([
    Destination.countDocuments(),
    Weekend.countDocuments(),
    Itinerary.countDocuments(),
    Moment.countDocuments(),
    NewsletterSubscriber.countDocuments({ active: true }),
  ]);

  res.json({
    data: {
      counts: { destinations, weekends, itineraries, moments, subscribers },
    },
  });
});

// Full content tree → one JSON document (the admin store shape).
export const exportContent = asyncHandler(async (_req, res) => {
  const out = { version: 1, exportedAt: new Date().toISOString() };

  for (const [key, Model] of Object.entries(COLLECTION_MAP)) {
    const docs = await Model.find().lean();
    out[key] = docs.map(clean);
  }
  const singletons = await Singleton.find({ _id: { $in: SINGLETON_KEYS } }).lean();
  for (const s of singletons) out[s._id] = s.value;

  res.json({ data: out });
});

// Import a content tree, replacing the collections/singletons present in the
// payload. Missing keys are left untouched. Destructive per-collection.
export const importContent = asyncHandler(async (req, res) => {
  const payload = req.body?.data ?? req.body;
  if (!payload || typeof payload !== "object") throw ApiError.badRequest("Expected a content object");

  const summary = {};

  for (const [key, Model] of Object.entries(COLLECTION_MAP)) {
    if (!Array.isArray(payload[key])) continue;
    await Model.deleteMany({});
    const docs = payload[key].map(({ id, _id, ...rest }) => ({ _id: _id || id, ...rest }));
    if (docs.length) await Model.insertMany(docs, { ordered: false });
    summary[key] = docs.length;
  }

  for (const key of SINGLETON_KEYS) {
    if (payload[key] === undefined) continue;
    await Singleton.findByIdAndUpdate(key, { $set: { value: payload[key] } }, { upsert: true });
    summary[key] = "updated";
  }

  res.json({ data: { imported: summary } });
});
