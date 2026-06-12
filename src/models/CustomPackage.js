// Custom packages — fully personalised trip plans built for ONE traveller
// (never shown on the public website, unlike catalog destination packages).
// Shape is owned by the admin builder (strict:false):
//
//   title       "Bali Honeymoon Special"
//   traveller   { name, phone, email, city }   (phone = WhatsApp number)
//   destination · startDate · nights · adults · children
//   days        [{ id, title, activities:[String], stay, meals }]
//   transport   free text (cabs/flights/transfers summary)
//   inclusions  [String] · exclusions [String]
//   price       total label · priceNote ("per couple, all-inclusive") · advance
//   notes       personal touches
//   status      "draft" | "sent" · sentAt

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  title: String,
  traveller: { type: Object, default: {} },
  destination: String,
  status: { type: String, default: "draft", index: true },
});

export const CustomPackage = mongoose.model("CustomPackage", schema, "custom_packages");
