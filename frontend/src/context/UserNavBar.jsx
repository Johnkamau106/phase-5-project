import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNavBar.css';

const UserNavBar = ({ user,onLogout }) => {
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
              <span><Link to="/admin">Admin</Link></span>
            </li>
          )}

          {/* Caregiver Dropdown */}
          {roles.includes('caregiver') && (
            <li
              className="dropdown"
              onMouseEnter={() => toggleDropdown('caregiver')}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <span><Link to="/caregiver">Caregiver</Link></span>
            </li>
          )}

          {/* Donor Dropdown (available to all) */}
          <li
            className="dropdown"
            onMouseEnter={() => toggleDropdown('donor')}
            onMouseLeave={() => toggleDropdown(null)}
          >
            <span><Link to="/donor">Donor</Link></span>
          </li>

          {/* Universal */}
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Support</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        <span>👋 {user?.username}</span>
        <button className="logout-button"onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default UserNavBar;
