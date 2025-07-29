import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import "./HomesList.css";

const HomesList = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/homes`);
        if (!response.ok) {
          throw new Error("Failed to fetch homes");
        }
        const data = await response.json();
        setHomes(data);
      } catch (error) {
        setError("Failed to fetch homes");
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homes-list">
      <h2>Orphanage Homes</h2>
      <div className="homes-grid">
        {homes.map((home) => (
          <div key={home.id} className="home-card">
            <img src={home.image_url} alt={home.name} />
            <h3>{home.name}</h3>
            <p>{home.location}</p>
            <Link to={`/donor/homes/${home.id}/children`}>View Children</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomesList;
