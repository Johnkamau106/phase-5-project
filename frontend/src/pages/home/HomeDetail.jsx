import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HomeDetail.css"; // Your CSS file

const donationOutlines = [
  {
    title: "Nutritional Meals 🍲",
    description: "$20 provides a meal for a child. Your donation promotes healthy growth.",
  },
  {
    title: "Education 📚",
    description: "$50 supports books and tuition. Help shape a child's future.",
  },
  {
    title: "Safe Shelter 🏠",
    description: "$100 provides a week of safe shelter and care.",
  },
  {
    title: "Healthcare 💉",
    description: "$30 ensures medical checkups and emergency care.",
  },
  {
    title: "Clothing 👕",
    description: "$25 buys clean, warm clothing for a child.",
  },
  {
    title: "Vocational Training 🛠️",
    description: "$75 funds skills training for self-sufficiency.",
  },
];

const dummyHomes = {
  1: {
    name: "Sunshine Children's Haven",
    location: "Nairobi, Kenya",
    description: "Spreading love & education since 2010",
    children: 45,
    avatar: "/images/sunshine-avatar.jpg",
    banner: "/images/sunshine-banner.jpg",
  },
  2: {
    name: "Little Angels Home",
    location: "Lagos, Nigeria",
    description: "A safe and nurturing environment for every child",
    children: 28,
    avatar: "/images/angels-avatar.jpg",
    banner: "/images/angels-banner.jpg",
  },
  3: {
    name: "Hope & Dreams Sanctuary",
    location: "Cape Town, South Africa",
    description: "Empowering children through education and support",
    children: 62,
    avatar: "/images/hope-avatar.jpg",
    banner: "/images/hope-banner.jpg",
  },
};

const HomeDetail = () => {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [visitDate, setVisitDate] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setHome(dummyHomes[id]);
  }, [id]);

  if (!home) return <div>Loading...</div>;

  return (
    <div className="home-detail-container">
      {/* Banner */}
      <div className="home-banner">
        <img src={home.banner} alt={`${home.name} banner`} className="banner-img" />
      </div>

      {/* Avatar + Basic Info */}
      <div className="home-header">
        <img src={home.avatar} alt={`${home.name} avatar`} className="avatar-img" />
        <div className="home-meta">
          <h2>{home.name}</h2>
          <p><strong>Location:</strong> {home.location}</p>
          <p><strong>Children:</strong> {home.children}</p>
          <p><strong>Description:</strong> {home.description}</p>
        </div>
      </div>

      {/* Visit Section */}
      <section className="visit-support-section">
        <h3 className="section-title">Visit & Support This Home</h3>
        <div className="visit-support-grid">
          <div className="visit-item">
            <CalendarDays className="visit-icon" />
            <div className="visit-content">
              <h4>Choose Your Visit Date</h4>
              <DatePicker
                selected={visitDate}
                onChange={(date) => setVisitDate(date)}
                minDate={new Date()}
                placeholderText="Click to select a day"
                className="date-picker-input"
              />
              {visitDate && (
                <p className="visit-confirmation">
                  You selected: <strong>{visitDate.toDateString()}</strong>
                </p>
              )}
            </div>
          </div>

          <div className="visit-item">
            <MapPin className="visit-icon" />
            <div className="visit-content">
              <h4>Location</h4>
              <p>{home.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="donations">
        <h3 className="section-title">How Your Donation Helps</h3>
        <p className="subtitle">Every contribution makes a real difference in a child’s life.</p>
        <ul className="donation-list">
          {donationOutlines.map((item, index) => (
            <li key={index} className="donation-item">
              <button className="donation-button" onClick={() => setActiveIndex(index)}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>

        {activeIndex !== null && (
          <div className="donation-modal">
            <div className="modal-content">
              <h4>{donationOutlines[activeIndex].title}</h4>
              <p>{donationOutlines[activeIndex].description}</p>

              <div className="donation-form">
                <h5>Make a Donation</h5>
                <p><strong>{home.name}</strong></p>
                <p>{home.location}</p>

                <label>Donation Amount ($)</label>
                <input type="number" placeholder="Enter amount" />

                <label>Payment Method</label>
                <select>
                  <option>Credit/Debit Card</option>
                  <option>PayPal</option>
                  <option>Bank Transfer</option>
                </select>

                <div className="checkbox">
                  <input type="checkbox" id="recurring" />
                  <label htmlFor="recurring">Make this a monthly recurring donation</label>
                </div>

                <button className="donate-btn">Donate Now</button>
                <button className="close-btn" onClick={() => setActiveIndex(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeDetail;
