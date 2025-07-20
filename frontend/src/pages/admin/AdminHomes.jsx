import React from "react";

const AdminHomes = () => (
  <div>
    <h3>🏠 Manage Homes</h3>
    {/* Replace with real homes table */}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Children</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sunshine Children's Haven</td>
          <td>Nairobi</td>
          <td>45</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button>+ Add New Home</button>
  </div>
);

export default AdminHomes;