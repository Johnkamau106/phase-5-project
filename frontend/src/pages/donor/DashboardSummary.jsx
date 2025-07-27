import React from "react";
// import "./DonorDashboardSummary.css"; // optional for styling

const DonorDashboardSummary = ({
  totalDonations,
  sponsoredChildren,
  supportedHomes,
  volunteerVisits,
}) => {
  return (
    <div className="dashboard-summary">
      <h2>💝 Donor Summary</h2>
      <div className="summary-cards">
        <div className="card">
          <h3>🎁 Total Donations</h3>
          <p>KES {totalDonations?.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>🧒 Sponsored Children</h3>
          <p>{sponsoredChildren}</p>
        </div>
        <div className="card">
          <h3>🏠 Supported Homes</h3>
          <p>{supportedHomes}</p>
        </div>
        <div className="card">
          <h3>🤝 Volunteer Visits</h3>
          <p>{volunteerVisits}</p>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboardSummary;
