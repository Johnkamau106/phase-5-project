import React from 'react';
import './NeedCard.css';

const NeedCard = ({ need }) => {
  return (
    <div className="need-card">
      <img src={need.image} alt={need.name} className="need-image" />
      <div className="need-content">
        <h4>{need.name}</h4>
        <p className="need-description">{need.description}</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${
                need.target > 0
                  ? (need.amountContributed / need.target) * 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
        <div className="donation-stats">
          <p>KES {need.amountContributed?.toLocaleString() || 0}</p>
          <p>Target: KES {need.target?.toLocaleString() || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default NeedCard;
