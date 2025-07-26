import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DonorDashboard.css";
import DonationCard from "./DonationCard";
import Donations from "./Donations";
import ChildCard from "./ChildCard";
import ChildrenList from "../caregiver/ChildrenList"; // Adjust path if needed
import HomeCard from "./HomeCard";
import { getDonations, createDonation } from "../../utils/api";
import DonorDashboardSummary from "./DashboardSummary";

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

// Placeholder home object for Donations
const home = {
  id: 1,
  name: "Hope Center",
  location: "Nairobi",
};

const DonorDashboard = ({ user }) => {
  const [activeSection, setActiveSection] = useState("donations");
  const [expandedDonations, setExpandedDonations] = useState(true);
  const [expandedSponsorships, setExpandedSponsorships] = useState(false);
  const [expandedVolunteer, setExpandedVolunteer] = useState(false);
  const [expandedSummary, setExpandedSummary] = useState(true); // new
  const [expandedChildren, setExpandedChildren] = useState(false); // new

  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleSection = (section) => {
    setExpandedSummary(section === "summary");
    setExpandedDonations(section === "donations");
    setExpandedSponsorships(section === "sponsorships");
    setExpandedVolunteer(section === "volunteer");
    setExpandedChildren(section === "children");
    setActiveSection(section);
  };

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getDonations({ donor_id: user.id }, user.token)
      .then((data) => setDonationHistory(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const sponsoredChildren = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 8,
      home: "Hope Center",
      image: "https://via.placeholder.com/150?text=Sarah",
      startDate: "2025-01-15",
      progress: "Good",
      nextReport: "2025-08-15",
    },
    {
      id: 2,
      name: "Michael Kiprop",
      age: 10,
      home: "Bright Future",
      image: "https://via.placeholder.com/150?text=Michael",
      startDate: "2024-11-10",
      progress: "Excellent",
      nextReport: "2025-08-10",
    },
  ];

  const volunteerOpportunities = [
    {
      id: 1,
      title: "Reading Buddy Program",
      home: "Hope Center",
      date: "2025-08-15",
      duration: "2 hours",
      skills: "Teaching, Patience",
    },
    {
      id: 2,
      title: "Home Maintenance Day",
      home: "Bright Future",
      date: "2025-08-20",
      duration: "Full day",
      skills: "Handyman, Painting",
    },
  ];

  return (
    <div className="donor-dashboard">
      <header className="donor-header">
        <div className="header-content">
          <h2>🎁 Welcome, {user?.username}</h2>
          <p className="welcome-message">
            Your generosity is changing lives every day ❤️
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">KES 8,000</span>
            <span className="stat-label">Total Donated</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">2</span>
            <span className="stat-label">Sponsored Children</span>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={activeSection === "summary" ? "active" : ""}
          onClick={() => toggleSection("summary")}
        >
          <i className="fas fa-chart-bar"></i> Dashboard
        </button>
        <button
          className={activeSection === "donations" ? "active" : ""}
          onClick={() => toggleSection("donations")}
        >
          <i className="fas fa-donate"></i> My Donations
        </button>
        <button
          className={activeSection === "sponsorships" ? "active" : ""}
          onClick={() => toggleSection("sponsorships")}
        >
          <i className="fas fa-child"></i> Sponsorships
        </button>
        <button
          className={activeSection === "children" ? "active" : ""}
          onClick={() => toggleSection("children")}
        >
          <i className="fas fa-users"></i> Children
        </button>
        <button
          className={activeSection === "volunteer" ? "active" : ""}
          onClick={() => toggleSection("volunteer")}
        >
          <i className="fas fa-hands-helping"></i> Volunteer
        </button>
      </nav>

      <main className="dashboard-content">
        <>
          {expandedSummary && (
            <section className="summary-section">
              <DonorDashboardSummary
                totalDonated={8000}
                sponsoredChildrenCount={2}
                supportedHomes={2}
                upcomingVisits={1}
              />
            </section>
          )}
          {/* Donations Section */}
          {expandedDonations && (
            <section className="donation-section">
              <div className="section-header">
                <h3>
                  <i className="fas fa-donate"></i> My Donation History
                </h3>
                <Donations donationOutlines={donationOutlines} home={home} />
              </div>
              {loading ? (
                <div>Loading donations...</div>
              ) : error ? (
                <div style={{ color: "red" }}>{error}</div>
              ) : (
                <div className="donation-list">
                  {donationHistory.length === 0 ? (
                    <div>No donations yet.</div>
                  ) : (
                    donationHistory.map((donation) => (
                      <DonationCard key={donation.id} donation={donation} />
                    ))
                  )}
                </div>
              )}
              <div className="summary-card">
                <h4>Impact</h4>
                <p className="impact">Supported 2 homes</p>
              </div>
              <div className="summary-card">
                <h4>Tax Documents</h4>
                <button className="btn-secondary">
                  <i className="fas fa-file-download"></i> Download
                </button>
              </div>
            </section>
          )}

          {/* Sponsorships Section */}
          {expandedSponsorships && (
            <section className="sponsorship-section">
              <div className="section-header">
                <h3>
                  <i className="fas fa-child"></i> My Sponsored Children
                </h3>
                <Link to="/sponsor" className="btn-primary">
                  <i className="fas fa-plus"></i> Sponsor New Child
                </Link>
              </div>

              <div className="children-grid">
                {sponsoredChildren.map((child) => (
                  <ChildCard key={child.id} child={child} />
                ))}
              </div>

              <div className="sponsorship-actions">
                <button className="btn-secondary">
                  <i className="fas fa-envelope"></i> Write to Child
                </button>
                <button className="btn-secondary">
                  <i className="fas fa-gift"></i> Send Gift
                </button>
                <button className="btn-secondary">
                  <i className="fas fa-calendar"></i> Schedule Visit
                </button>
              </div>
            </section>
          )}
          {expandedChildren && (
            <section className="children-section">
              <div className="section-header">
                <h3>
                  <i className="fas fa-users"></i> Children Overview
                </h3>
                <p className="subtext">
                  View children currently in care. Sponsorship info may be
                  limited to your supported homes.
                </p>
              </div>
              <ChildrenList readOnly={true} />
            </section>
          )}

          {/* Volunteer Section */}
          {expandedVolunteer && (
            <section className="volunteer-section">
              <div className="section-header">
                <h3>
                  <i className="fas fa-hands-helping"></i> Volunteer
                  Opportunities
                </h3>
              </div>

              <div className="opportunities-list">
                {volunteerOpportunities.map((opp) => (
                  <div key={opp.id} className="opportunity-card">
                    <div className="opportunity-info">
                      <h4>{opp.title}</h4>
                      <p>
                        <i className="fas fa-home"></i> {opp.home}
                      </p>
                      <p>
                        <i className="fas fa-calendar-day"></i> {opp.date}
                      </p>
                      <p>
                        <i className="fas fa-clock"></i> {opp.duration}
                      </p>
                      <p>
                        <i className="fas fa-tools"></i> Skills: {opp.skills}
                      </p>
                    </div>
                    <button className="btn-primary">
                      <i className="fas fa-sign-in-alt"></i> Sign Up
                    </button>
                  </div>
                ))}
              </div>

              <div className="visit-form">
                <h4>
                  <i className="fas fa-calendar-check"></i> Schedule a Visit
                </h4>
                <form>
                  <div className="form-group">
                    <label>Select Home:</label>
                    <select>
                      <option>Hope Center</option>
                      <option>Bright Future</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Visit Date:</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Visit Purpose:</label>
                    <textarea placeholder="Describe the purpose of your visit"></textarea>
                  </div>
                  <button type="submit" className="btn-primary">
                    <i className="fas fa-paper-plane"></i> Submit Request
                  </button>
                </form>
              </div>
            </section>
          )}
        </>
      </main>
    </div>
  );
};

export default DonorDashboard;
