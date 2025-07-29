import React from "react";

const DonationCard = ({ donation }) => (
  <div className="donation-card">
    <div>
      <strong>Date:</strong>{" "}
      {new Date(donation.created_at).toLocaleDateString()}
    </div>
    <div>
      <strong>Amount:</strong> {donation.currency} {donation.amount}
    </div>
    <div>
      <strong>Home:</strong> {donation.home?.name || "General Donation"}
    </div>
    <div>
      <strong>Type:</strong> {donation.donation_type}
    </div>
    <div>
      <strong>Status:</strong> {donation.status}
    </div>
    <div>
      <strong>Receipt:</strong> {donation.receipt_number || "N/A"}
    </div>
  </div>
);

export default DonationCard;
