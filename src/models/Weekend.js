// Weekend trips — short getaways. `_id` is the slug (e.g. "coorg-chikmagalur").

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  region: { type: String, index: true },
  from: String,
  to: String,
  salePrice: String,
  originalPrice: String,
  rating: Number,
  reviews: Number,
});

export const Weekend = mongoose.model("Weekend", schema, "weekends");
