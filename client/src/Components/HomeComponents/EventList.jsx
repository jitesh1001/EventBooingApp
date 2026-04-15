import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import api from "../../Utils/axios";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events"); 
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

         fetchEvents();
        const interval = setInterval(fetchEvents, 5000);

         return () => clearInterval(interval); 
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading events...</p>;
  }

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <span className="text-gray-500 text-sm">
          {events.length} results found
        </span>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

    </div>
  );
};

export default EventList;