const express = require("express");
const router = express.Router();

const {
  eventBooking,
  cancelBooking,
  getMyBookings,
} = require("../Controllers/booking.controller");




const {protect} = require("../Middleware/auth");

router.post("/", protect, eventBooking);
router.get("/my-bookings", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;