import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
   const [activeSection, setActiveSection] = useState('summary');
  const [expandedUsers, setExpandedUsers] = useState(false);
  const [expandedHomes, setExpandedHomes] = useState(false);
  const [expandedDonations, setExpandedDonations] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState(false);

  const toggleSection = (section) => {
    switch (section) {
      case 'users':
        setExpandedUsers(!expandedUsers);
        setExpandedHomes(false);
        setExpandedDonations(false);
        setExpandedEvents(false);
        break;
      case 'homes':
        setExpandedHomes(!expandedHomes);
        setExpandedUsers(false);
        setExpandedDonations(false);
        setExpandedEvents(false);
        break;
      case 'donations':
        setExpandedDonations(!expandedDonations);
        setExpandedUsers(false);
        setExpandedHomes(false);
        setExpandedEvents(false);
        break;
      case 'events':
        setExpandedEvents(!expandedEvents);
        setExpandedUsers(false);
        setExpandedHomes(false);
        setExpandedDonations(false);
        break;
      default:
        // Reset all toggles for summary view
        setExpandedUsers(false);
        setExpandedHomes(false);
        setExpandedDonations(false);
        setExpandedEvents(false);
    }
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className={`admin-section ${expandedUsers ? 'expanded' : ''}`}>
            <div 
              className="section-header"
              onClick={() => toggleSection('users')}
            >
              <h3>👥 Manage Users ▾</h3>
            </div>
            {expandedUsers && (
              <div className="section-content">
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
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="add-new-btn">+ Add New User</button>
              </div>
            )}
          </div>
        );
      case 'homes':
        return (
          <div className={`admin-section ${expandedHomes ? 'expanded' : ''}`}>
            <div 
              className="section-header"
              onClick={() => toggleSection('homes')}
            >
              <h3>🏠 Registered Homes ▾</h3>
            </div>
            {expandedHomes && (
              <div className="section-content">
                <ul className="homes-list">
                  <li>
                    Hope Children's Home - Nairobi
                    <div className="home-actions">
                      <button>View</button>
                      <button>Edit</button>
                    </div>
                  </li>
                  <li>
                    Sunrise Orphanage - Kisumu
                    <div className="home-actions">
                      <button>View</button>
                      <button>Edit</button>
                    </div>
                  </li>
                </ul>
                <button className="add-new-btn">+ Register New Home</button>
              </div>
            )}
          </div>
        );

      case 'donations':
        return (
          <div className={`admin-section ${expandedDonations ? 'expanded' : ''}`}>
            <div 
              className="section-header"
              onClick={() => toggleSection('donations')}
            >
              <h3>💰 Donation Records ▾</h3>
            </div>
            {expandedDonations && (
              <div className="section-content">
                <table>
                  <thead>
                    <tr>
                      <th>Donor</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Smith</td>
                      <td>KES 50,000</td>
                      <td>2025-07-10</td>
                      <td>Confirmed</td>
                      <td>
                        <button>Details</button>
                        <button>Receipt</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="donation-stats">
                  <span>Total: KES 1,200,000</span>
                  <span>This Month: KES 150,000</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'events':
        return (
          <div className={`admin-section ${expandedEvents ? 'expanded' : ''}`}>
            <div 
              className="section-header"
              onClick={() => toggleSection('events')}
            >
              <h3>📅 Upcoming Events ▾</h3>
            </div>
            {expandedEvents && (
              <div className="section-content">
                <ul className="events-list">
                  <li>
                    <strong>Back-to-School Drive</strong>
                    <span>Aug 5, 2025</span>
                    <div className="event-actions">
                      <button>Manage</button>
                      <button>Attendees</button>
                    </div>
                  </li>
                  <li>
                    <strong>Medical Camp</strong>
                    <span>Sep 12, 2025</span>
                    <div className="event-actions">
                      <button>Manage</button>
                      <button>Attendees</button>
                    </div>
                  </li>
                </ul>
                <button className="add-new-btn">+ Create New Event</button>
              </div>
            )}
          </div>
        );
      case 'settings':
        return (
          <div className="admin-section">
            <h3>⚙️ Settings</h3>
            <div className="settings-grid">
              <div className="setting-card">
                <h4>System Preferences</h4>
                <button>Configure</button>
              </div>
              <div className="setting-card">
                <h4>User Permissions</h4>
                <button>Manage</button>
              </div>
              <div className="setting-card">
                <h4>Notification Settings</h4>
                <button>Adjust</button>
              </div>
              <div className="setting-card">
                <h4>Backup & Restore</h4>
                <button>Options</button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <section className="dashboard-summary">
            <div 
              className="summary-card" 
              onClick={() => toggleSection('users')}
            >
              <h3>👥 Total Users</h3>
              <p>58</p>
              <span className="view-link">View all →</span>
            </div>
            <div 
              className="summary-card"
              onClick={() => toggleSection('homes')}
            >
              <h3>🏠 Registered Homes</h3>
              <p>15</p>
              <span className="view-link">View all →</span>
            </div>
            <div 
              className="summary-card"
              onClick={() => toggleSection('donations')}
            >
              <h3>💰 Total Donations</h3>
              <p>KES 1,200,000</p>
              <span className="view-link">View all →</span>
            </div>
            <div 
              className="summary-card"
              onClick={() => toggleSection('events')}
            >
              <h3>📅 Upcoming Events</h3>
              <p>3</p>
              <span className="view-link">View all →</span>
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
