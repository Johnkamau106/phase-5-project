import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="intro">
        <h2 className="title">Welcome to Our Children's Home Platform</h2>
        <p className="subtitle">
          Connect with children's homes and orphanages worldwide. Make a difference through donations, visits, and spreading love to those who need it most.
        </p>
      </section>

      <section className="stats">
        <div className="stat">
          <p className="number">250+</p>
          <p className="label">Children Helped</p>
        </div>
        <div className="stat">
          <p className="number">45</p>
          <p className="label">Partner Homes</p>
        </div>
        <div className="stat">
          <p className="number">$85K</p>
          <p className="label">Funds Raised</p>
        </div>
        <div className="stat">
          <p className="number">120</p>
          <p className="label">Volunteers</p>
        </div>
      </section>

      <section className="homes">
        <h3 className="section-title">Featured Children's Homes</h3>
        <div className="home-list">
          <div className="home-card">
            <h4 className="home-name">Sunshine Children's Haven</h4>
            <p className="location">Nairobi, Kenya — 45 children</p>
            <p className="description">Providing love, education, and hope since 2010.</p>
            <p className="progress">Donation Progress: $32,000 / $50,000 (64%)</p>
          </div>
          <div className="home-card">
            <h4 className="home-name">Little Angels Home</h4>
            <p className="location">Lagos, Nigeria — 28 children</p>
            <p className="description">Creating a safe environment where children can thrive.</p>
            <p className="progress">Donation Progress: $28,500 / $35,000 (81%)</p>
          </div>
          <div className="home-card">
            <h4 className="home-name">Hope & Dreams Sanctuary</h4>
            <p className="location">Cape Town, South Africa — 62 children</p>
            <p className="description">Empowering children through education and community support.</p>
            <p className="progress">Donation Progress: $45,000 / $75,000 (60%)</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h3 className="cta-title">Ready to Make a Difference?</h3>
        <p className="cta-text">Join our community of caring individuals changing lives, one child at a time.</p>
        <p className="tagline">Children's Hope – Connecting hearts with children in need.</p>
      </section>
    </div>
  );
};

export default HomePage;
