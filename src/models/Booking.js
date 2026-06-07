// Bookings — a traveller's confirmed/requested trip, shown on the account page
// "Bookings" tab. Created when a logged-in user books a package; admins can
// also create and advance these.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    reference: { type: String, unique: true, index: true }, // e.g. "MHB-7F3K2A"
    title: { type: String, required: true }, // package / trip name
    destination: String,
    tripKind: { type: String, default: "destination" }, // "destination" | "weekend"
    tripId: String, // slug it points to
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    startDate: String,
    nights: Number,
    total: String,
    status: {
      type: String,
      enum: ["Requested", "Confirmed", "Paid", "Completed", "Cancelled"],
      default: "Requested",
      index: true,
    },
    notes: String,
  },
  { timestamps: true, versionKey: false, minimize: false }
);

export const Booking = mongoose.model("Booking", schema, "bookings");
