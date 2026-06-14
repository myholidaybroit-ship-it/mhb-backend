// Reusable places / activities library used to build itineraries fast.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  city: String, // city / region for the builder's City → Sightseeing dropdown
  category: String, // "Tour" | "Cruise" | "Entrance" | "Activity"
  duration: String,
  adultPrice: Number, // per-adult cost in catalog currency
  childPrice: Number, // per-child cost in INR
  currency: { type: String, default: "INR" },
  basis: { type: String, default: "SIC" }, // "SIC" | "Private"
  note: String,
  image: String,
  description: String,
});

export const Place = mongoose.model("Place", schema, "places");
