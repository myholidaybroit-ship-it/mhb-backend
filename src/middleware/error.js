// Central error handler. Normalises ApiError, Mongoose, JWT and Zod errors
// into one JSON shape: { error: { message, details? } }.

import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";

export function errorHandler(err, _req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let details = err.details;

  // Mongoose validation
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  }
  // Mongoose bad ObjectId / cast
  else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for ${err.path}`;
  }
  // Duplicate key
  else if (err.code === 11000) {
    statusCode = 409;
    message = `Duplicate value for ${Object.keys(err.keyValue || {}).join(", ")}`;
  }
  // JWT
  else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired session";
  }
  // Zod (from validate middleware) arrives already as ApiError(400), so nothing here.

  // Only log genuinely unexpected failures — not operational ApiErrors
  // (e.g. a 503 when an optional integration isn't configured).
  if (statusCode >= 500 && !err.isOperational) {
    console.error("Unhandled error:", err);
  }

  res.status(statusCode).json({
    error: {
      message,
      ...(details ? { details } : {}),
      ...(env.isProd ? {} : { stack: err.stack }),
    },
  });
}
