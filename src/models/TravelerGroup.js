// Named groups of travelers (families, friend circles). memberIds → Traveler._id.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  memberIds: [String],
});

export const TravelerGroup = mongoose.model("TravelerGroup", schema, "travelergroups");
