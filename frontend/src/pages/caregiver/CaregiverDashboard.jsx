import React from 'react';
import './CaregiverDashboard.css';
import ChildrenList from './ChildrenList';

const CaregiverDashboard = () => {
  return (
    <div className="caregiver-dashboard">
      <header className="caregiver-header">
        <h2>👩‍⚕️ Caregiver Dashboard</h2>
        <p>Manage your assigned children and daily tasks</p>
      </header>
      
      <section className="dashboard-section">
        <ChildrenList />
      </section>
    </div>
  );
};

export default CaregiverDashboard;
