import React, { useState } from "react";
import "./Donations.css";
import { createDonation } from "../../utils/api";


const Donations = ({ donationOutlines, home, user, onDonationSuccess }) => {
const [activeIndex, setActiveIndex] = useState(null);
const [amount, setAmount] = useState("");
const [paymentMethod, setPaymentMethod] = useState("mpesa");
const [recurring, setRecurring] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const closeModal = () => {
  setActiveIndex(null);
  setAmount("");
  setPaymentMethod("mpesa");
  setRecurring(false);
  setError("");
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    await createDonation(
      {
        amount: parseFloat(amount),
        payment_method: paymentMethod,
        donor_id: user.id,
        donation_type: recurring ? "monthly" : "one-time",
        home_id: home.id,
      },
      user.token
    );
    closeModal();
    if (onDonationSuccess) {
      onDonationSuccess(amount);
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

return (
  <section className="donations">
    <form className="donation-form" onSubmit={handleSubmit}>
      <h5>Make a Donation</h5>
      <p>
        <strong>{home.name}</strong>
      </p>
      <p>{home.location}</p>

      <label>Donation Amount (KES)</label>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        min="1"
        placeholder="Enter amount"
      />

      <label>Payment Method</label>
      <select
        value={paymentMethod}
        onChange={e => setPaymentMethod(e.target.value)}
      >
        <option value="mpesa">M-Pesa</option>
        <option value="card">Card</option>
        <option value="bank">Bank</option>
      </select>

      <div className="checkbox">
        <input
          type="checkbox"
          id="recurring"
          checked={recurring}
          onChange={e => setRecurring(e.target.checked)}
        />
        <label htmlFor="recurring">
          Make this a monthly recurring donation
        </label>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
      <button className="donate-btn" type="submit" disabled={loading}>
        {loading ? "Processing..." : "Donate Now"}
      </button>
    </form>
  </section>
);
};

export default Donations;