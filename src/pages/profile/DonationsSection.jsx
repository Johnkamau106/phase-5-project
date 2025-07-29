import React, { useEffect, useState } from "react";
import { getDonations } from "../../utils/api";

const DonationsSection = ({ user }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDonations({}, user?.token)
      .then(data => {
        setDonations(data.filter(donation => donation.donor?.id === user.id));
        setLoading(false);
      })
      .catch(() => setDonations([]));
  }, [user]);

  if (loading) return <div>Loading donations...</div>;
  if (donations.length === 0) return <div className="empty-state"><p>No donations made yet.</p></div>;

  return (
    <div>
      <h3>Donations History</h3>
      <table>
        <thead>
          <tr>
            <th>Amount (KES)</th>
            <th>Date</th>
            <th>Home</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(donation => (
            <tr key={donation.id}>
              <td>{donation.amount}</td>
              <td>{new Date(donation.created_at).toLocaleDateString()}</td>
              <td>{donation.home?.name || "—"}</td>
              <td>{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationsSection;
