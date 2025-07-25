import React, { useState, useEffect } from 'react';
import './HomePage.css';
import HomeCard from "../donor/HomeCard.jsx"; 
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const HomePage = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/homes`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHomes(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  if (loading) {
    return <div className="homepage">Loading homes...</div>;
  }

  if (error) {
    return <div className="homepage">Error: {error.message}</div>;
  }

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
          {homes.length === 0 ? (
            <p>No homes found.</p>
          ) : (
            homes.map((home) => (
              <HomeCard key={home.id} home={home} id={home.id} />
            ))
          )}
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
