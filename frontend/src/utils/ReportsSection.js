// src/components/AdminSections/ReportsSection.js
import React, { useState } from 'react';
import './ReportsSection.css'; // Optional styling

const ReportsSection = ({ expanded, toggle }) => {
  const [reportFilter, setReportFilter] = useState('all');

  const caseReports = [
    { id: 1, type: 'abuse', status: 'open', description: 'Report of physical abuse at Home A' },
    { id: 2, type: 'neglect', status: 'closed', description: 'Neglect report at Home B' },
    { id: 3, type: 'abuse', status: 'investigating', description: 'Child missing school regularly' },
  ];

  const filteredReports =
    reportFilter === 'all'
      ? caseReports
      : caseReports.filter((report) => report.type === reportFilter);

  return (
    <div className={`admin-section ${expanded ? 'expanded' : ''}`}>
      <div className="section-header" onClick={toggle}>
        <h3>📋 Case Reports {expanded ? '▴' : '▾'}</h3>
      </div>

      {expanded && (
        <div className="section-content">
          <div className="report-filter">
            <label>Filter:</label>
            <select value={reportFilter} onChange={(e) => setReportFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="abuse">Abuse</option>
              <option value="neglect">Neglect</option>
            </select>
          </div>

          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.type}</td>
                  <td>{report.status}</td>
                  <td>{report.description}</td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan="4">No reports found for selected filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportsSection;
