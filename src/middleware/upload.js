// Multipart upload handling (in-memory) for the server-side S3 upload path.
// Buffers stay in memory and are streamed to S3, then discarded.

import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const ALLOWED = /^(image\/(jpeg|png|webp|avif|gif|svg\+xml)|video\/(mp4|webm)|application\/pdf)$/;

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
  fileFilter(_req, file, cb) {
    if (ALLOWED.test(file.mimetype)) return cb(null, true);
    cb(new ApiError(400, `Unsupported file type: ${file.mimetype}`));
  },
});
