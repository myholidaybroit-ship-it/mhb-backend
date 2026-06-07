// Id helpers mirrored from the admin store so generated ids look identical
// (e.g. "q_ab12x9c", or a slug like "bali"). Business keys are stored as the
// Mongo `_id`, which keeps the data 1:1 with the front end and admin CMS.

export const slugify = (s = "") =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const uid = (prefix = "id") =>
  `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
