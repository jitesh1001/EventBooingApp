import React, { useState } from "react";
import api from "../Utils/axios";

const BookingModal = ({ event, onClose, onSuccess }) => {
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const increaseTickets = () => {
    if (tickets < event.availableSeats) {
      setTickets((prev) => prev + 1);
    }
  };

  const decreaseTickets = () => {
    if (tickets > 1) {
      setTickets((prev) => prev - 1);
    }
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await api.post("/booking", {
        eventId: event._id,
        tickets,
      });

      setSuccess("Booking successful");
      setError("");
    } catch (err) {
      setSuccess("");
      setError("Booking failed");
    } finally {
      setLoading(false);
    }



     try {
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  } catch (err) {
    console.log("Post-booking UI error:", err);
  }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Book Tickets</h2>
        <p className="text-lg font-semibold">{event.title}</p>
        <p className="text-sm text-gray-500 mb-4">
          ₹{event.ticketPrice} per ticket
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span>Available Seats</span>
            <span className="font-medium">{event.availableSeats}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Price</span>
            <span className="font-bold">₹{tickets * event.ticketPrice}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={decreaseTickets}
            className="w-10 h-10 rounded-full bg-gray-200 text-xl"
          >
            -
          </button>

          <span className="text-xl font-semibold">{tickets}</span>

          <button
            onClick={increaseTickets}
            className="w-10 h-10 rounded-full bg-gray-200 text-xl"
          >
            +
          </button>
        </div>



       
{success && (
  <p className="text-green-600 text-center mb-2">{success}</p>
)}


        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-xl bg-gray-200 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleBooking}
            disabled={loading || event.availableSeats === 0}
            className="w-1/2 py-3 rounded-xl bg-black text-white font-medium disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;