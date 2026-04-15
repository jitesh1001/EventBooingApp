const mongoose = require("mongoose");
const Booking = require("../Models/booking.model");
const Event = require("../Models/Event.model");

const eventBooking = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    if (!eventId) {
      return res.status(400).json({
        message: "Event id is required",
      });
    }

    if (!tickets || tickets < 1) {
      return res.status(400).json({
        message: "Tickets must be at least 1",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.availableSeats < tickets) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      tickets,
      amount: tickets * event.ticketPrice,
      status: "pending",
      paymentStatus: "non_paid",
    });

    event.availableSeats -= tickets;
    await event.save();

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create booking",
      error: err.message,
    });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled",
      });
    }

    const event = await Event.findById(booking.eventId);

    if (event) {
      event.availableSeats += booking.tickets;
      await event.save();
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to cancel booking",
      error: err.message,
    });
  }
};



const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("eventId")
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
};

module.exports = {
  eventBooking,
  cancelBooking,
  getMyBookings,
};