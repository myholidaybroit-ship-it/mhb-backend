// Validation for the three public enquiry forms. A discriminated union keyed on
// `type` keeps each form's required fields honest while staying permissive about
// extra metadata the front end may attach.

import { z } from "zod";

const base = {
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  phone: z.string().trim().min(5, "Enter a valid phone number"),
};

const quote = z.object({
  type: z.literal("quote"),
  ...base,
  name: z.string().trim().min(1, "Name is required"),
  destination: z.string().trim().min(1, "Destination is required"),
  package: z.string().trim().optional(),
  adults: z.coerce.number().int().min(1).default(1),
  children: z.coerce.number().int().min(0).default(0),
  total: z.string().optional(),
}).passthrough();

const weekend = z.object({
  type: z.literal("weekend"),
  ...base,
  name: z.string().trim().min(1, "Name is required"),
  trip: z.string().trim().min(1, "Trip is required"),
  price: z.string().optional(),
  channel: z.enum(["Callback", "WhatsApp"]).default("Callback"),
}).passthrough();

const contact = z.object({
  type: z.literal("contact"),
  email: base.email,
  phone: base.phone,
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().optional(),
  category: z.string().trim().optional(),
  destination: z.string().trim().optional(),
  message: z.string().trim().min(1, "Tell us a little about your trip"),
  marketing: z.boolean().optional().default(false),
}).passthrough();

export const enquirySchema = z.discriminatedUnion("type", [quote, weekend, contact]);

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  source: z.string().optional(),
});
