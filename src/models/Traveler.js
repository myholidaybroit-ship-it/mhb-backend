// Travelers — individual people on a trip. `source` is "manual" or "user"
// (linked to a signup via userId).

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  age: Number,
  group: String, // "Adult" | "Child"
  source: { type: String, default: "manual" },
  userId: { type: String, default: null },
});

export const Traveler = mongoose.model("Traveler", schema, "travelers");
