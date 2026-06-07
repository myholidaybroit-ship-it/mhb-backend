// Destinations — the country/region trips. `_id` is the slug (e.g. "bali").
// Carries nested overview/highlights/packages/itinerary/gallery shaped exactly
// as the front-end /destinations/[slug] page renders.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  country: String,
  region: { type: String, index: true },
  fromPrice: String,
  rating: Number,
  reviews: Number,
  themes: [String],
});

export const Destination = mongoose.model("Destination", schema, "destinations");
