// Bookings. Customers create and view their own; admins see and manage all.

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Booking } from "../models/index.js";
import { emails } from "../services/email.js";

function makeReference() {
  const s = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  return `MHB-${s}`;
}

// ── Customer ──────────────────────────────────────────────────────────────
export const createBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    userId: req.user._id,
    reference: makeReference(),
    status: "Requested",
  });
  emails.bookingConfirmation(booking, req.user); // fire-and-forget
  res.status(201).json({ data: booking });
});

export const myBookings = asyncHandler(async (req, res) => {
  const items = await Booking.find({ userId: req.user._id }).sort("-createdAt").lean();
  res.json({ data: items, total: items.length });
});

export const myBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id }).lean();
  if (!booking) throw ApiError.notFound("Booking not found");
  res.json({ data: booking });
});

// ── Admin ─────────────────────────────────────────────────────────────────
export const listBookings = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.userId) filter.userId = req.query.userId;
  const items = await Booking.find(filter).sort("-createdAt").lean();
  res.json({ data: items, total: items.length });
});

export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).lean();
  if (!booking) throw ApiError.notFound("Booking not found");
  res.json({ data: booking });
});

export const deleteBooking = asyncHandler(async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ data: { _id: req.params.id, deleted: true } });
});
