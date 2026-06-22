// Blog posts. `_id` is the slug (e.g. "best-time-to-visit-bali"). The body is a
// flexible array of content blocks (heading / paragraph / quote / image / list)
// rendered by the front-end. Drafts are hidden from the public API.

import mongoose from "mongoose";
import { flexibleSchema } from "./_baseSchema.js";

const schema = flexibleSchema({
  title: { type: String, required: true },
  excerpt: String,
  coverImage: String,
  author: String,
  authorRole: String,
  category: { type: String, index: true },
  tags: [String],
  status: { type: String, default: "draft", index: true }, // draft | published
  publishedAt: String, // ISO date string
  readTime: String,
  featured: { type: Boolean, default: false },
  body: { type: Array, default: [] }, // [{ type, text, url, caption, items }]
  seoTitle: String,
  seoDescription: String,
});

export const Blog = mongoose.model("Blog", schema, "blogs");
