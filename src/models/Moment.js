// Moments — traveller stories / postcard reviews (the photo gallery).

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  city: String,
  destination: String,
  rating: Number,
  title: String,
  review: String,
  image: String,
});

export const Moment = mongoose.model("Moment", schema, "moments");
