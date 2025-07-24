import React, { useState, useEffect }  from 'react';
import './HomePage.css';
// import dummyHomes from "./dummyhomes";
import HomeCard from "../donor/HomeCard"; 
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const HomePage = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/homes`)
      .then(res => res.json())
      .then(data => setHomes(data))
      .catch(err => console.error(err));
  }, []);
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
          {homes.map(home => (
            <HomeCard key={home.id} home={home} id={home.id} />
          ))}
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
