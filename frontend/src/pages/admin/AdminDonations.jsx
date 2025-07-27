import React, { useEffect, useState } from "react";
import { getDonations } from "../../utils/api"; // adjust path if needed

const AdminDonations = ({ onDonationTotalChange }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [donorNames, setDonorNames] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getDonations(); // optionally pass token
        setDonations(data);

        // Calculate total amount
        const total = data.reduce(
          (sum, donation) => sum + (donation.amount || 0),
          0
        );
        setTotalAmount(total);

        // Get unique donor names
        const names = [
          ...new Set(
            data.map((donation) => donation.donor?.name).filter(Boolean)
          ),
        ];
        setDonorNames(names);
      } catch (err) {
        setError(err.message || "Failed to fetch donations");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);
  useEffect(() => {
    if (onDonationTotalChange) {
      onDonationTotalChange(totalAmount);
    }
  }, [totalAmount, onDonationTotalChange]);

  return (
    <div>
      <h3>💰 View Donations</h3>

      {loading && <p>Loading donations...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Total Donations:</strong> KES {totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Donors:</strong>{" "}
              {donorNames.join(", ") || "No donors yet"}
            </p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount (KES)</th>
                <th>Date</th>
                <th>Home</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.donor?.name || "Unknown"}</td>
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

export default AdminDonations;
