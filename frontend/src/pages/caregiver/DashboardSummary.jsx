import React from "react";
// import "./CaregiverDashboardSummary.css"; // optional for styling

const CaregiverDashboardSummary = ({
  childrenCount,
  assignedHomes,
  upcomingEvents,
  recentReports,
}) => {
  return (
    <div className="dashboard-summary">
      <h2>👩‍⚕️ Caregiver Summary</h2>
      <div className="summary-cards">
        <div className="card">
          <h3>🧒 Children</h3>
          <p>{childrenCount}</p>
        </div>
        <div className="card">
          <h3>🏠 Assigned Homes</h3>
          <p>{assignedHomes}</p>
        </div>
        <div className="card">
          <h3>📅 Events</h3>
          <p>{upcomingEvents} Upcoming</p>
        </div>
        <div className="card">
          <h3>📝 Reports</h3>
          <p>{recentReports} Submitted</p>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboardSummary;
