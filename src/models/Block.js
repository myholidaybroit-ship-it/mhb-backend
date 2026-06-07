// Reusable content blocks (notes / inclusions / exclusions / terms) for
// itineraries. `kind` is "list" or "sections".

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  title: { type: String, required: true },
  kind: { type: String, default: "list" },
});

export const Block = mongoose.model("Block", schema, "blocks");
