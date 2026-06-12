// Public form intake (quote / weekend / contact forms). Every submission
// lands directly in the Sales CRM pipeline as a NEW trip query — the admin
// works them from /queries. The team is notified by email (best-effort).

import { asyncHandler } from "../utils/asyncHandler.js";
import { uid } from "../utils/ids.js";
import { TripQuery } from "../models/index.js";
import { emails } from "../services/email.js";

const FORM_TAG = { quote: "quote-form", weekend: "weekend-form", contact: "contact-form" };

export const createEnquiry = asyncHandler(async (req, res) => {
  // req.body is already validated by the discriminated-union schema.
  const b = req.body;
  const name = b.name || [b.firstName, b.lastName].filter(Boolean).join(" ");

  // Context the sales team needs, captured as the query's requirements.
  const comments = [
    b.package && `Package: ${b.package}`,
    b.channel && `Prefers: ${b.channel}`,
    b.category && `Trip type: ${b.category}`,
    b.message,
  ].filter(Boolean).join("\n");

  const query = await TripQuery.create({
    _id: uid("tq"),
    source: "Website",
    formType: b.type, // quote | weekend | contact
    destination: b.destination || b.trip || "",
    travelMonth: b.travelMonth || "",
    adults: b.adults ?? undefined,
    children: b.children ?? undefined,
    guest: { name, phone: b.phone || "", email: b.email || "", city: b.city || "" },
    budget: b.total || b.price || "",
    comments,
    status: "New",
    assignedTo: "",
    tags: [FORM_TAG[b.type] || "website"],
    quotes: [],
    followUps: [],
    payments: [],
    activity: [{ at: new Date().toISOString(), text: `Query received from the website ${b.type} form` }],
  });

  // Notify the team and acknowledge the traveller (both best-effort).
  emails.enquiryNotify({ ...b, name });
  emails.enquiryAck({ ...b, name });

  res.status(201).json({ data: query, message: "Thanks! Our team will reach out shortly." });
});
