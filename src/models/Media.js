// Media library — uploaded assets stored on S3, tracked here so the admin can
// browse, reuse and delete them. The `url` is what content fields reference.

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    key: { type: String, required: true, index: true }, // S3 object key
    url: { type: String, required: true }, // public URL
    name: { type: String, default: "" }, // original / display filename
    type: { type: String, enum: ["image", "video", "file"], default: "image", index: true },
    mime: { type: String, default: "" },
    size: { type: Number, default: 0 }, // bytes
    folder: { type: String, default: "" },
    alt: { type: String, default: "" },
    width: { type: Number },
    height: { type: Number },
    uploadedBy: { type: String }, // user _id
  },
  { timestamps: true, versionKey: false, minimize: false }
);

export const Media = mongoose.model("Media", schema, "media");

export function mediaTypeFromMime(mime = "") {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "file";
}
