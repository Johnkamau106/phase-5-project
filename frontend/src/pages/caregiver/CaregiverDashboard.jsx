import React, { useState } from 'react';
import './CaregiverDashboard.css';
import ChildrenList from './ChildrenList';
// Add other components as needed
import TasksSection from './TasksSection'; // Optional
import ProfileSection from './ProfileSection'; // Optional

const CaregiverDashboard = () => {
  const [activeSection, setActiveSection] = useState('children');

  const renderSection = () => {
    switch (activeSection) {
      case 'children':
        return <ChildrenList />;
      case 'tasks':
        return <TasksSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <ChildrenList />;
    }
  };

  return (
    <div className="caregiver-dashboard">
      <header className="caregiver-header">
        <h2>👩‍⚕️ Caregiver Dashboard</h2>
        <p>Manage your assigned children and daily tasks</p>
      </header>

      <nav className="dashboard-nav">
        <button onClick={() => setActiveSection('children')}>👶 Children</button>
        <button onClick={() => setActiveSection('tasks')}>📝 Tasks</button>
        <button onClick={() => setActiveSection('profile')}>👤 Profile</button>
      </nav>

      <section className="dashboard-section">
        {renderSection()}
      </section>
    </div>
  );
};

export default CaregiverDashboard;
