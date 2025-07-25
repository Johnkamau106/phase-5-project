import React, { useState, useEffect } from 'react';
import './SplashOrphanages.css';
import { BASE_URL } from '../utils/api';

const SplashOrphanages = () => {
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrphanages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/homes`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrphanages(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrphanages();
  }, []);

  if (loading) {
    return <section id="orphanages" className="orphanages-section">Loading orphanages...</section>;
  }

  if (error) {
    return <section id="orphanages" className="orphanages-section">Error: {error.message}</section>;
  }

  return (
    <section id="orphanages" className="orphanages-section">
      <h2>Featured Orphanages</h2>
      <div className="orphanage-cards">
        {orphanages.length === 0 ? (
          <p>No orphanages found.</p>
        ) : (
          orphanages.map((orphanage) => {
            const progress = Math.min((orphanage.amount_contributed / orphanage.target_amount) * 100, 100);

            return (
              <div key={orphanage.id} className="orphanage-card">
                <img src={orphanage.image} alt={orphanage.name} />
                <h3>{orphanage.name}</h3>
                <p><strong>Location:</strong> {orphanage.location}</p>
                <p><strong>Current Need:</strong> {orphanage.current_need}</p>
                <p>{orphanage.description}</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="funds">
                  Raised: ${orphanage.amount_contributed.toLocaleString()} / Goal: ${orphanage.target_amount.toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default SplashOrphanages;
