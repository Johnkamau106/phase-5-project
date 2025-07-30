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
  const [homeCount, setHomeCount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);

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

  const handleUserCountUpdate = (count) => setUserCount(count);
  const handleHomeCountUpdate = (count) => setHomeCount(count);
  const handleDonationTotalUpdate = (total) => setTotalDonations(total);
  const handleUpcomingEventsUpdate = (count) => setUpcomingEvents(count);

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
        return <AdminHomes onHomeCountChange={handleHomeCountUpdate} />;
      case "donations":
        return (
          <AdminDonations
            expanded={expandedSections.donations}
            toggleSection={() => toggleSection("donations")}
            onDonationTotalChange={handleDonationTotalUpdate}
          />
        );
      case "events":
        return (
          <AdminEvents
            expanded={expandedSections.events}
            toggleSection={() => toggleSection("events")}
            onUpcomingEventsChange={handleUpcomingEventsUpdate}
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
        return (
          <DashboardSummary
            userCount={userCount}
            homeCount={homeCount}
            totalDonations={totalDonations}
            upcomingEvents={upcomingEvents}
          />
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h2>👩‍⚕️ Admin Dashboard</h2>
          <p>Welcome back, Admin!</p>
        </div>
      </header>

      <section className="dashboard-nav">
        <button onClick={() => setActiveSection("summary")}>Dashboard</button>
        <button onClick={() => setActiveSection("users")}>
          Manage Users ({userCount})
        </button>
        <button onClick={() => setActiveSection("homes")}>
          Manage Homes ({homeCount})
        </button>
        <button onClick={() => setActiveSection("donations")}>
          View Donations()
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
