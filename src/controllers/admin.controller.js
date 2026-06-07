// Admin-only utilities: dashboard stats, user management, and a full content
// export/import that mirrors the admin CMS store's JSON shape — so the existing
// admin "Export / Import JSON" feature can round-trip through the API.

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  User, Destination, Weekend, Traveler, TravelerGroup, Assignment, Enquiry,
  Testimonial, Moment, Itinerary, Place, Hotel, Block, TripTemplate,
  NewsletterSubscriber, Booking, Singleton, SINGLETON_KEYS,
} from "../models/index.js";

// Map of export key → model, matching keys used by the admin store SEED.
const COLLECTION_MAP = {
  destinations: Destination,
  weekends: Weekend,
  travelers: Traveler,
  travelerGroups: TravelerGroup,
  assignments: Assignment,
  enquiries: Enquiry,
  testimonials: Testimonial,
  moments: Moment,
  itineraries: Itinerary,
  places: Place,
  hotels: Hotel,
  blocks: Block,
  tripTemplates: TripTemplate,
};

// Strip Mongo bookkeeping so exported docs read like the original seed objects.
const clean = (doc) => {
  const { _id, createdAt, updatedAt, __v, ...rest } = doc;
  return { id: _id, ...rest };
};

export const dashboardStats = asyncHandler(async (_req, res) => {
  const [
    destinations, weekends, itineraries, moments,
    users, customers, enquiriesNew, bookings, subscribers,
  ] = await Promise.all([
    Destination.countDocuments(),
    Weekend.countDocuments(),
    Itinerary.countDocuments(),
    Moment.countDocuments(),
    User.countDocuments(),
    User.countDocuments({ role: "customer" }),
    Enquiry.countDocuments({ status: "New" }),
    Booking.countDocuments(),
    NewsletterSubscriber.countDocuments({ active: true }),
  ]);

  const recentEnquiries = await Enquiry.find().sort("-createdAt").limit(5).lean();

  res.json({
    data: {
      counts: { destinations, weekends, itineraries, moments, users, customers, enquiriesNew, bookings, subscribers },
      recentEnquiries,
    },
  });
});

export const listUsers = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  const users = await User.find(filter).sort("-createdAt").lean();
  res.json({ data: users.map(({ password, ...u }) => u), total: users.length });
});

const normalizeRole = (r) => (String(r || "").toLowerCase() === "admin" ? "admin" : "customer");

// Admin-created accounts (CRM records). A random password is set when none is
// given — the person can use OTP / password reset later.
export const createUser = asyncHandler(async (req, res) => {
  const { id, name, email, phone, role, password } = req.body;
  if (!name || !email) throw ApiError.badRequest("name and email are required");
  const exists = await User.findOne({ email: String(email).toLowerCase() });
  if (exists) throw ApiError.conflict("A user with this email already exists.");
  const user = await User.create({
    _id: id || `u_${Date.now().toString(36)}`,
    name,
    email,
    phone: phone || "",
    role: normalizeRole(role),
    password: password || Math.random().toString(36).slice(2) + "A1!",
  });
  res.status(201).json({ data: user.toPublic() });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, role } = req.body;
  const update = {};
  if (name !== undefined) update.name = name;
  if (email !== undefined) update.email = String(email).toLowerCase();
  if (phone !== undefined) update.phone = phone;
  if (role !== undefined) update.role = normalizeRole(role);
  const user = await User.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
  if (!user) throw ApiError.notFound("User not found");
  res.json({ data: user.toPublic() });
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id) throw ApiError.badRequest("You cannot delete your own account.");
  await User.findByIdAndDelete(req.params.id);
  res.json({ data: { _id: req.params.id, deleted: true } });
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
