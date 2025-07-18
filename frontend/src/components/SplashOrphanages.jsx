import React from 'react';
import './SplashOrphanages.css';

const orphanages = [
  {
    id: 1,
    name: "Hope Haven",
    image: "/images/orphanage1.jpg",
    need: "School Supplies",
    urgency: "Urgent",
    description: "Providing shelter and education to 45 children affected by poverty and abandonment.",
    raised: 8250,
    goal: 15000
  },
  {
    id: 2,
    name: "Bright Futures Home",
    image: "/images/orphanage2.jpg",
    need: "Food & Nutrition",
    urgency: "High",
    description: "Supporting 60 children with balanced meals and nutrition programs.",
    raised: 5600,
    goal: 10000
  },
  {
    id: 3,
    name: "Joy Children's Centre",
    image: "/images/orphanage3.jpg",
    need: "Medical Supplies",
    urgency: "Urgent",
    description: "Providing essential medical care and vaccinations to 30 children.",
    raised: 3000,
    goal: 7500
  },
  {
    id: 4,
    name: "Sunrise Orphanage",
    image: "/images/orphanage4.jpg",
    need: "School Fees",
    urgency: "Moderate",
    description: "Helping 50 children stay in school through education sponsorships.",
    raised: 4200,
    goal: 10000
  }
];

const SplashOrphanages = () => {
  return (
    <section id="orphanages" className="orphanages-section">
      <h2>Featured Orphanages</h2>
      <div className="orphanage-cards">
        {orphanages.map((orphanage) => {
          const progress = Math.min((orphanage.raised / orphanage.goal) * 100, 100);

          return (
            <div key={orphanage.id} className="orphanage-card">
              <img src={orphanage.image} alt={orphanage.name} />
              <h3>{orphanage.name}</h3>
              <p><strong>Current Need:</strong> {orphanage.need} <span className="urgency">({orphanage.urgency})</span></p>
              <p>{orphanage.description}</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="funds">
                Raised: ${orphanage.raised.toLocaleString()} / Goal: ${orphanage.goal.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SplashOrphanages;
