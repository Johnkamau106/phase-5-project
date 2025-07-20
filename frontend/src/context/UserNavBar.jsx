import React from 'react';
import { Link } from 'react-router-dom';
import './UserNavBar.css';

const UserNavBar = ({ user }) => {
  return (
    <nav className="user-navbar">
      <div className="navbar-left">
        <div className="logo">🏠Hope Haven</div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>

          {user?.role === 'admin' && <li><Link to="/admin">Admin Panel</Link></li>}
          {user?.role === 'caregiver' && <li><Link to="/caregiver">My Children</Link></li>}
          <li><Link to="/donations">My Donations</Link></li>
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
