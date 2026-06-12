// Quote templates — reusable costing sheets for the Sales CRM. Save a quote's
// component list once (hotel/transport/activity lines with cost + markup) and
// load it into any future quote instead of re-entering it manually.
//   { name, destination, items:[{id,kind,name,cost,markupPct}], gstPct }

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  destination: { type: String, default: "" },
});

export const QuoteTemplate = mongoose.model("QuoteTemplate", schema, "quote_templates");
