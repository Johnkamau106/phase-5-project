import React from "react";

const DonationCard = ({ donation }) => (
  <div className="donation-card">
    <div>
      <strong>Date:</strong> {donation.date}
    </div>
    <div>
      <strong>Amount:</strong> KES {donation.amount}
    </div>
    <div>
      <strong>Home:</strong> {donation.home}
    </div>
    <div>
      <strong>Type:</strong> {donation.type}
    </div>
    <div>
      <strong>Status:</strong> {donation.status}
    </div>
    <div>
      <strong>Receipt:</strong> {donation.receipt}
    </div>
  </div>
);

export default DonationCard;