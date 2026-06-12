// Enquiries from the three front-end forms. `type` discriminates the shape:
//   quote   → destination "Get a free quote"   (destination, package, adults, children, total)
//   weekend → weekend-trip callback / WhatsApp  (trip, price, channel)
//   contact → "dream holiday" custom form       (firstName, lastName, category, message, marketing)

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  type: { type: String, enum: ["quote", "weekend", "contact"], required: true, index: true },
  name: String,
  email: { type: String, index: true },
  phone: String,
  status: { type: String, default: "New", index: true },
});

export const Enquiry = mongoose.model("Enquiry", schema, "enquiries");
