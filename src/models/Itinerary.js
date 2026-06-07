// Itineraries — the full client trip documents that feed the PDF generator.
// Deeply nested (segments, days→items, accommodations, inclusions, terms…).

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  title: { type: String, required: true },
  destination: String,
  clientName: String,
  status: { type: String, default: "Draft", index: true },
  tripId: String,
});

export const Itinerary = mongoose.model("Itinerary", schema, "itineraries");
