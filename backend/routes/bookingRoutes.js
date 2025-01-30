const express = require('express');
const { createBooking, getUserBookings, cancelBooking, getAvailableSlots } = require('../controllers/bookingController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getUserBookings);
router.delete("/:bookingId", authMiddleware, cancelBooking);
router.get("/available-slots/:roomId/:date", getAvailableSlots);

module.exports = router;
