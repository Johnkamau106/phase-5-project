import React from "react";

const AdminEvents = () => (
  <div>
    <h3>📅 Events</h3>
    {/* Replace with real events table */}
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Date</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Charity Walk</td>
          <td>2025-08-15</td>
          <td>Nairobi</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button>+ Add New Event</button>
  </div>
);

export default AdminEvents;