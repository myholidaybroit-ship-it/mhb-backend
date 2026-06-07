// Newsletter sign-ups from the footer / newsletter page.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    source: { type: String, default: "website" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export const NewsletterSubscriber = mongoose.model(
  "NewsletterSubscriber",
  schema,
  "newsletter_subscribers"
);
