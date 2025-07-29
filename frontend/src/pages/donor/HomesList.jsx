import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import "./HomesList.css";

const HomesList = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  // Filter homes by search query (name or location)
  const filteredHomes = homes.filter(
    (home) =>
      home.name.toLowerCase().includes(search.toLowerCase()) ||
      home.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="homes-list">
      <h2>Orphanage Homes</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, width: 250, marginRight: 8 }}
        />
        <button onClick={() => {}} style={{ padding: 8 }}>Search</button>
      </div>
      <div className="homes-grid">
        {filteredHomes.length === 0 ? (
          <div>No homes found.</div>
        ) : (
          filteredHomes.map((home) => (
            <div key={home.id} className="home-card">
              <img src={home.image_url} alt={home.name} />
              <h3>{home.name}</h3>
              <p>{home.location}</p>
              <Link to={`/donor/homes/${home.id}/children`}>View Children</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomesList;
