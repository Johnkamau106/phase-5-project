import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SplashNavBar.css';

const SplashNavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`splash-navbar ${scrolled ? 'scrolled' : ''}`}>
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
        <Link to="/login" className="auth-button">Login / Register</Link>
      </div>
    </nav>
  );
};

export default SplashNavBar;
