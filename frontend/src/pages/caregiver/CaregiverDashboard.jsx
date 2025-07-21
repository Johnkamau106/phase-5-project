import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CaregiverDashboard.css';
import ChildrenList from './ChildrenList';
import TasksSection from './TasksSection';
import ProfileSection from './ProfileSection';
import MedicalRecords from './MedicalRecords';
import EducationRecords from './EducationRecords';
import ChildrenDirectory from './ChildrenDirectory';

const CaregiverDashboard = ({ user }) => {
  const [activeSection, setActiveSection] = useState('summary');
  const [expandedChildren, setExpandedChildren] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState(false);
  const [expandedMedical, setExpandedMedical] = useState(false);
  const [expandedEducation, setExpandedEducation] = useState(false);
  const [expandedDirectory, setExpandedDirectory] = useState(false);
  const [notifications, setNotifications] = useState({
    tasks: 3,
    medical: 2,
    education: 1
  });

  const toggleSection = (section) => {
    // Reset all expanded states
    setExpandedChildren(false);
    setExpandedTasks(false);
    setExpandedProfile(false);
    setExpandedMedical(false);
    setExpandedEducation(false);
    setExpandedDirectory(false);

    // Toggle the selected section
    switch (section) {
      case 'children':
        setExpandedChildren(!expandedChildren);
        break;
      case 'tasks':
        setExpandedTasks(!expandedTasks);
        break;
      case 'profile':
        setExpandedProfile(!expandedProfile);
        break;
      case 'medical':
        setExpandedMedical(!expandedMedical);
        break;
      case 'education':
        setExpandedEducation(!expandedEducation);
        break;
      case 'directory':
        setExpandedDirectory(!expandedDirectory);
        break;
      default:
        break;
    }
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'children':
        return (
          <div className={`caregiver-section ${expandedChildren ? 'expanded' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('children')}>
              <h3>👶 My Children {expandedChildren ? '▴' : '▾'}</h3>
            </div>
            {expandedChildren && (
              <div className="section-content">
                <ChildrenList caregiverId={user.id} />
                <div className="section-actions">
                  <Link to="/caregiver/enroll" className="btn-primary">
                    <i className="fas fa-plus"></i> Enroll New Child
                  </Link>
                  <button className="btn-secondary">
                    <i className="fas fa-file-export"></i> Export List
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'medical':
        return (
          <div className={`caregiver-section ${expandedMedical ? 'expanded' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('medical')}>
              <div className="header-title">
                <h3>🏥 Medical Records {expandedMedical ? '▴' : '▾'}</h3>
                {notifications.medical > 0 && (
                  <span className="notification-badge">{notifications.medical}</span>
                )}
              </div>
            </div>
            {expandedMedical && (
              <div className="section-content">
                <MedicalRecords caregiverId={user.id} />
              </div>
            )}
          </div>
        );

      case 'education':
        return (
          <div className={`caregiver-section ${expandedEducation ? 'expanded' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('education')}>
              <h3>📚 Education Records {expandedEducation ? '▴' : '▾'}</h3>
            </div>
            {expandedEducation && (
              <div className="section-content">
                <EducationRecords caregiverId={user.id} />
              </div>
            )}
          </div>
        );

      case 'directory':
        return (
          <div className={`caregiver-section ${expandedDirectory ? 'expanded' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('directory')}>
              <h3>👥 Children Directory {expandedDirectory ? '▴' : '▾'}</h3>
            </div>
            {expandedDirectory && (
              <div className="section-content">
                <ChildrenDirectory />
              </div>
            )}
          </div>
        );

      // ... (keep existing tasks and profile sections) ...

      default:
        return (
          <section className="dashboard-summary">
            <div className="summary-card" onClick={() => toggleSection('children')}>
              <div className="card-icon">👶</div>
              <h3>My Children</h3>
              <p className="summary-value">8</p>
              <span className="view-link">View all →</span>
            </div>
            
            <div className="summary-card" onClick={() => toggleSection('medical')}>
              <div className="card-icon">🏥</div>
              <h3>Medical Records</h3>
              <p className="summary-value">{notifications.medical} updates</p>
              <span className="view-link">View →</span>
            </div>
            
            <div className="summary-card" onClick={() => toggleSection('education')}>
              <div className="card-icon">📚</div>
              <h3>Education Records</h3>
              <p className="summary-value">{notifications.education} new</p>
              <span className="view-link">View →</span>
            </div>
            
            <div className="summary-card" onClick={() => toggleSection('directory')}>
              <div className="card-icon">👥</div>
              <h3>Directory</h3>
              <p className="summary-value">24 children</p>
              <span className="view-link">View →</span>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="caregiver-dashboard">
      <header className="caregiver-header">
        <div className="header-content">
          <h2>👩‍⚕️ Caregiver Dashboard</h2>
          <p>Welcome back, {user?.username}</p>
        </div>
        <div className="header-actions">
          <button className="notification-btn">
            <i className="fas fa-bell"></i>
            {Object.values(notifications).reduce((a, b) => a + b, 0) > 0 && (
              <span className="notification-count">
                {Object.values(notifications).reduce((a, b) => a + b, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button className={activeSection === 'summary' ? 'active' : ''}
          onClick={() => toggleSection('summary')}>
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </button>
        
        <button className={activeSection === 'children' ? 'active' : ''}
          onClick={() => toggleSection('children')}>
          <i className="fas fa-child"></i> My Children
        </button>
        
        <div className="dropdown-nav">
          <button className={activeSection.startsWith('records') ? 'active' : ''}>
            <i className="fas fa-folder"></i> Records <i className="fas fa-caret-down"></i>
          </button>
          <div className="dropdown-nav-menu">
            <button onClick={() => toggleSection('medical')}>
              <i className="fas fa-heartbeat"></i> Medical
              {notifications.medical > 0 && <span>{notifications.medical}</span>}
            </button>
            <button onClick={() => toggleSection('education')}>
              <i className="fas fa-graduation-cap"></i> Education
            </button>
          </div>
        </div>
        
        <button className={activeSection === 'directory' ? 'active' : ''}
          onClick={() => toggleSection('directory')}>
          <i className="fas fa-users"></i> Directory
        </button>
        
        <button className={activeSection === 'tasks' ? 'active' : ''}
          onClick={() => toggleSection('tasks')}>
          <i className="fas fa-tasks"></i> Tasks
          {notifications.tasks > 0 && <span>{notifications.tasks}</span>}
        </button>
      </nav>

      <main className="dashboard-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default CaregiverDashboard;