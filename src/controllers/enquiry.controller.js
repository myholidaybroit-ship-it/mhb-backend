// Public enquiry intake (quote / weekend / contact forms). Submissions are
// stored and the team is notified by email.

import { asyncHandler } from "../utils/asyncHandler.js";
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
