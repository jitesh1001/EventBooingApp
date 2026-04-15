// Components/Admin/EventTable.jsx

const EventTable = ({ events, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <table className="w-full text-sm">

        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Seats</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {events.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-8 text-gray-400">
                No events found
              </td>
            </tr>
          ) : (
            events.map((event) => (
              <tr key={event._id} className="hover:bg-gray-50 transition">

                <td className="px-4 py-3">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>

                <td className="px-4 py-3 font-medium">{event.title}</td>
                <td className="px-4 py-3 text-gray-500">{event.category}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(event.date).toDateString()}
                </td>
                <td className="px-4 py-3 text-gray-500">{event.location}</td>
                <td className="px-4 py-3 text-gray-500">
                  {event.ticketPrice === 0 ? "Free" : `₹${event.ticketPrice}`}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {event.availableSeats}/{event.totalSeats}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {/* calls handleEdit in Admin.jsx */}
                    <button
                      onClick={() => onEdit(event)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      Edit
                    </button>
                    {/* calls handleDelete in Admin.jsx */}
                    <button
                      onClick={() => onDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default EventTable;