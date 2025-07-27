import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HomeDetail.css";
import { BASE_URL } from "../../utils/api";
import Donations from "../donor/Donations"; // Reusable donation component
import { getUserFromLocalStorage } from "../../utils/auth"; // To get logged-in user

const donationOutlines = [
  {
    title: "Nutritional Meals 🍲",
    description:
      "KES 2,000 provides a meal for a child. Your donation promotes healthy growth.",
  },
  {
    title: "Education 📚",
    description:
      "KES 5,000 supports books and tuition. Help shape a child's future.",
  },
  {
    title: "Safe Shelter 🏠",
    description: "KES 10,000 provides a week of safe shelter and care.",
  },
  {
    title: "Healthcare 💉",
    description: "KES 3,000 ensures medical checkups and emergency care.",
  },
  {
    title: "Clothing 👕",
    description: "KES 1,500 buys clean, warm clothing for a child.",
  },
  {
    title: "Vocational Training 🛠️",
    description: "KES 7,500 funds skills training for self-sufficiency.",
  },
];

const HomeDetail = () => {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [visitDate, setVisitDate] = useState(null);
  const [error, setError] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const user = getUserFromLocalStorage();

  useEffect(() => {
    fetch(`${BASE_URL}/api/homes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch home details");
        return res.json();
      })
      .then((data) => {
        setHome(data);
        setError(false);
      })
      .catch(() => setError(true));
  }, [id]);

  if (error)
    return <div>Error loading home details. Please try again later.</div>;
  if (!home) return <div>Loading...</div>;

  // Parse needs if present
  let needsList = [];
  if (Array.isArray(home.needs)) {
    needsList = home.needs.filter(Boolean);
  } else if (typeof home.needs === "string") {
    needsList = home.needs
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
  }
  return (
    <div className="home-detail-container">
      {/* Banner */}
      {home.banner && (
        <div className="home-banner">
          <img
            src={home.banner}
            alt={`${home.name} banner`}
            className="banner-img"
          />
        </div>
      )}

      {/* Avatar + Basic Info */}
      <div className="home-header">
        <img
          src={home.logo || home.avatar}
          alt={`${home.name} logo`}
          className="avatar-img"
        />
        <div className="home-meta">
          <h2>{home.name}</h2>
          <p>
            <strong>Location:</strong> {home.location}
          </p>
          {home.address && (
            <p>
              <strong>Address:</strong> {home.address}
            </p>
          )}
          {home.phone && (
            <p>
              <strong>Phone:</strong> {home.phone}
            </p>
          )}
          {home.email && (
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${home.email}`}>{home.email}</a>
            </p>
          )}
          {home.website && (
            <p>
              <strong>Website:</strong>{" "}
              <a href={home.website} target="_blank" rel="noopener noreferrer">
                {home.website}
              </a>
            </p>
          )}
          {home.capacity !== undefined && (
            <p>
              <strong>Capacity:</strong> {home.capacity}
            </p>
          )}
          <p>
            <strong>Children:</strong> {home.current_children ?? 0}
          </p>
          <p>
            <strong>Description:</strong> {home.description}
          </p>
          {needsList.length > 0 && (
            <div>
              <strong>Needs:</strong>
              <ul>
                {needsList.map((need, idx) => (
                  <li key={idx}>{need}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bank Details */}
      {(home.bank_name ||
        home.account_name ||
        home.account_number ||
        home.branch) && (
        <div className="bank-details">
          <h4>Bank Details for Donations</h4>
          <ul>
            {home.bank_name && (
              <li>
                <strong>Bank Name:</strong> {home.bank_name}
              </li>
            )}
            {home.account_name && (
              <li>
                <strong>Account Name:</strong> {home.account_name}
              </li>
            )}
            {home.account_number && (
              <li>
                <strong>Account Number:</strong> {home.account_number}
              </li>
            )}
            {home.branch && (
              <li>
                <strong>Branch:</strong> {home.branch}
              </li>
            )}
          </ul>
        </div>
      )}

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
      {user && (
        <section className="donation-trigger-section">
          <h3 className="section-title">Make a Difference</h3>
          <p className="subtitle">
            Your contribution can change a child's life. Click below to see how
            you can help.
          </p>
          <button
            className="donate-now-button"
            onClick={() => setIsDonationModalOpen(true)}
          >
            Make a Donation
          </button>
        </section>
      )}

      {isDonationModalOpen && (
        <div
          className="donation-modal"
          onClick={() => setIsDonationModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Donations
              donationOutlines={donationOutlines}
              home={home}
              user={user}
              onDonationSuccess={() => {
                alert("Thank you for your generous donation!");
                setIsDonationModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeDetail;
