import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Utils/axios";
import BookingModal from "../Components/BookingModal";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

 const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);



  const handleBookClick = async () => {
    const res = await api.get(`/events/${id}`); 
    setEvent(res.data);
    if (res.data.availableSeats === 0) return; 
    setShowBookingModal(true);
  };
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-400 text-lg">Loading event...</p>
    </div>
  );

  if (!event) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-400 text-lg">Event not found.</p>
    </div>
  );

  const seatsPercent = ((event.totalSeats - event.availableSeats) / event.totalSeats) * 100;
  const isSoldOut = event.availableSeats === 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

      {/* HERO IMAGE */}
      <div className="relative w-full" style={{ height: "420px" }}>
        <img
          src={event.imageUrl}
          alt={event.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)"
        }} />

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          style={{ position: "absolute", top: "20px", left: "20px" }}
          className="bg-black bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition"
        >
          ← Back
        </button>

        {/* PRICE BADGE */}
        <span style={{ position: "absolute", top: "20px", right: "20px" }}
          className="bg-white text-blue-600 font-bold px-4 py-2 rounded-full text-sm shadow-lg">
          {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}
        </span>

        {/* TITLE OVER IMAGE */}
        <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
            {event.category}
          </span>
          <h1 className="text-white text-3xl font-bold mt-2 drop-shadow-lg">
            {event.title}
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* INFO CARDS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "📅", label: "Date", value: new Date(event.date).toDateString() },
            { icon: "💺", label: "Available", value: `${event.availableSeats} seats` },
            { icon: "👥", label: "Total", value: `${event.totalSeats} seats` },
            { icon: "🎟️", label: "Price", value: event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}` },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl">{item.icon}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{item.label}</p>
              <p className="text-sm font-semibold text-gray-700 mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800">About this Event</h2>
          <p className="text-gray-500 leading-relaxed text-sm">{event.description}</p>
        </div>

        {/* LOCATION + SCHEDULE CARD */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">

          {/* LOCATION ROW */}
          <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
              📍
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">{event.location}</p>
              <p className="text-xs text-gray-400 mt-0.5">Tap to view on map</p>
            </div>
            <span className="text-gray-300 text-lg">›</span>
          </div>

          {/* SCHEDULE ROW */}
          <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
              🕐
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">
                {new Date(event.date).toLocaleDateString("en-IN", {
                  weekday: "long", day: "numeric", month: "long", year: "numeric"
                })}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">View full schedule & timeline</p>
            </div>
            <span className="text-gray-300 text-lg">›</span>
          </div>

        </div>

        {/* SEATS PROGRESS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-gray-800">Seat Availability</h2>
            <span className={`text-sm font-semibold ${isSoldOut ? "text-red-500" : "text-green-500"}`}>
              {isSoldOut ? "Sold Out" : `${event.availableSeats} left`}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="h-3 rounded-full transition-all"
              style={{
                width: `${seatsPercent}%`,
                background: seatsPercent > 75 ? "#ef4444" : seatsPercent > 40 ? "#f59e0b" : "#22c55e"
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {event.totalSeats - event.availableSeats} of {event.totalSeats} seats booked
          </p>
        </div>

      </div>

      {/* STICKY BOTTOM BOOKING BAR */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 shadow-2xl"
        style={{ zIndex: 50 }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}
              {event.ticketPrice > 0 && (
                <span className="text-sm font-normal text-gray-400 ml-1">onwards</span>
              )}
            </p>
            <p className="text-xs text-gray-400">{event.availableSeats} seats remaining</p>
          </div>

          <button
           onClick={handleBookClick}
            disabled={isSoldOut}
            className="px-8 py-3 rounded-2xl font-bold text-white text-base transition shadow-lg"
            style={{
              background: isSoldOut ? "#e5e7eb" : "#111827",
              color: isSoldOut ? "#9ca3af" : "white",
              cursor: isSoldOut ? "not-allowed" : "pointer"
            }}
          >
            {isSoldOut ? "Sold Out" : "Book Tickets"}
          </button>
        </div>
      </div>



      {showBookingModal && (
  <BookingModal
    event={event}
    onClose={() => setShowBookingModal(false)}
    onSuccess={() => fetchEvent()}
  />
        )}

    </div>
  );
};

export default EventDetail;