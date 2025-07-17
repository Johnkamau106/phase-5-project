import React from 'react';
import './SplashFooter.css';

const SplashFooter = () => {
  return (
    <footer className="splash-footer">
      <p>© {new Date().getFullYear()} Hope Haven. All rights reserved.</p>
    </footer>
  );
};

export default SplashFooter;
