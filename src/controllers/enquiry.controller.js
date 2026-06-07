// Public enquiry intake (quote / weekend / contact forms) + admin status update.
// Listing, fetching and deleting enquiries is handled by the generic CRUD
// controller mounted under /api/admin/enquiries.

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uid } from "../utils/ids.js";
import { Enquiry } from "../models/index.js";
import { emails } from "../services/email.js";

export const createEnquiry = asyncHandler(async (req, res) => {
  // req.body is already validated by the discriminated-union schema.
  const enquiry = await Enquiry.create({
    _id: uid(req.body.type === "weekend" ? "w" : req.body.type === "contact" ? "c" : "q"),
    ...req.body,
    status: "New",
  });

  // Notify the team and acknowledge the traveller (both best-effort).
  emails.enquiryNotify(enquiry);
  emails.enquiryAck(enquiry);

  res.status(201).json({ data: enquiry, message: "Thanks! Our team will reach out shortly." });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { $set: { status: req.body.status } },
    { new: true }
  ).lean();
  if (!enquiry) throw ApiError.notFound("Enquiry not found");
  res.json({ data: enquiry });
});
