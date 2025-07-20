import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCard.css';

const HomeCard = ({ home, id }) => {
  return (
    <div className="home-card">
      <img src={home.image} alt={home.name} className="home-image" />
      <div className="home-content">
        <h4>{home.name}</h4>
        <p className="home-location">📍 {home.location}</p>
        <p className="home-description">{home.description}</p>
        <Link to={`/homes/${id}`} className="btn secondary">Visit Page</Link>
      </div>
    </div>
  );
};

export default HomeCard;
