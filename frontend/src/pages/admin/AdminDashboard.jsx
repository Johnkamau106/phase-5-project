import React, { useState } from "react";
import "./AdminDashboard.css";
import AdminUsers from "./AdminUsers.jsx";
import AdminHomes from "./AdminHomes.jsx";
import AdminDonations from "./AdminDonations.jsx";
import AdminEvents from "./AdminEvents.jsx";
import AdminReports from "./AdminReports.jsx";
import SettingsSection from "./SettingsSection.jsx";
import DashboardSummary from "./DashboardSummary.jsx";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("summary");
  const [userCount, setUserCount] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    users: false,
    homes: false,
    donations: false,
    events: false,
    reports: false,
    settings: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const handleUserCountUpdate = (count) => {
    setUserCount(count);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return (
          <AdminUsers
            expanded={expandedSections.users}
            toggleSection={() => toggleSection("users")}
            onUserCountChange={handleUserCountUpdate}
          />
        );
      case "homes":
        return (
          <AdminHomes
            expanded={expandedSections.homes}
            toggleSection={() => toggleSection("homes")}
          />
        );
      case "donations":
        return (
          <AdminDonations
            expanded={expandedSections.donations}
            toggleSection={() => toggleSection("donations")}
          />
        );
      case "events":
        return (
          <AdminEvents
            expanded={expandedSections.events}
            toggleSection={() => toggleSection("events")}
          />
        );
      case "reports":
        return (
          <AdminReports
            expanded={expandedSections.reports}
            toggleSection={() => toggleSection("reports")}
          />
        );
      case "settings":
        return (
          <SettingsSection
            expanded={expandedSections.settings}
            toggleSection={() => toggleSection("settings")}
          />
        );
      default:
        return <DashboardSummary userCount={userCount} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome, Admin!</h2>

      <section className="dashboard-nav">
        <button onClick={() => setActiveSection("summary")}>Dashboard</button>
        <button onClick={() => setActiveSection("users")}>
          Manage Users ({userCount})
        </button>
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
