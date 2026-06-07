// Authenticated traveller self-service: profile, wishlist, bookings.
// Every route here requires a valid Bearer token.

import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { profileSchema, changePasswordSchema } from "../validators/auth.validators.js";
import { getProfile, updateProfile, changePassword } from "../controllers/account.controller.js";
import {
  getWishlist, addItem, removeItem, setWishlist, clearWishlist,
} from "../controllers/wishlist.controller.js";
import { createBooking, myBookings, myBooking } from "../controllers/booking.controller.js";

const router = Router();
router.use(requireAuth);

// Profile
router.get("/profile", getProfile);
router.patch("/profile", validate(profileSchema), updateProfile);
router.post("/change-password", validate(changePasswordSchema), changePassword);

// Wishlist
router.get("/wishlist", getWishlist);
router.put("/wishlist", setWishlist);
router.post("/wishlist", addItem);
router.delete("/wishlist", clearWishlist);
router.delete("/wishlist/:id", removeItem);

// Bookings
router.get("/bookings", myBookings);
router.post("/bookings", createBooking);
router.get("/bookings/:id", myBooking);

export default router;
