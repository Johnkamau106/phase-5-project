import React, { useState, useEffect } from "react";
import "./ChildrenList.css";
import { BASE_URL } from "../../utils/api";
import EnrollChild from "../caregiver/EnrollChild";

const calculateAge = (birthdate) => {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const ChildrenList = ({
  readOnly = false,
  sponsorMode = false,
  handleSponsor,
  sponsorLoading = false,
  children: childrenProp
}) => {
  const [view, setView] = useState("table");
  const [children, setChildren] = useState(childrenProp || []);
  const [loading, setLoading] = useState(!childrenProp);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingChild, setEditingChild] = useState(null);

  const fetchChildren = async () => {
    if (childrenProp) return; // Don't fetch if children are provided via props
    try {
      const response = await fetch(`${BASE_URL}/api/children`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (child) => {
    setEditingChild(child);
    setShowForm(true);
  };

  const handleDelete = async (childId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this child?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/api/children/${childId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete child");

      // Refresh list
      fetchChildren();
    } catch (err) {
      console.error(err);
      alert("Error deleting child.");
    }
  };

  useEffect(() => {
    if (!childrenProp) fetchChildren();
    else {
      setChildren(childrenProp);
      setLoading(false);
    }
  }, [childrenProp]);

  if (loading) return <div>Loading children...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="children-list">
      <h3>
        {readOnly ? "🧒 Current Needs You Support" : "🧒 Current Needs in Your Care"}
      </h3>

      <div className="view-toggle">
        <button
          onClick={() => setView("table")}
          className={view === "table" ? "active" : ""}
        >
          📋 Table View
        </button>
        <button
          onClick={() => setView("card")}
          className={view === "card" ? "active" : ""}
        >
          🖼️ Card View
        </button>
      </div>

      {children.length === 0 ? (
        <p>No children found.</p>
      ) : view === "table" ? (
        <table className="children-table">
          <thead>
            <tr>
              <th>Image URL</th>
              <th>Name</th>
              <th>Birthdate</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Health</th>
              <th>Home</th>
              <th>Notes</th>
              {!readOnly && !sponsorMode && <th>Actions</th>}
              {sponsorMode && <th>Sponsor</th>}
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child.id}>
                <td>
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="table-photo"
                  />
                </td>
                <td>{child.fullName || child.name}</td>
                <td>{child.dateOfBirth || child.birthdate}</td>
                <td>{child.age !== undefined ? child.age : calculateAge(child.dateOfBirth || child.birthdate)}</td>
                <td>{child.gender}</td>
                <td>{child.healthStatus || child.health_status}</td>
                <td>{child.home?.name || child.home_name || ""}</td>
                <td>{child.background || child.notes}</td>
                {!readOnly && !sponsorMode && (
                  <td>
                    <button className="btn-view">View</button>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(child)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(child.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
                {sponsorMode && (
                  <td>
                    <button
                      className="btn-primary"
                      disabled={child.isSponsored || sponsorLoading}
                      onClick={() => handleSponsor(child.id)}
                    >
                      {child.isSponsored ? "Sponsored" : sponsorLoading ? "Processing..." : "Sponsor"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="children-grid">
          {children.map((child) => (
            <div className="child-card" key={child.id}>
              <img src={child.photo} alt={child.name} className="child-photo" />
              <h4>{child.name}</h4>
              <p>
                <strong>Birthdate:</strong> {child.birthdate}
              </p>
              <p>
                <strong>Age:</strong> {calculateAge(child.birthdate)}
              </p>
              <p>
                <strong>Gender:</strong> {child.gender}
              </p>
              <p>
                <strong>Health:</strong> {child.healthStatus}
              </p>
              <p>
                <strong>Home:</strong> {child.home?.name || "N/A"}
              </p>
              <p>
                <strong>Notes:</strong> {child.notes}
              </p>

              {!readOnly && (
                <div className="card-actions">
                  <button className="btn-view">View</button>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(child)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(child.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for editing */}
      {showForm && editingChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EnrollChild
              existingChild={editingChild}
              onClose={() => {
                setShowForm(false);
                setEditingChild(null);
              }}
              onSave={() => {
                setShowForm(false);
                setEditingChild(null);
                fetchChildren(); // refresh list after save
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenList;
