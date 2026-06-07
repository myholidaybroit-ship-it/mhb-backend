// Singleton content sections (home, nav, footer, content, adventureStyles,
// careers, policies, settings). Public reads, admin writes.

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Singleton, SINGLETON_KEYS } from "../models/index.js";

function assertKey(key) {
  if (!SINGLETON_KEYS.includes(key)) {
    throw ApiError.notFound(`Unknown content section "${key}"`);
  }
}

export const getSingleton = asyncHandler(async (req, res) => {
  const { key } = req.params;
  assertKey(key);
  const doc = await Singleton.findById(key).lean();
  res.json({ data: doc?.value ?? null });
});

// Returns every singleton as one map — handy for the admin boot and the
// front-end to hydrate nav/footer/settings in a single round-trip.
export const getAllSingletons = asyncHandler(async (_req, res) => {
  const docs = await Singleton.find({ _id: { $in: SINGLETON_KEYS } }).lean();
  const map = {};
  for (const d of docs) map[d._id] = d.value;
  res.json({ data: map });
});

export const putSingleton = asyncHandler(async (req, res) => {
  const { key } = req.params;
  assertKey(key);
  const value = req.body?.value ?? req.body; // accept {value:…} or the raw blob
  const doc = await Singleton.findByIdAndUpdate(
    key,
    { $set: { value } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();
  res.json({ data: doc.value });
});
