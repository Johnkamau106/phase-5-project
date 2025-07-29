import React, { useEffect, useState } from "react";
import ChildrenList from "../caregiver/ChildrenList";
import { BASE_URL } from "../../utils/api";

const SponsoredChildrenSection = ({ user }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/children`)
      .then(res => res.json())
      .then(data => {
        if (user && user.sponsoredChildrenIds) {
          setChildren(data.filter(child => user.sponsoredChildrenIds.includes(child.id)));
        } else {
          setChildren([]);
        }
        setLoading(false);
      })
      .catch(() => setChildren([]));
  }, [user]);

  if (loading) return <div>Loading sponsored children...</div>;
  if (children.length === 0) return <div className="empty-state"><p>No children sponsored yet.</p></div>;

  return <ChildrenList readOnly={true} children={children} />;
};

export default SponsoredChildrenSection;
