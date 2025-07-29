import React from 'react';
import './splashHeroSection.css';

const SplashHeroSection = () => {
  return (
    <section className="splash-hero">
      <div className="hero-content">
        <h1>Support Children. Empower Futures.</h1>
        <p>Connecting hearts with homes that need help the most.</p>
        <button
          className="hero-button"
          onClick={() => window.location.href = '/login'}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default SplashHeroSection;
