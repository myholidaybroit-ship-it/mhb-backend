// Validation for the public enquiry forms. A discriminated union keyed on
// `type` keeps each form's required fields honest while staying permissive
// about extra metadata the front end may attach. All of them feed the Sales
// CRM pipeline (trip queries).

import { z } from "zod";

const base = {
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  phone: z.string().trim().min(5, "Enter a valid phone number"),
  city: z.string().trim().optional(),
  travelMonth: z.string().trim().optional(), // "2026-11" from <input type=month>
};

const quote = z.object({
  type: z.literal("quote"),
  ...base,
  destination: z.string().trim().min(1, "Destination is required"),
  package: z.string().trim().optional(),
  adults: z.coerce.number().int().min(1).default(1),
  children: z.coerce.number().int().min(0).default(0),
  total: z.string().optional(),
}).passthrough();

const weekend = z.object({
  type: z.literal("weekend"),
  ...base,
  trip: z.string().trim().min(1, "Trip is required"),
  price: z.string().optional(),
  channel: z.enum(["Callback", "WhatsApp"]).default("Callback"),
}).passthrough();

// Contact form is deliberately lighter: name, email, phone + a message.
const contact = z.object({
  type: z.literal("contact"),
  name: base.name,
  email: base.email,
  phone: base.phone,
  message: z.string().trim().min(1, "Tell us a little about your trip"),
}).passthrough();

export const enquirySchema = z.discriminatedUnion("type", [quote, weekend, contact]);

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  source: z.string().optional(),
});
