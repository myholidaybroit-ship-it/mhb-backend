// Sales team members — who queries get assigned to. Managed from the admin
// "Team" page (Sales CRM group); referenced by name on trip queries.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  name: { type: String, required: true },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  role: { type: String, default: "Sales" },
  active: { type: Boolean, default: true },
});

export const TeamMember = mongoose.model("TeamMember", schema, "team_members");
