// Shared schema builder for content/catalog collections.
//
// These documents mirror the rich, deeply-nested content tree authored in the
// admin CMS (packages, itinerary days, gallery keys, etc.). Rather than pin
// every nested field, we use a string `_id` (the slug / business key) plus
// `strict: false` so the document stores exactly the shape the front end
// renders — while still timestamping and serialising cleanly.

import mongoose from "mongoose";

export function flexibleSchema(definition = {}) {
  const schema = new mongoose.Schema(
    {
      _id: { type: String, required: true },
      ...definition,
    },
    {
      strict: false,
      minimize: false,
      timestamps: true,
      versionKey: false,
      id: false,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );
  return schema;
}
