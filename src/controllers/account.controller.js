// Logged-in user self-service: profile + notification prefs + password.

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toPublic() });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, city, prefs } = req.body;
  const user = req.user;

  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (city !== undefined) user.city = city;
  if (prefs) user.prefs = { ...user.prefs.toObject?.() ?? user.prefs, ...prefs };

  await user.save();
  res.json({ user: user.toPublic() });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // req.user was loaded without the password; reload with it.
  const user = await req.user.constructor.findById(req.user._id).select("+password");
  if (!(await user.comparePassword(currentPassword))) {
    throw ApiError.badRequest("Current password is incorrect.");
  }
  user.password = newPassword;
  await user.save();
  res.json({ ok: true });
});
