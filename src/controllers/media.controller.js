// Media library controller — S3-backed uploads + catalogue.
//
// Flow A (recommended, large files): POST /presign → client PUTs to S3 →
//   POST / (record metadata with the returned key/url).
// Flow B (small files): POST /upload (multipart) → server stores to S3 + records.

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  presignUpload, uploadBuffer, deleteObject, publicUrl, storageEnabled,
} from "../services/storage.js";
import { Media, mediaTypeFromMime } from "../models/index.js";

export const storageStatus = asyncHandler(async (_req, res) => {
  res.json({ data: { enabled: storageEnabled() } });
});

// Flow A — hand the client a presigned PUT URL.
export const presign = asyncHandler(async (req, res) => {
  const { filename, contentType, folder } = req.body;
  if (!filename || !contentType) throw ApiError.badRequest("filename and contentType are required");
  const result = await presignUpload({ filename, contentType, folder });
  res.json({ data: result });
});

// Flow A — record metadata after the client finished uploading to S3.
export const createRecord = asyncHandler(async (req, res) => {
  const { key, url, name, mime, size, folder, alt, width, height } = req.body;
  if (!key) throw ApiError.badRequest("key is required");
  const media = await Media.create({
    key,
    url: url || publicUrl(key),
    name: name || "",
    type: mediaTypeFromMime(mime),
    mime: mime || "",
    size: size || 0,
    folder: folder || "",
    alt: alt || "",
    width,
    height,
    uploadedBy: req.user?._id,
  });
  res.status(201).json({ data: media });
});

// Flow B — multipart upload handled server-side (req.file from multer).
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest("No file uploaded (field name: 'file')");
  const { buffer, mimetype, originalname, size } = req.file;
  const { key, publicUrl: url } = await uploadBuffer({
    buffer,
    contentType: mimetype,
    filename: originalname,
    folder: req.body.folder || "",
  });
  const media = await Media.create({
    key,
    url,
    name: originalname,
    type: mediaTypeFromMime(mimetype),
    mime: mimetype,
    size,
    folder: req.body.folder || "",
    uploadedBy: req.user?._id,
  });
  res.status(201).json({ data: media });
});

export const listMedia = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  if (req.query.folder) filter.folder = req.query.folder;
  if (req.query.q) filter.name = new RegExp(String(req.query.q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const items = await Media.find(filter).sort("-createdAt").lean();
  res.json({ data: items, total: items.length });
});

export const patchMedia = asyncHandler(async (req, res) => {
  const { alt, name, folder } = req.body;
  const media = await Media.findByIdAndUpdate(
    req.params.id,
    { $set: { ...(alt !== undefined && { alt }), ...(name !== undefined && { name }), ...(folder !== undefined && { folder }) } },
    { new: true }
  ).lean();
  if (!media) throw ApiError.notFound("Media not found");
  res.json({ data: media });
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) throw ApiError.notFound("Media not found");
  await deleteObject(media.key).catch((e) => console.error("[media] S3 delete failed:", e.message));
  await media.deleteOne();
  res.json({ data: { _id: req.params.id, deleted: true } });
});
