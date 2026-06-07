// Media storage on AWS S3.
//
// Two upload paths are supported:
//   • Presigned PUT  — client uploads the file straight to S3 (best for the
//     admin Media Library; keeps large blobs off the API).
//   • Server upload  — API receives the bytes (multipart) and puts them to S3
//     (handy for small assets or server-generated files).
//
// The S3 client is created lazily so the API boots fine when storage is
// unconfigured; storage routes then return a clear 503.

import { randomBytes } from "node:crypto";
import path from "node:path";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

let _client = null;
function client() {
  if (!env.s3.enabled) {
    throw new ApiError(503, "Media storage is not configured (set AWS_* and S3_BUCKET).");
  }
  if (!_client) {
    _client = new S3Client({
      region: env.s3.region,
      credentials: { accessKeyId: env.s3.accessKeyId, secretAccessKey: env.s3.secretAccessKey },
    });
  }
  return _client;
}

export const storageEnabled = () => env.s3.enabled;

// Public URL for a stored object key (CDN base if configured, else S3 host).
export function publicUrl(key) {
  if (env.s3.publicBaseUrl) return `${env.s3.publicBaseUrl}/${key}`;
  return `https://${env.s3.bucket}.s3.${env.s3.region}.amazonaws.com/${key}`;
}

// Build a collision-resistant, tidy object key from an original filename.
export function buildKey(filename = "file", folder = "") {
  const ext = path.extname(filename).toLowerCase();
  const base = path
    .basename(filename, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "file";
  const stamp = `${Date.now().toString(36)}-${randomBytes(3).toString("hex")}`;
  const parts = [env.s3.uploadPrefix, folder, `${base}-${stamp}${ext}`].filter(Boolean);
  return parts.join("/");
}

// Presigned PUT URL the client uses to upload directly to S3.
export async function presignUpload({ filename, contentType, folder = "", expiresIn = 300 }) {
  const key = buildKey(filename, folder);
  const cmd = new PutObjectCommand({ Bucket: env.s3.bucket, Key: key, ContentType: contentType });
  const uploadUrl = await getSignedUrl(client(), cmd, { expiresIn });
  return { key, uploadUrl, publicUrl: publicUrl(key), expiresIn };
}

// Server-side upload of an in-memory buffer.
export async function uploadBuffer({ buffer, contentType, filename, folder = "" }) {
  const key = buildKey(filename, folder);
  await client().send(
    new PutObjectCommand({ Bucket: env.s3.bucket, Key: key, Body: buffer, ContentType: contentType })
  );
  return { key, publicUrl: publicUrl(key) };
}

export async function deleteObject(key) {
  if (!key) return;
  await client().send(new DeleteObjectCommand({ Bucket: env.s3.bucket, Key: key }));
}
