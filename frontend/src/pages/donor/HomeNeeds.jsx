import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import NeedCard from "./NeedCard";

const HomeNeeds = () => {
  const { homeId } = useParams();
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/homes/${homeId}/needs`);
        const data = await response.json();
        setNeeds(data);
      } catch (error) {
        setError("Failed to fetch needs");
      } finally {
        setLoading(false);
      }
    };

    fetchNeeds();
  }, [homeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="needs-list">
      <h2>Current Needs in this Home</h2>
      <div className="needs-grid">
        {needs.map((need) => (
          <NeedCard key={need.id} need={need} />
        ))}
      </div>
    </div>
  );
};

export default HomeNeeds;
