// Video testimonials — the "Straight from our travellers" 45-sec stories.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  dest: String,
  quote: String,
  video: String,
  poster: String,
});

export const Testimonial = mongoose.model("Testimonial", schema, "testimonials");
