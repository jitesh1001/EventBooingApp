import { useEffect, useState } from "react";
import api from "../Utils/axios";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking/my-bookings");
      setBookings(res.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await api.put(`/booking/${bookingId}/cancel`);
      fetchBookings();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage all your event bookings here</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No bookings yet</h2>
            <p className="text-gray-500">You have not booked any events yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => {
              const event = booking.eventId;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 h-64 md:h-auto">
                      <img
                        src={event?.imageUrl}
                        alt={event?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                            {event?.category}
                          </span>

                          <h2 className="text-2xl font-bold text-gray-900 mt-3">
                            {event?.title}
                          </h2>

                          <p className="text-gray-500 mt-2 text-sm">
                            {event?.description}
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{booking.amount}
                          </p>
                          <p className="text-sm text-gray-400">Total Amount</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-400 font-medium">Date</p>
                          <p className="text-sm font-semibold text-gray-800 mt-1">
                            {event?.date
                              ? new Date(event.date).toLocaleDateString("en-IN", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-400 font-medium">Location</p>
                          <p className="text-sm font-semibold text-gray-800 mt-1">
                            {event?.location || "N/A"}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-400 font-medium">Tickets</p>
                          <p className="text-sm font-semibold text-gray-800 mt-1">
                            {booking.tickets}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs text-gray-400 font-medium">Booked On</p>
                          <p className="text-sm font-semibold text-gray-800 mt-1">
                            {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                        <div className="flex flex-wrap gap-3">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-600"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-600"
                                : booking.status === "expired"
                                ? "bg-gray-200 text-gray-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            Booking: {booking.status}
                          </span>

                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              booking.paymentStatus === "paid"
                                ? "bg-green-100 text-green-600"
                                : booking.paymentStatus === "failed"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            Payment: {booking.paymentStatus}
                          </span>
                        </div>

                        {booking.status !== "cancelled" && booking.status !== "expired" && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;