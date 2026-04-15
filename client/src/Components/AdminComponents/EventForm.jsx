

const EventForm = ({ form, onChange, onSubmit, editingEvent, error }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">

      <h2 className="text-xl font-bold mb-4">
        {editingEvent ? "Edit Event" : "Create New Event"}
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={onChange}
          required
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={onChange}
          required
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={onChange}
          required
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="category"
          placeholder="Category (e.g. Technology)"
          value={form.category}
          onChange={onChange}
          required
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="totalSeats"
          type="number"
          placeholder="Total Seats"
          value={form.totalSeats}
          onChange={onChange}
          required
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="availableSeats"
          type="number"
          placeholder="Available Seats"
          value={form.availableSeats}
          onChange={onChange}
          required
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="ticketPrice"
          type="number"
          placeholder="Ticket Price (0 for free)"
          value={form.ticketPrice}
          onChange={onChange}
          required
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
         

         <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-medium">Event Image</label>
                <input
               name="image"
                  type="file"
              accept="image/*"
               onChange={onChange}
                className="p-2 border rounded-lg text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
  {/* Show existing image when editing */}
  {form.imageUrl && (
    <img src={form.imageUrl} alt="preview" className="mt-2 h-24 object-cover rounded-lg" />
  )}
</div>

        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={onChange}
          required
          rows={3}
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
        />

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
        >
          {editingEvent ? "Update Event" : "Create Event"}
        </button>

      </form>
    </div>
  );
};

export default EventForm;