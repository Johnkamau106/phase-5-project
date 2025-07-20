import React from 'react';
import './DonorDashboard.css';
import HomeCard from './HomeCard';

const DonorDashboard = ({ user }) => {
  const donationHistory = [
    { id: 1, date: '2025-07-05', amount: 5000, home: 'Hope Center' },
    { id: 2, date: '2025-06-22', amount: 3000, home: 'Bright Future' },
  ];

  const supportedHomes = [
    {
      id: 1,
      name: 'Hope Center',
      location: 'Kibera, Nairobi',
      image: 'https://via.placeholder.com/300x150?text=Hope+Center',
      description: 'A home for 30+ vulnerable children focusing on health and education.'
    },
    {
      id: 2,
      name: 'Bright Future',
      location: 'Thika, Kiambu',
      image: 'https://via.placeholder.com/300x150?text=Bright+Future',
      description: 'Shelter and education for abandoned children ages 2–15.'
    }
  ];

  return (
    <div className="donor-dashboard">
      <header className="donor-header">
        <h2>🎁 Welcome, {user?.username}!</h2>
        <p>Thank you for making a difference ❤️</p>
      </header>

      <section className="donation-history">
        <h3>📜 Donation History</h3>
        <ul>
          {donationHistory.map(donation => (
            <li key={donation.id}>
              {donation.date} – KES {donation.amount.toLocaleString()} to <strong>{donation.home}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="supported-homes">
        <h3>🏠 Supported Homes</h3>
        <div className="homes-grid">
          {supportedHomes.map(home => (
            <HomeCard key={home.id} home={home} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DonorDashboard;
