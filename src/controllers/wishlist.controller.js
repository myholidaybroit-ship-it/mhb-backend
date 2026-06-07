// Per-user wishlist. Mirrors the front-end WishlistContext API
// (get / add / remove / toggle / clear) but persisted server-side.

import { asyncHandler } from "../utils/asyncHandler.js";
import { Wishlist } from "../models/index.js";

async function getOrCreate(userId) {
  let wl = await Wishlist.findOne({ userId });
  if (!wl) wl = await Wishlist.create({ userId, items: [] });
  return wl;
}

export const getWishlist = asyncHandler(async (req, res) => {
  const wl = await getOrCreate(req.user._id);
  res.json({ items: wl.items, count: wl.items.length });
});

export const addItem = asyncHandler(async (req, res) => {
  const item = req.body;
  const wl = await getOrCreate(req.user._id);
  if (item?.id && !wl.items.some((i) => i.id === item.id)) {
    wl.items.unshift({ ...item, addedAt: Date.now() });
    await wl.save();
  }
  res.status(201).json({ items: wl.items, count: wl.items.length });
});

export const removeItem = asyncHandler(async (req, res) => {
  const wl = await getOrCreate(req.user._id);
  wl.items = wl.items.filter((i) => i.id !== req.params.id);
  await wl.save();
  res.json({ items: wl.items, count: wl.items.length });
});

// Replace the whole list — useful for syncing the front-end localStorage state.
export const setWishlist = asyncHandler(async (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  const wl = await getOrCreate(req.user._id);
  wl.items = items;
  await wl.save();
  res.json({ items: wl.items, count: wl.items.length });
});

export const clearWishlist = asyncHandler(async (req, res) => {
  const wl = await getOrCreate(req.user._id);
  wl.items = [];
  await wl.save();
  res.json({ items: [], count: 0 });
});
