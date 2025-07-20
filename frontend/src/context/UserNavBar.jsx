import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNavBar.css';

const UserNavBar = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(null);
  
  const toggleDropdown = (menu) => {
    setShowDropdown(showDropdown === menu ? null : menu);
  };
  const roles = user?.roles || [];

  return (
    <nav className="user-navbar">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/home">🏠Hope Haven</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>

          {/* Admin Dropdown */}
          {roles.includes('admin') && (
            <li
              className="dropdown"
              onMouseEnter={() => toggleDropdown('admin')}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <span>Admin ▾</span>
              {showDropdown === 'admin' && (
                <ul className="dropdown-menu">
                  <li><Link to="/admin">Admin Panel</Link></li>
                  <li><Link to="/homes">Manage Homes</Link></li>
                  <li><Link to="/events">Events Dashboard</Link></li>
                  <li><Link to="/reports">Reports</Link></li>
                </ul>
              )}
            </li>
          )}

          {/* Caregiver Dropdown */}
          {roles.includes('caregiver') && (
            <li
              className="dropdown"
              onMouseEnter={() => toggleDropdown('caregiver')}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <span>Caregiver ▾</span>
              {showDropdown === 'caregiver' && (
                <ul className="dropdown-menu">
                  <li><Link to="/caregiver">My Children</Link></li>
                  <li><Link to="/enroll-child">Enroll Child</Link></li>
                  <li><Link to="/records">Medical & Education Records</Link></li>
                  <li><Link to="/children-directory">Children Directory</Link></li>
                </ul>
              )}
            </li>
          )}

          {/* Donor Dropdown (available to all) */}
          <li
            className="dropdown"
            onMouseEnter={() => toggleDropdown('donor')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <span>Donations ▾</span>
            {showDropdown === 'donor' && (
              <ul className="dropdown-menu">
                <li><Link to="/donor">My Donations</Link></li>
                <li><Link to="/sponsor">Sponsor a Child</Link></li>
                <li><Link to="/my-sponsored-children">My Sponsored Children</Link></li>
                <li><Link to="/volunteer">Volunteer / Visit Home</Link></li>
              </ul>
            )}
          </li>

          {/* Universal */}
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Support</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        <span>👋 {user?.username}</span>
        <button className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default UserNavBar;
