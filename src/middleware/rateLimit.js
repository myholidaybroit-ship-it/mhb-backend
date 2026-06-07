// Rate limiters. Auth + public form submissions get a tighter budget to blunt
// brute-force and spam; the general API limiter is generous.

import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: { message: "Too many attempts, please try again later." } },
  standardHeaders: true,
  legacyHeaders: false,
});

export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 40,
  message: { error: { message: "Too many submissions, please try again later." } },
  standardHeaders: true,
  legacyHeaders: false,
});
