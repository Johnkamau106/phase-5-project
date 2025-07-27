// src/pages/donor/DonorDonations.jsx
import React, { useEffect, useState } from "react";
import { getDonations } from "../../utils/api"; // adjust path if needed

const DonorDonations = ({ user }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const allDonations = await getDonations(); // GET /donations
        const donorDonations = allDonations.filter(
          (donation) => donation.donor?.id === user.id
        );

        setDonations(donorDonations);

        const total = donorDonations.reduce(
          (sum, donation) => sum + (donation.amount || 0),
          0
        );
        setTotalAmount(total);
      } catch (err) {
        setError(err.message || "Failed to fetch donations");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchDonations();
  }, [user]);

  return (
    <div>
      <h3>📦 My Donation History</h3>
      {loading && <p>Loading donations...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && donations.length === 0 && (
        <p>You haven’t made any donations yet.</p>
      )}

      {!loading && donations.length > 0 && (
        <>
          <p>
            <strong>Total Donated:</strong> KES {totalAmount.toFixed(2)}
          </p>
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
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.amount}</td>
                  <td>{new Date(donation.created_at).toLocaleDateString()}</td>
                  <td>{donation.home?.name || "—"}</td>
                  <td>{donation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DonorDonations;
