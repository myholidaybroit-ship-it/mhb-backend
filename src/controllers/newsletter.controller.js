// Newsletter subscribe (public) + list/unsubscribe (admin).

import { asyncHandler } from "../utils/asyncHandler.js";
import { NewsletterSubscriber } from "../models/index.js";
import { subscribeContact } from "../services/email.js";

export const subscribe = asyncHandler(async (req, res) => {
  const { email, source } = req.body;
  // Idempotent: re-subscribing an existing email just reactivates it.
  const sub = await NewsletterSubscriber.findOneAndUpdate(
    { email },
    { $set: { active: true, ...(source ? { source } : {}) }, $setOnInsert: { email } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  subscribeContact(sub.email, { SOURCE: source || "website" }); // sync to Brevo list
  res.status(201).json({ data: { email: sub.email }, message: "You're in. Keep an eye on your inbox 📬" });
});

export const listSubscribers = asyncHandler(async (req, res) => {
  const items = await NewsletterSubscriber.find().sort("-createdAt").lean();
  res.json({ data: items, total: items.length });
});

export const removeSubscriber = asyncHandler(async (req, res) => {
  await NewsletterSubscriber.findByIdAndDelete(req.params.id);
  res.json({ data: { _id: req.params.id, deleted: true } });
});
