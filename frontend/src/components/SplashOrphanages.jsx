import React, { useEffect, useState } from 'react';
            import { useNavigate } from 'react-router-dom';
            import './SplashOrphanages.css';
            import { BASE_URL } from '../utils/api';

            const SplashOrphanages = () => {
              const [orphanages, setOrphanages] = useState([]);
              const [loading, setLoading] = useState(true);
              const navigate = useNavigate();

              useEffect(() => {
                fetch(`${BASE_URL}/api/homes`)
                  .then(res => res.json())
                  .then(data => {
                    setOrphanages(data);
                    setLoading(false);
                  })
                  .catch(() => setLoading(false));
              }, []);

              const handleCardClick = (id) => {
                const token = localStorage.getItem('token');
                if (!token) {
                  navigate('/login'); // or '/register'
                } else {
                  navigate(`/home/${id}`);
                }
              };

              if (loading) return <div>Loading orphanages...</div>;

              return (
                <section id="orphanages" className="orphanages-section">
                  <h2>Featured Orphanages</h2>
                  <div className="orphanage-cards">
                    {orphanages.map((orphanage) => {
                      const raised = Number(orphanage.raised || 0);
                      const goal = Number(orphanage.goal || 0);
                      const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

                      return (
                        <div
                          key={orphanage.id}
                          className="orphanage-card"
                          onClick={() => handleCardClick(orphanage.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <img src={orphanage.image} alt={orphanage.name} />
                          <h3>{orphanage.name}</h3>
                          <p>
                            <strong>Current Need:</strong> {orphanage.need}{' '}
                            <span className="urgency">({orphanage.urgency})</span>
                          </p>
                          <p>{orphanage.description}</p>
                          <div className="progress-bar">
                            <div className="progress" style={{ width: `${progress}%` }}></div>
                          </div>
                          <p className="funds">
                            Raised: ${raised.toLocaleString()} / Goal: ${goal.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            };

            export default SplashOrphanages;