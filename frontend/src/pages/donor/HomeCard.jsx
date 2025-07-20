import React from 'react';
import './HomeCard.css';

const HomeCard = ({ home }) => {
  return (
    <div className="home-card">
      <img src={home.image} alt={home.name} className="home-image" />
      <div className="home-content">
        <h4>{home.name}</h4>
        <p className="home-location">📍 {home.location}</p>
        <p className="home-description">{home.description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
