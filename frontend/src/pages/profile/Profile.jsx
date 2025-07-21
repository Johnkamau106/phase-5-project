import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const location = useLocation();

  // Sample user data - replace with actual user props
  const sampleUser = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Hope Street, Haven City",
    bio: "Passionate about helping children in need.",
    roles: ["donor"],
    avatar: "https://i.pravatar.cc/150?img=5"
  };

  const currentUser = user || sampleUser;

  const renderRoleBadges = () => {
    return currentUser?.roles?.map(role => (
      <span 
        key={role}
        className={`role-badge ${
          role === 'admin' ? 'admin' :
          role === 'caregiver' ? 'caregiver' :
          'donor'
        }`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    ));
  };

  const renderRoleSpecificTabs = () => {
    const donorTabs = [
      { id: 'sponsored', label: 'Sponsored Children' },
      { id: 'donations', label: 'Donations' }
    ];

    const caregiverTabs = [
      { id: 'children', label: 'My Children' },
      { id: 'needs', label: 'Current Needs' }
    ];

    const adminTabs = [
      { id: 'users', label: 'User Management' },
      { id: 'reports', label: 'Reports' }
    ];

    let tabs = [
      { id: 'profile', label: 'Profile' },
      { id: 'activity', label: 'Activity' }
    ];

    if (currentUser?.roles?.includes('donor')) {
      tabs = [...tabs, ...donorTabs];
    }
    if (currentUser?.roles?.includes('caregiver')) {
      tabs = [...tabs, ...caregiverTabs];
    }
    if (currentUser?.roles?.includes('admin')) {
      tabs = [...tabs, ...adminTabs];
    }

    return tabs.map(tab => (
      <button
        key={tab.id}
        className={`sidebar-nav-item ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="profile-info">
            <div className="profile-header">
              <div className="avatar-container">
                <img 
                  src={currentUser?.avatar} 
                  alt="Profile" 
                  className="profile-avatar"
                />
              </div>
              <div className="profile-meta">
                <h2>{currentUser?.name}</h2>
                <p className="profile-email">{currentUser?.email}</p>
                <div className="profile-roles">
                  {renderRoleBadges()}
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-card">
                <h3>Contact Information</h3>
                <p><strong>Phone:</strong> {currentUser?.phone || 'Not provided'}</p>
                <p><strong>Address:</strong> {currentUser?.address || 'Not provided'}</p>
              </div>

              <div className="profile-card">
                <h3>About</h3>
                <p>{currentUser?.bio || 'No bio provided'}</p>
              </div>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="profile-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📅</div>
                <div className="activity-content">
                  <p>You logged in on {new Date().toLocaleDateString()}</p>
                  <small className="activity-time">Today</small>
                </div>
              </div>
            </div>
          </div>
        );
      case 'sponsored':
        return (
          <div className="profile-section">
            <h3>My Sponsored Children</h3>
            <div className="empty-state">
              <p>No children sponsored yet.</p>
              <button className="primary-button">Find Children to Sponsor</button>
            </div>
          </div>
        );
      case 'donations':
        return (
          <div className="profile-section">
            <h3>Donations History</h3>
            <div className="empty-state">
              <p>No donations made yet.</p>
              <button className="primary-button">Make a Donation</button>
            </div>
          </div>
        );
      case 'children':
        return (
          <div className="profile-section">
            <h3>Children Assigned</h3>
            <div className="empty-state">
              <p>No children currently assigned.</p>
            </div>
          </div>
        );
      case 'needs':
        return (
          <div className="profile-section">
            <h3>Current Needs</h3>
            <div className="empty-state">
              <p>No needs currently posted.</p>
              <button className="primary-button">Post a Need</button>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="profile-section">
            <h3>User Management</h3>
            <div className="empty-state">
              <p>Manage all users of the system.</p>
              <button className="primary-button">View All Users</button>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="profile-section">
            <h3>System Reports</h3>
            <div className="empty-state">
              <p>No reports available.</p>
              <button className="primary-button">Generate Reports</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-banner"></div>

      <main className="profile-main">
        <div className="profile-sidebar">
          <div className="sidebar-avatar">
            <img 
              src={currentUser?.avatar} 
              alt="Profile" 
              className="sidebar-avatar-img"
            />
            <h3>{currentUser?.name}</h3>
            <p className="sidebar-email">{currentUser?.email}</p>
          </div>

          <nav className="sidebar-nav">
            {renderRoleSpecificTabs()}
          </nav>
        </div>

        <div className="profile-content">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default Profile;