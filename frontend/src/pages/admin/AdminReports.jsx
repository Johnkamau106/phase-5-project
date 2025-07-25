import React from "react";
import "./Admin.css";

const AdminReports = () => (
  <div className="admin-page">
    <h3>📋 Case Reports</h3>
    {/* Replace with real reports table */}
    <table>
      <thead>
        <tr>
          <th>Report</th>
          <th>Date</th>
          <th>Submitted By</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Medical Follow-up</td>
          <td>2025-07-10</td>
          <td>Caregiver Anne</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default AdminReports;