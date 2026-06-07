// Package assignments — a package + chosen travelers + pricing. The admin's
// operational record of who is going on what trip.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  packageName: String,
  destination: String,
  travelerIds: [String],
  status: { type: String, default: "Draft" },
  total: String,
});

export const Assignment = mongoose.model("Assignment", schema, "assignments");
