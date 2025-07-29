import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DonorDashboard.css";
import DonationCard from "./DonationCard";
import Donations from "./Donations";
import DonorDonations from "./DonorDonations";
import ChildrenList from "../caregiver/ChildrenList";
import HomeCard from "./HomeCard";
import { getDonations, createDonation, BASE_URL } from "../../utils/api";
import DonorDashboardSummary from "./DashboardSummary";
import HomesList from "./HomesList";

const DonorDashboard = ({ user }) => {
  const [activeSection, setActiveSection] = useState("summary");
  const [expandedSummary, setExpandedSummary] = useState(true);
  const [expandedDonations, setExpandedDonations] = useState(false);
  const [expandedSponsorships, setExpandedSponsorships] = useState(false);
  const [expandedChildren, setExpandedChildren] = useState(false);
  const [expandedVolunteer, setExpandedVolunteer] = useState(false);
  const [expandedHomes, setExpandedHomes] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [showSponsorTable, setShowSponsorTable] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedHome, setSelectedHome] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [donationOutlines, setDonationOutlines] = useState([]);
  const [sponsorError, setSponsorError] = useState("");
  const [sponsorLoading, setSponsorLoading] = useState(false);
  const [allChildren, setAllChildren] = useState([]);
  const [donations, setDonations] = useState([]);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [donationsError, setDonationsError] = useState("");

  const refreshDonations = async () => {
    setDonationsLoading(true);
    setDonationsError("");
    try {
      const allDonations = await getDonations({}, user?.token);
      const donorDonations = allDonations.filter(
        (donation) => donation.donor?.id === user.id
      );
      setDonations(donorDonations);
    } catch (err) {
      setDonationsError(err.message || "Failed to fetch donations");
    } finally {
      setDonationsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) refreshDonations();
  }, [user]);

  // Real data
  const totalDonated = 50000;
  const [sponsoredChildren, setSponsoredChildren] = useState([]);
  const [homes, setHomes] = useState([]);
  const volunteerOpportunities = [
    { id: 1, title: "Help at Home A", home: "Home A", date: "2023-10-10", duration: "2 hours", skills: "Caring, Cooking" },
    { id: 2, title: "Teach at Home B", home: "Home B", date: "2023-10-12", duration: "3 hours", skills: "Teaching, Patience" },
  ];

  useEffect(() => {
    fetch(`${BASE_URL}/api/homes`)
      .then((res) => res.json())
      .then((data) => setHomes(data))
      .catch(() => setHomes([]));
  }, []);

  useEffect(() => {
    // Fetch all children from backend
    fetch(`${BASE_URL}/api/children`)
      .then((res) => res.json())
      .then((data) => {
        setAllChildren(data);
        // Filter sponsored children for this user
        if (user && user.sponsoredChildrenIds) {
          setSponsoredChildren(data.filter(child => user.sponsoredChildrenIds.includes(child.id)));
        } else {
          setSponsoredChildren([]);
        }
      })
      .catch(() => {
        setAllChildren([]);
        setSponsoredChildren([]);
      });
  }, [user]);

  const toggleSection = (section) => {
    setActiveSection(section);
    switch (section) {
      case "summary":
        setExpandedSummary(true);
        setExpandedDonations(false);
        setExpandedSponsorships(false);
        setExpandedChildren(false);
        setExpandedVolunteer(false);
        setExpandedHomes(false);
        break;
      case "donations":
        setExpandedSummary(false);
        setExpandedDonations(true);
        setExpandedSponsorships(false);
        setExpandedChildren(false);
        setExpandedVolunteer(false);
        setExpandedHomes(false);
        break;
      case "sponsorships":
        setExpandedSummary(false);
        setExpandedDonations(false);
        setExpandedSponsorships(true);
        setExpandedChildren(false);
        setExpandedVolunteer(false);
        setExpandedHomes(false);
        break;
      case "children":
        setExpandedSummary(false);
        setExpandedDonations(false);
        setExpandedSponsorships(false);
        setExpandedChildren(true);
        setExpandedVolunteer(false);
        setExpandedHomes(false);
        break;
      case "volunteer":
        setExpandedSummary(false);
        setExpandedDonations(false);
        setExpandedSponsorships(false);
        setExpandedChildren(false);
        setExpandedVolunteer(true);
        setExpandedHomes(false);
        break;
      case "homes":
        setExpandedSummary(false);
        setExpandedDonations(false);
        setExpandedSponsorships(false);
        setExpandedChildren(false);
        setExpandedVolunteer(false);
        setExpandedHomes(true);
        break;
      default:
        break;
    }
  };

  const handleSponsor = async (childId) => {
    setSponsorLoading(true);
    setSponsorError("");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Add child to sponsoredChildren
      const sponsored = allChildren.find(child => child.id === childId);
      if (sponsored) {
        setSponsoredChildren(prev => [...prev, sponsored]);
      }
      alert(`Successfully sponsored child with ID: ${childId}`);
      setShowSponsorTable(false);
    } catch (error) {
      setSponsorError("Failed to sponsor child. Please try again.");
    } finally {
      setSponsorLoading(false);
    }
  };

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
            <span className="stat-value">KES {totalDonated.toLocaleString()}</span>
            <span className="stat-label">Total Donated</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{sponsoredChildren.length}</span>
            <span className="stat-label">Sponsored Children</span>
          </div>
        </div>
      </header>
      <nav className="dashboard-nav">
        <button className={activeSection === "summary" ? "active" : ""} onClick={() => toggleSection("summary")}>
          <i className="fas fa-chart-bar"></i> Dashboard
        </button>
        <button className={activeSection === "donations" ? "active" : ""} onClick={() => toggleSection("donations")}>
          <i className="fas fa-donate"></i> My Donations
        </button>
        <button className={activeSection === "sponsorships" ? "active" : ""} onClick={() => toggleSection("sponsorships")}>
          <i className="fas fa-child"></i> Sponsorships
        </button>
        <button className={activeSection === "children" ? "active" : ""} onClick={() => toggleSection("children")}>
          <i className="fas fa-users"></i> Children
        </button>
        <button className={activeSection === "volunteer" ? "active" : ""} onClick={() => toggleSection("volunteer")}>
          <i className="fas fa-hands-helping"></i> Volunteer
        </button>
        <button className={activeSection === "homes" ? "active" : ""} onClick={() => toggleSection("homes")}>
          <i className="fas fa-home"></i> Homes
        </button>
      </nav>
      <main className="dashboard-content">
        {expandedSummary && (
          <section className="summary-section">
            <DonorDashboardSummary totalDonations={totalDonated} sponsoredChildren={sponsoredChildren.length} supportedHomes={homes.length} volunteerVisits={volunteerOpportunities.length} />
          </section>
        )}
        {expandedDonations && (
          <div className="section-header">
            <h3><i className="fas fa-donate"></i> My Donation History</h3>
            <DonorDonations 
              user={user} 
              donations={donations} 
              loading={donationsLoading} 
              error={donationsError} 
            />
            <button className="btn-primary" onClick={() => setIsDonationModalOpen(true)}><i className="fas fa-plus"></i> Make a Donation</button>
          </div>
        )}
        {expandedSponsorships && (
          <section className="sponsorship-section">
            <div className="section-header">
              <h3><i className="fas fa-child"></i> My Sponsored Children</h3>
              <button className="btn-primary" onClick={() => setShowSponsorTable(true)}><i className="fas fa-plus"></i> Sponsor New Child</button>
            </div>
            <div className="children-grid">
              {sponsoredChildren.length === 0 ? (
                <p>You haven't sponsored any children yet.</p>
              ) : (
                <table className="children-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Home</th>
                      <th>Status</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsoredChildren.map((child) => (
                      <tr key={child.id}>
                        <td><img src={child.photo} alt={child.fullName} style={{ width: 40, borderRadius: 8 }} /></td>
                        <td>{child.fullName}</td>
                        <td>{child.age}</td>
                        <td>{child.home?.name || "N/A"}</td>
                        <td>{child.isSponsored ? "Sponsored" : "Available"}</td>
                        <td>
                          <button className="btn-secondary" onClick={() => {
                            setSponsoredChildren(prev => prev.filter(c => c.id !== child.id));
                          }}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        )}
        {expandedChildren && (
          <section className="children-section">
            <div className="section-header">
              <h3><i className="fas fa-users"></i> Children Overview</h3>
              <p className="subtext">View children currently in care. Sponsorship info may be limited to your supported homes.</p>
            </div>
            <ChildrenList readOnly={true} />
          </section>
        )}
        {expandedVolunteer && (
          <section className="volunteer-section">
            <div className="section-header">
              <h3><i className="fas fa-hands-helping"></i> Volunteer Opportunities</h3>
            </div>
            <div className="opportunities-list">
              {volunteerOpportunities.map((opp) => (
                <div key={opp.id} className="opportunity-card">
                  <div className="opportunity-info">
                    <h4>{opp.title}</h4>
                    <p><i className="fas fa-home"></i> {opp.home}</p>
                    <p><i className="fas fa-calendar-day"></i> {opp.date}</p>
                    <p><i className="fas fa-clock"></i> {opp.duration}</p>
                    <p><i className="fas fa-tools"></i> Skills: {opp.skills}</p>
                  </div>
                  <button className="btn-primary"><i className="fas fa-sign-in-alt"></i> Sign Up</button>
                </div>
              ))}
            </div>
          </section>
        )}
        {expandedHomes && (
          <section className="homes-section">
            <HomesList />
          </section>
        )}
      </main>
      {/* Donation Modal - outside main for stacking context */}
      {isDonationModalOpen && (
        <div className="donation-modal-overlay" onClick={() => setIsDonationModalOpen(false)}>
          <div className="donation-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              {modalStep === 1 && (
                <React.Fragment>
                  <div className="form-group">
                    <label>Select a Home:</label>
                    <select value={selectedHome?.id || ""} onChange={(e) => setSelectedHome(homes.find((h) => h.id === Number(e.target.value)))}>
                      <option value="">-- Choose a Home --</option>
                      {homes.map((home) => (
                        <option key={home.id} value={home.id}>{home.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Enter Your Phone Number:</label>
                    <input type="tel" placeholder="e.g. 254712345678" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                  </div>
                  <button className="btn-primary" onClick={() => {
                    if (!selectedHome || !phoneNumber) {
                      alert("Please select a home and enter your phone number.");
                    } else {
                      setModalStep(2);
                    }
                  }}>Next</button>
                </React.Fragment>
              )}
              {modalStep === 2 && (
                <Donations 
                  donationOutlines={donationOutlines} 
                  home={selectedHome} 
                  user={user} 
                  phoneNumber={phoneNumber} 
                  onDonationSuccess={async (donatedAmount) => {
                    // Update the contributed amount for the selected home
                    setHomes(prevHomes => prevHomes.map(h =>
                      h.id === selectedHome.id
                        ? { ...h, amountContributed: (h.amountContributed || 0) + Number(donatedAmount) }
                        : h
                    ));
                    await refreshDonations();
                    alert("Thank you for your generous donation!");
                    setIsDonationModalOpen(false);
                    setModalStep(1);
                  }} 
                />
              )}
            </div>
          </div>
        </div>
      )}
      {/* Sponsor Table Modal - outside main for stacking context */}
      {showSponsorTable && (
        <div className="donation-modal-overlay" onClick={() => setShowSponsorTable(false)}>
          <div className="donation-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <h4>Sponsor a Child</h4>
              {sponsorError && <div style={{ color: 'red' }}>{sponsorError}</div>}
              <ChildrenList
                readOnly={false}
                sponsorMode={true}
                handleSponsor={handleSponsor}
                sponsorLoading={sponsorLoading}
                children={allChildren}
              />
              <button className="close-btn" onClick={() => setShowSponsorTable(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
