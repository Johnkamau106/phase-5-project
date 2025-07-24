import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/api";
import "./EventsPage.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="events-page">
      <header className="events-header">
        <h1>Upcoming Events</h1>
        <p>Join us in making a difference. Find an event near you.</p>
      </header>
      <div className="events-list">
        {events.length === 0 ? (
          <p>No upcoming events. Please check back later.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="day">{new Date(event.date).getDate()}</span>
              </div>
              <div className="event-details">
                <h3>{event.name}</h3>
                <p className="location">📍 {event.location}</p>
                <p className="description">{event.description}</p>
              </div>
              <div className="event-actions">
                <button className="btn-primary">RSVP</button>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;
