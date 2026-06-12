// Trip queries — the sales CRM pipeline (modelled on how travel CRMs like
// Sembark organise sales): one document per enquiry/trip that flows through
// stages (New → In Progress → On Hold → Converted → On Trip → Past Trips,
// plus Cancelled / Dropped). Quotes, follow-ups, payment installments and the
// activity log are embedded — `strict: false` keeps the nested shapes flexible
// so the admin UI owns the structure:
//
//   source        "Website" | "Referral" | "B2B Agent" | "Instagram" | …
//   refId         external reference (B2B partner id, ad lead id…)
//   guest         { name, phone, email, city }
//   destination   free string (usually matches a catalog destination)
//   startDate     ISO date · nights · adults · children · childAges
//   budget        free string
//   comments      requirements captured at intake
//   status        pipeline stage (see STAGES in admin)
//   assignedTo    team member name
//   tags          [String]
//   quotes        [{ id, title, itineraryId, items:[{kind,name,cost,markupPct}],
//                    gstPct, givenPrice, status: draft|shared|accepted, createdAt }]
//   followUps     [{ id, note, dueAt, done, createdAt }]
//   conversion    { quoteId, convertedAt, comment }
//   payments      [{ id, label, amount, dueAt, paidAt, mode }]
//   activity      [{ at, text }]

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  guest: { type: Object, default: {} },
  destination: String,
  status: { type: String, default: "New", index: true },
  assignedTo: { type: String, index: true },
  tags: { type: [String], default: [] },
});

export const TripQuery = mongoose.model("TripQuery", schema, "trip_queries");
