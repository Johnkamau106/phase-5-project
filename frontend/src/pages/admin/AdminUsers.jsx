import React from "react";

const AdminUsers = () => (
  <div>
    <h3>👥 Manage Users</h3>
    {/* Replace with real user table */}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jane Doe</td>
          <td>jane@example.com</td>
          <td>Donor</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button>+ Add New User</button>
  </div>
);

export default AdminUsers;