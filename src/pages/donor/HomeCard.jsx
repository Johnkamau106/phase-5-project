import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCard.css';

const HomeCard = ({ home, id }) => {
  const percentFunded = home.target > 0
    ? Math.min(100, ((home.amountContributed / home.target) * 100).toFixed(1))
    : 0;

  return (
    <div className="home-card">
      <img src={home.image} alt={home.name} className="home-image" />
      <div className="home-content">
        <h4>{home.name}</h4>
        <p className="home-location">📍 {home.location}</p>
        <div className="current-needs">
          <h5>Current Needs</h5>
          <div className="needs-list">
            {home.needs?.length > 0 ? (
              home.needs.map((need, index) => (
                <span key={index} className="need-tag">
                  {need}
                </span>
              ))
            ) : (
              <span className="need-tag">No current needs listed</span>
            )}
          </div>
        </div>
        <p className="home-description">{home.description}</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${percentFunded}%` }}
          ></div>
          <span className="progress-label">
            {percentFunded}% funded
          </span>
        </div>
        <div className="donation-stats">
          <span>Contributed: KES {home.amountContributed?.toLocaleString() || 0}</span>
          <span>Target: KES {home.target?.toLocaleString() || 0}</span>
        </div>
        <Link to={`/homes/${id}`} className="btn secondary">
          Visit Page
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
