// Auth: signup, login, current user. Issues a JWT whose subject is the user id.

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { signToken } from "../utils/token.js";
import { uid } from "../utils/ids.js";
import { User } from "../models/index.js";
import { emails } from "../services/email.js";

function authResponse(user) {
  const token = signToken({ sub: user._id, role: user.role });
  return { token, user: user.toPublic() };
}

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw ApiError.conflict("An account with this email already exists.");

  const user = await User.create({
    _id: uid("u"),
    name,
    email,
    password,
    role: "customer",
  });

  emails.welcome(user); // fire-and-forget; never throws
  res.status(201).json(authResponse(user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized("Email or password doesn't match.");
  }

  res.json(authResponse(user));
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toPublic() });
});
