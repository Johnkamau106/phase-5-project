import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCard.css';

const HomeCard = ({ home, id }) => {
  const percentage = (home.amount_contributed / home.target_amount) * 100;

  return (
    <div className="home-card">
      <img src={home.image} alt={home.name} className="home-image" />
      <div className="home-content">
        <h4>{home.name}</h4>
        <p className="home-location">📍 {home.location}</p>
        <p className="home-description">{home.description}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="progress-labels">
          <span>${home.amount_contributed.toLocaleString()}</span>
          <span>${home.target_amount.toLocaleString()}</span>
        </div>
        <Link to={`/homes/${id}`} className="btn secondary">Visit Page</Link>
      </div>
    </div>
  );
};

export default HomeCard;
