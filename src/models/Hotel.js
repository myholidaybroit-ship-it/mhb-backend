// Reusable hotels library used to build itinerary accommodation blocks.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  city: String, // city / region for the builder's City → Hotel dropdown
  category: String, // star / label, e.g. "3 Star", "4 Star", "Resort"
  location: String,
  rating: Number,
  score: String,
  mealPlan: String, // default meal plan, e.g. "CP" / "Breakfast"
  images: [String],
  // Room types with per-night pricing used by the package builder. `strict:false`
  // means the nested shape is owned by the admin UI; this documents the fields.
  rooms: [
    {
      type: String, // "Superior room", "Standard room", "Deluxe Room"
      mealPlan: String, // "CP" | "MAP" | "AP" | "Breakfast"
      price: Number, // per-night room cost in catalog currency
      exAdult: Number, // extra adult per night
      exChild: Number, // extra child per night
      occupancy: String,
      refundable: Boolean,
      breakfast: Boolean,
    },
  ],
  currency: { type: String, default: "INR" },
});

export const Hotel = mongoose.model("Hotel", schema, "hotels");
