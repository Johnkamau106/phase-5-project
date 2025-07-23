import React, { useState } from "react";
import "./AdminDashboard.css";
import {
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../../utils/authserver.js";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [activeSection, setActiveSection] = useState("summary");
  const [expandedUsers, setExpandedUsers] = useState(false);
  const [expandedHomes, setExpandedHomes] = useState(false);
  const [expandedDonations, setExpandedDonations] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState(false);
  const [expandedReports, setExpandedReports] = useState(false);

  const toggleSection = (section) => {
    switch (section) {
      case "users":
        if (!expandedUsers) {
          setLoadingUsers(true);
          getAllUsers()
            .then((data) => {
              setUsers(data);
              setLoadingUsers(false);
            })
            .catch((error) => {
              setErrorUsers(error.message);
              setLoadingUsers(false);
            });
        }
        break;
      case "homes":
        setExpandedHomes(!expandedHomes);
        setExpandedUsers(false);
        setExpandedDonations(false);
        setExpandedEvents(false);
        break;
      case "donations":
        setExpandedDonations(!expandedDonations);
        setExpandedUsers(false);
        setExpandedHomes(false);
        setExpandedEvents(false);
        break;
      case "events":
        setExpandedEvents(!expandedEvents);
        setExpandedUsers(false);
        setExpandedHomes(false);
        setExpandedDonations(false);
        break;
      case "reports":
        setExpandedReports(!expandedReports);
        setExpandedUsers(false);
        setExpandedHomes(false);
        setExpandedDonations(false);
        setExpandedEvents(false);
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
      case "users":
        return (
          <div className={`admin-section ${expandedUsers ? "expanded" : ""}`}>
            <div
              className="section-header"
              onClick={() => toggleSection("users")}
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
                    {loadingUsers ? (
                      <tr>
                        <td colSpan="4">Loading...</td>
                      </tr>
                    ) : errorUsers ? (
                      <tr>
                        <td colSpan="4">{errorUsers}</td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan="4">No users found</td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <button className="edit-btn">Edit</button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <button className="add-new-btn">+ Add New User</button>
              </div>
            )}
          </div>
        );
      case "homes":
        return (
          <div className={`admin-section ${expandedHomes ? "expanded" : ""}`}>
            <div
              className="section-header"
              onClick={() => toggleSection("homes")}
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

      case "donations":
        return (
          <div
            className={`admin-section ${expandedDonations ? "expanded" : ""}`}
          >
            <div
              className="section-header"
              onClick={() => toggleSection("donations")}
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

      case "events":
        return (
          <div className={`admin-section ${expandedEvents ? "expanded" : ""}`}>
            <div
              className="section-header"
              onClick={() => toggleSection("events")}
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

      case "reports":
        return (
          <div className={`admin-section ${expandedReports ? "expanded" : ""}`}>
            <div
              className="section-header"
              onClick={() => toggleSection("reports")}
            >
              <h3>📋 Case Reports {expandedReports ? "▴" : "▾"}</h3>
              {expandedReports && (
                <div className="header-actions">
                  <button className="btn-refresh" title="Refresh Data">
                    <i className="fas fa-sync-alt"></i>
                  </button>
                </div>
              )}
            </div>
            {expandedReports && (
              <div className="section-content">
                <div className="case-filters">
                  <div className="filter-group">
                    <label>Status:</label>
                    <select defaultValue="All">
                      <option value="All">All</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Report Type:</label>
                    <select defaultValue="All">
                      <option value="All">All</option>
                      <option value="Medical">Medical</option>
                      <option value="Educational">Educational</option>
                      <option value="Behavioral">Behavioral</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Date Range:</label>
                    <div className="date-range">
                      <input type="date" />
                      <span>to</span>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="filter-group search-group">
                    <label>Search:</label>
                    <input type="text" placeholder="Case ID or Child Name" />
                  </div>
                  <button className="btn-primary">Apply Filters</button>
                  <button className="btn-secondary">Reset</button>
                </div>

                <div className="case-stats">
                  <div className="stat-card">
                    <span className="stat-value">24</span>
                    <span className="stat-label">Total Cases</span>
                  </div>
                  <div className="stat-card urgent">
                    <span className="stat-value">3</span>
                    <span className="stat-label">Urgent</span>
                  </div>
                  <div className="stat-card open">
                    <span className="stat-value">8</span>
                    <span className="stat-label">Open</span>
                  </div>
                  <div className="stat-card in-progress">
                    <span className="stat-value">10</span>
                    <span className="stat-label">In Progress</span>
                  </div>
                  <div className="stat-card resolved">
                    <span className="stat-value">6</span>
                    <span className="stat-label">Resolved</span>
                  </div>
                </div>

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          Case ID <i className="fas fa-sort"></i>
                        </th>
                        <th>
                          Child Name <i className="fas fa-sort"></i>
                        </th>
                        <th>Age</th>
                        <th>Home</th>
                        <th>Type</th>
                        <th>Reported</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="urgent-case">
                        <td>CR-2023-001</td>
                        <td>
                          <div className="child-info">
                            <span className="child-name">John Doe</span>
                            <span className="child-id">ID: CH-1001</span>
                          </div>
                        </td>
                        <td>9</td>
                        <td>Hope Children's Home</td>
                        <td>Medical</td>
                        <td>2023-05-15</td>
                        <td>2023-05-18</td>
                        <td>
                          <span className="status-badge urgent">Urgent</span>
                        </td>
                        <td className="actions">
                          <button className="btn-view" title="View Details">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn-edit" title="Edit Case">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn-notes" title="Add Notes">
                            <i className="fas fa-comment-medical"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>CR-2023-002</td>
                        <td>
                          <div className="child-info">
                            <span className="child-name">Mary Johnson</span>
                            <span className="child-id">ID: CH-1042</span>
                          </div>
                        </td>
                        <td>12</td>
                        <td>Sunrise Orphanage</td>
                        <td>Educational</td>
                        <td>2023-05-18</td>
                        <td>2023-05-20</td>
                        <td>
                          <span className="status-badge open">Open</span>
                        </td>
                        <td className="actions">
                          <button className="btn-view" title="View Details">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn-edit" title="Edit Case">
                            <i className="fas fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>CR-2023-003</td>
                        <td>
                          <div className="child-info">
                            <span className="child-name">Peter Mwangi</span>
                            <span className="child-id">ID: CH-1015</span>
                          </div>
                        </td>
                        <td>14</td>
                        <td>Grace Children's Home</td>
                        <td>Behavioral</td>
                        <td>2023-05-20</td>
                        <td>2023-05-25</td>
                        <td>
                          <span className="status-badge resolved">
                            Resolved
                          </span>
                        </td>
                        <td className="actions">
                          <button className="btn-view" title="View Details">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn-details" title="Case History">
                            <i className="fas fa-history"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pagination-controls">
                  <button className="btn-pagination" disabled>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <span className="page-info">Page 1 of 5</span>
                  <button className="btn-pagination">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <select className="page-size">
                    <option>10 per page</option>
                    <option>25 per page</option>
                    <option>50 per page</option>
                  </select>
                </div>

                <div className="case-actions">
                  <button className="btn-primary">
                    <i className="fas fa-plus"></i> New Case Report
                  </button>
                  <button className="btn-export">
                    <i className="fas fa-file-export"></i> Export to CSV
                  </button>
                  <button className="btn-print">
                    <i className="fas fa-print"></i> Print Report
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "settings":
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
              onClick={() => toggleSection("users")}
            >
              <h3>👥 Total Users</h3>
              <p>58</p>
              <span className="view-link">View all →</span>
            </div>
            <div
              className="summary-card"
              onClick={() => toggleSection("homes")}
            >
              <h3>🏠 Registered Homes</h3>
              <p>15</p>
              <span className="view-link">View all →</span>
            </div>
            <div
              className="summary-card"
              onClick={() => toggleSection("donations")}
            >
              <h3>💰 Total Donations</h3>
              <p>KES 1,200,000</p>
              <span className="view-link">View all →</span>
            </div>
            <div
              className="summary-card"
              onClick={() => toggleSection("events")}
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
        <button onClick={() => setActiveSection("summary")}>Dashboard</button>
        <button onClick={() => setActiveSection("users")}>Manage Users</button>
        <button onClick={() => setActiveSection("homes")}>Manage Homes</button>
        <button onClick={() => setActiveSection("donations")}>
          View Donations
        </button>
        <button onClick={() => setActiveSection("events")}>Events</button>
        <button onClick={() => setActiveSection("reports")}>
          Case Reports
        </button>
        <button onClick={() => setActiveSection("settings")}>Settings</button>
      </section>

      <div className="dashboard-content">{renderSection()}</div>
    </div>
  );
};

export default AdminDashboard;
