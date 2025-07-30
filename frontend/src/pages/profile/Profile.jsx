import React, { useState } from "react";
import { BASE_URL } from "../../utils/api";
import { useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils/auth";
import SponsoredChildrenSection from "./SponsoredChildrenSection";
import DonationsSection from "./DonationsSection";
import "./Profile.css";

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const location = useLocation();
  const currentUser = user || getUserFromLocalStorage();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleToggle = (role) => {
    const updatedRoles = formData.roles.includes(role)
      ? formData.roles.filter((r) => r !== role)
      : [...formData.roles, role];
    setFormData({ ...formData, roles: updatedRoles });
  };

  const handleSave = async () => {
    if (!currentUser?.id) {
      console.error("User ID is missing, cannot save profile.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/users/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const renderRoleBadges = () =>
    currentUser?.roles?.map((role) => (
      <span
        key={role}
        className={`role-badge ${
          role === "admin"
            ? "admin"
            : role === "caregiver"
            ? "caregiver"
            : "donor"
        }`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    ));

  const renderRoleSpecificTabs = () => {
    const tabs = [
      { id: "profile", label: "Profile" },
      { id: "activity", label: "Activity" },
    ];

    if (currentUser?.roles?.includes("donor")) {
      tabs.push(
        { id: "sponsored", label: "Sponsored Children" },
        { id: "donations", label: "Donations" }
      );
    }

    if (currentUser?.roles?.includes("caregiver")) {
      tabs.push(
        { id: "children", label: "My Children" },
        { id: "needs", label: "Current Needs" }
      );
    }

    if (currentUser?.roles?.includes("admin")) {
      tabs.push(
        { id: "users", label: "User Management" },
        { id: "reports", label: "Reports" }
      );
    }

    return tabs.map((tab) => (
      <button
        key={tab.id}
        className={`sidebar-nav-item ${activeTab === tab.id ? "active" : ""}`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="profile-section">
            <h3 className="section-title">My Profile</h3>
            <div className="profile-card">
              {!isEditing ? (
                <>
                  <div className="avatar-section">
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      className="avatar"
                    />
                    <h2>{formData.name}</h2>
                    <p>{formData.email}</p>
                    <div className="profile-details">
                      <p>
                        <strong>Phone:</strong> {formData.phone || "N/A"}
                      </p>
                      <p>
                        <strong>Address:</strong> {formData.address || "N/A"}
                      </p>
                      <p>
                        <strong>Bio:</strong> {formData.bio || "N/A"}
                      </p>
                      <p>
                        <strong>Roles:</strong>{" "}
                        {formData.roles?.join(", ") || "None"}
                      </p>
                    </div>
                    <div className="role-badges">{renderRoleBadges()}</div>
                    <button
                      className="primary-button"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <div className="edit-profile-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Avatar URL</label>
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="role-selection">
                    <label>Roles:</label>
                    {["donor", "caregiver", "admin"].map((role) => (
                      <label key={role}>
                        <input
                          type="checkbox"
                          checked={formData.roles.includes(role)}
                          onChange={() => handleRoleToggle(role)}
                        />
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </label>
                    ))}
                  </div>
                  <div className="edit-actions">
                    <button className="primary-button" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "activity":
        return (
          <div className="profile-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📅</div>
                <div className="activity-content">
                  <p>You logged in on {new Date().toLocaleDateString()}</p>
                  <small className="activity-time">Today</small>
                </div>
              </div>
            </div>
          </div>
        );
      case "sponsored":
        return (
          <SponsoredChildrenSection user={currentUser} />
        );
      case "donations":
        return (
          <DonationsSection user={currentUser} />
        );
      case "children":
        return (
          <div className="profile-section">
            <h3>Children Assigned</h3>
            <div className="empty-state">
              <p>No children currently assigned.</p>
            </div>
          </div>
        );
      case "needs":
        return (
          <div className="profile-section">
            <h3>Current Needs</h3>
            <div className="empty-state">
              <p>No needs currently posted.</p>
              <button className="primary-button">Post a Need</button>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="profile-section">
            <h3>User Management</h3>
            <div className="empty-state">
              <p>Manage all users of the system.</p>
              <button className="primary-button">View All Users</button>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="profile-section">
            <h3>System Reports</h3>
            <div className="empty-state">
              <p>No reports available.</p>
              <button className="primary-button">Generate Reports</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!currentUser) return <div>Loading user...</div>;

  return (
    <div className="profile-container">
      <div className="profile-banner"></div>
      <main className="profile-main">
        <div className="profile-sidebar">
          <div className="sidebar-avatar">
            <img
              src={currentUser.avatar}
              alt="Profile"
              className="sidebar-avatar-img"
            />
            <h3>{currentUser.name}</h3>
            <p className="sidebar-email">{currentUser.email}</p>
          </div>
          <nav className="sidebar-nav">{renderRoleSpecificTabs()}</nav>
        </div>
        <div className="profile-content">{renderTabContent()}</div>
      </main>
    </div>
  );
};

export default Profile;
