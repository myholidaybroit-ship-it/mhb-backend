// Reusable places / activities library used to build itineraries fast.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  duration: String,
  note: String,
  image: String,
  description: String,
});

export const Place = mongoose.model("Place", schema, "places");
