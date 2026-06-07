// Per-user wishlist. One document per user holding the saved trip cards,
// mirroring the front-end WishlistContext item shape ({ id, ...trip, addedAt }).

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // trip slug/id the card points to
    kind: { type: String, default: "destination" }, // "destination" | "weekend"
  },
  { _id: false, strict: false, minimize: false }
);

const schema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    items: { type: [itemSchema], default: [] },
  },
  { timestamps: true, versionKey: false, minimize: false }
);

export const Wishlist = mongoose.model("Wishlist", schema, "wishlists");
