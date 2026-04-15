import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  return (

     <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      

      <div className="relative">
    <img
      src={event.imageUrl}
      alt={event.title}
       style={{ width: "100%", height: "180px", objectFit: "cover" }}
    />
    <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
      {event.ticketPrice === 0 ? "FREE" : `₹${event.ticketPrice}`}
    </span>
  </div>

      {/* CONTENT */}
      <div className="p-4">
        
        {/* CATEGORY */}
        <p className="text-xs text-gray-400 uppercase font-semibold">
          {event.category || "Technology"}
        </p>

        {/* TITLE */}
        <h3 className="text-lg font-bold mt-1">
          {event.title}
        </h3>

        {/* DATE */}
        <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
          📅 {new Date(event.date).toDateString()}
        </p>

        {/* LOCATION */}
        <p className="text-gray-500 text-sm flex items-center gap-2">
          📍 {event.location}
        </p>

        {/* PROGRESS BAR */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-gray-700 h-2 rounded-full"
              style={{
                width: `${
                  ((event.totalSeats - event.availableSeats) /
                    event.totalSeats) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            {event.availableSeats} of {event.totalSeats} seats remaining
          </p>
        </div>

        {/* BUTTON */}
        <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium"    onClick={() => navigate(`/events/${event._id}`)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;