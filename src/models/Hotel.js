// Reusable hotels library used to build itinerary accommodation blocks.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  location: String,
  rating: Number,
  score: String,
  mealPlan: String,
  images: [String],
});

export const Hotel = mongoose.model("Hotel", schema, "hotels");
