import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className="admin-section">
            <h3>👥 Manage Users</h3>
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
                  <td><button>Edit</button> <button>Delete</button></td>
                </tr>
                {/* Replace with mapped user data from backend */}
              </tbody>
            </table>
          </div>
        );

      case 'homes':
        return (
          <div className="admin-section">
            <h3>🏠 Registered Homes</h3>
            <ul>
              <li>Hope Children’s Home - Nairobi</li>
              <li>Sunrise Orphanage - Kisumu</li>
              {/* Replace with data from backend */}
            </ul>
          </div>
        );

      case 'donations':
        return (
          <div className="admin-section">
            <h3>💰 Donation Records</h3>
            <table>
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Smith</td>
                  <td>KES 50,000</td>
                  <td>2025-07-10</td>
                  <td>Confirmed</td>
                </tr>
                {/* Dynamic data from backend */}
              </tbody>
            </table>
          </div>
        );

      case 'events':
        return (
          <div className="admin-section">
            <h3>📅 Upcoming Events</h3>
            <ul>
              <li>Back-to-School Drive – Aug 5, 2025</li>
              <li>Medical Camp – Sep 12, 2025</li>
              {/* Fetch from backend later */}
            </ul>
          </div>
        );

      case 'settings':
        return (
          <div className="admin-section">
            <h3>⚙️ Settings</h3>
            <p>Configure system preferences, update credentials, manage access levels, and more.</p>
            {/* Form fields or links to settings actions */}
          </div>
        );
      default:
        return (
          <section className="dashboard-summary">
            <div className="summary-card">
              <h3>Total Donations</h3>
              <p>KES 1,200,000</p>
            </div>
            <div className="summary-card">
              <h3>Registered Homes</h3>
              <p>15</p>
            </div>
            <div className="summary-card">
              <h3>Donors</h3>
              <p>42</p>
            </div>
            <div className="summary-card">
              <h3>Upcoming Events</h3>
              <p>3</p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome, Admin!</h2>

      <section className="dashboard-nav">
        <button onClick={() => setActiveSection('summary')}>Dashboard</button>
        <button onClick={() => setActiveSection('users')}>Manage Users</button>
        <button onClick={() => setActiveSection('homes')}>Manage Homes</button>
        <button onClick={() => setActiveSection('donations')}>View Donations</button>
        <button onClick={() => setActiveSection('events')}>Events</button>
        <button onClick={() => setActiveSection('settings')}>Settings</button>
      </section>

      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
