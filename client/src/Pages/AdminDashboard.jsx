import { useState, useEffect } from "react";
import api from "../Utils/axios";
import EventForm from "../Components/AdminComponents/EventForm";
import EventTable from "../Components/AdminComponents/EventTable"

const AdminDashboard = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const emptyForm = {
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    totalSeats: "",
    availableSeats: "",
    ticketPrice: "",
  };

  const [form, setForm] = useState(emptyForm);

  // fetch all events
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

  useEffect(() => {
    fetchEvents();
  }, []);

  
  const handleChange = (e) => {
  if (e.target.name === "image") {
    setImageFile(e.target.files[0]); 
  } else {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  };
 

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");



  try{
    const formdata = new FormData();


    Object.keys(form).forEach(key => {
      formdata.append(key,form[key]);
    })


    if(imageFile){
      formdata.append("image",imageFile);
    }


    const config = { headers: { "Content-Type": "multipart/form-data" } };



    
      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, formdata,config);
      } else {
        await api.post("/events", formdata,config);
      }

      setForm(emptyForm);
      setImageFile(null);
      setShowForm(false);
      setEditingEvent(null);
      fetchEvents();

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // fill form with event data and open form
  const handleEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date?.slice(0, 10),
      location: event.location,
      category: event.category,
      totalSeats: event.totalSeats,
      availableSeats: event.availableSeats,
      ticketPrice: event.ticketPrice,
      imageUrl: event.imageUrl
    });
    setShowForm(true);
  };

  // delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingEvent(null);
            setForm(emptyForm);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          {showForm ? "Cancel" : "+ Create Event"}
        </button>
      </div>

      {/* show form only when showForm is true */}
      {showForm && (
        <EventForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          editingEvent={editingEvent}
          error={error}
        />
      )}

    
       <EventTable
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />



    </div>
  );
};
 
export default AdminDashboard;