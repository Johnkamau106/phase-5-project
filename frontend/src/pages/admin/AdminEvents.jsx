import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/api";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "", description: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [name]: value });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleAddEvent = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewEvent({ name: "", date: "", location: "", description: "" });
      fetchEvents();
    } catch (error) {
      setError(error);
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent({ ...event, date: event.date.split('T')[0] }); // Format date for input type="date"
  };

  const handleUpdateEvent = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/${editingEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEditingEvent(null);
      fetchEvents();
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`${BASE_URL}/api/events/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchEvents();
      } catch (error) {
        setError(error);
      }
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h3>📅 Events</h3>

      {/* Add New Event Form */}
      <div className="add-event-form">
        <h4>{editingEvent ? "Edit Event" : "Add New Event"}</h4>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={editingEvent ? editingEvent.name : newEvent.name}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Event Date"
          value={editingEvent ? editingEvent.date : newEvent.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={editingEvent ? editingEvent.location : newEvent.location}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={editingEvent ? editingEvent.description : newEvent.description}
          onChange={handleInputChange}
        ></textarea>
        {editingEvent ? (
          <>
            <button onClick={handleUpdateEvent}>Update Event</button>
            <button onClick={() => setEditingEvent(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddEvent}>Add Event</button>
        )}
      </div>

      {/* Events Table */}
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
                <td>
                  <button onClick={() => handleEditClick(event)}>Edit</button>
                  <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEvents;