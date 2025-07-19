import React from 'react';
import { Link } from 'react-router-dom';
import './SplashNavBar.css';

const SplashNavBar = () => {
  return (
    <nav className="splash-navbar">
      <div className="navbar-left">
        <div className="logo">🏠Hope Haven</div>
        <ul className="nav-links">
          <li><Link to="/homes">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#orphanages">Orphanages</a></li>
          <li><a href="#footer">Contact</a></li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="auth-button">Login / Register</button>
      </div>
    </nav>
  );
};

export default SplashNavBar;
