const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { roomId, date, timeSlot } = req.body;
        const userId = req.user._id;

        const bookingDate = new Date(date).setHours(0, 0, 0, 0);

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });

        const existingBooking = await Booking.findOne({ roomId, date: bookingDate, timeSlot });
        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked!" });
        }

        // Create new booking
        const booking = new Booking({ userId, roomId, date: bookingDate, timeSlot });
        await booking.save();

        res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bookings
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const bookings = await Booking.find({ userId }).populate("roomId", "name");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Check if user is authorized to cancel
        if (booking.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        await Booking.findByIdAndDelete(bookingId);
        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get available slots for a room on a specific date
exports.getAvailableSlots = async (req, res) => {
    try {
        const { roomId, date } = req.params;

        const allSlots = [
            "09:00-10:00", "10:00-11:00", "11:00-12:00",
            "12:00-01:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"
        ];

        const selectedDate = new Date(date).setHours(0, 0, 0, 0);

        const bookedSlots = await Booking.find({ roomId, date: selectedDate }).select("timeSlot");

        const availableSlots = allSlots.filter(slot => !bookedSlots.some(booked => booked.timeSlot === slot));

        res.status(200).json({ availableSlots });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

