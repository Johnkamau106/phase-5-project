/* SettingsSection.jsx */
import React from "react";
import "../../pages/admin/AdminDashboard.css";

const SettingsSection = ({ expanded, toggleSection }) => (
  <div className={`admin-section ${expanded ? "expanded" : ""}`}>
    <div className="section-header" onClick={() => toggleSection("settings")}>
      <h3>⚙️ Settings ▾</h3>
    </div>
    {expanded && (
      <div className="section-content">
        <p>Admin settings content goes here...</p>
      </div>
    )}
  </div>
);

export default SettingsSection;
