// Reusable transport library used to build package transfers fast.
// Powers the "Transport" dropdown in the package builder: pick a vehicle/route
// from the catalog (price auto-fills) or type a custom one-off.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true }, // e.g. "01 Way Taxi From BKK Airport To Bangkok Hotel"
  city: String, // operating city / region
  vehicle: String, // e.g. "Van", "Sedan", "Coach", "Speed Boat"
  capacity: Number, // seats
  price: Number, // base cost in INR
  currency: { type: String, default: "INR" },
  basis: { type: String, default: "Private" }, // "Private" | "SIC"
  note: String,
});

export const Transport = mongoose.model("Transport", schema, "transports");
