// Singletons — the one-off content blobs that aren't collections:
//   home, nav, footer, content, adventureStyles, careers, policies, settings
// Each is stored as one document keyed by `_id` (the section name) with the
// whole tree under `value`. This mirrors the admin store's top-level sections.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // section name, e.g. "home"
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true, versionKey: false, minimize: false, strict: true }
);

export const Singleton = mongoose.model("Singleton", schema, "singletons");

// The valid singleton keys, used by the content controller for validation.
export const SINGLETON_KEYS = [
  "home",
  "nav",
  "footer",
  "content",
  "contact",
  "adventureStyles",
  "careers",
  "policies",
  "settings",
];
