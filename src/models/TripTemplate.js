// Trip templates — clonable starting points for new itineraries.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  destination: String,
  description: String,
});

export const TripTemplate = mongoose.model("TripTemplate", schema, "triptemplates");
