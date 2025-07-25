import React, { useState, useEffect } from 'react';
import './ChildrenList.css';
import { BASE_URL } from "../../utils/api";

const EditChildModal = ({ child, onClose, onSave }) => {
  const [formData, setFormData] = useState(child);

  useEffect(() => {
    setFormData(child);
  }, [child]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Child Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Birthdate:</label>
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Photo URL:</label>
            <input type="text" name="photo" value={formData.photo} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Health Status:</label>
            <input type="text" name="healthStatus" value={formData.healthStatus} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Home:</label>
            <input type="text" name="home" value={formData.home} onChange={handleChange} />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Save Changes</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


import { getUserFromLocalStorage } from '../../utils/auth';

const ChildrenList = () => {
  const currentUser = getUserFromLocalStorage();
  const [sponsoredChildrenIds, setSponsoredChildrenIds] = useState([]);
  const [view, setView] = useState('table'); // 'table' or 'card'
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingChild, setEditingChild] = useState(null);

  useEffect(() => {
    const fetchSponsoredChildren = async () => {
      if (!currentUser || !currentUser.token) return;
      try {
        const response = await fetch(`${BASE_URL}/api/sponsorships/user`, {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSponsoredChildrenIds(data);
      } catch (error) {
        console.error("Error fetching sponsored children:", error);
      }
    };
    fetchSponsoredChildren();
  }, [currentUser]);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/children`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setChildren(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleEdit = (child) => {
    // The date from backend might be a full ISO string, but date input needs YYYY-MM-DD
    const birthdate = child.birthdate ? child.birthdate.split('T')[0] : '';
    setEditingChild({ ...child, birthdate });
  };

  const handleCloseModal = () => {
    setEditingChild(null);
  };

  const handleSaveChild = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/children/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update child');
      }
      await fetchChildren(); // Refetch to get updated list
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSponsor = async (childId) => {
    if (!currentUser || !currentUser.token) {
      alert("Please log in to sponsor a child.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/sponsorships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ child_id: childId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sponsor child');
      }
      setSponsoredChildrenIds((prev) => [...prev, childId]);
      alert("Child sponsored successfully!");
    } catch (err) {
      setError(err.message);
      alert(`Error sponsoring child: ${err.message}`);
    }
  };

  const handleUnsponsor = async (childId) => {
    if (!currentUser || !currentUser.token) {
      alert("Please log in to unsponsor a child.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/sponsorships/${childId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to unsponsor child');
      }
      setSponsoredChildrenIds((prev) => prev.filter((id) => id !== childId));
      alert("Child unsponsored successfully!");
    } catch (err) {
      setError(err.message);
      alert(`Error unsponsoring child: ${err.message}`);
    }
  };

  if (loading) {
    return <div>Loading children...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="children-list">
      <h3>🧒 Children in Your Care</h3>
      <div className="view-toggle">
        <button onClick={() => setView('table')} className={view === 'table' ? 'active' : ''}>
          📋 Table View
        </button>
        <button onClick={() => setView('card')} className={view === 'card' ? 'active' : ''}>
          🖼️ Card View
        </button>
      </div>

      {children.length === 0 ? (
        <p>No children found.</p>
      ) : view === 'table' ? (
        <table className="children-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Birthdate</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Health</th>
              <th>Home</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child.id}>
                <td><img src={child.photo} alt={child.name} className="table-photo" /></td>
                <td>{child.name}</td>
                <td>{child.birthdate}</td>
                <td>{child.age}</td>
                <td>{child.gender}</td>
                <td>{child.healthStatus}</td>
                <td>{child.home}</td>
                <td>{child.notes}</td>
                <td>
                  <button className="btn-view" onClick={() => handleEdit(child)}>View</button>
                  <button className="btn-edit" onClick={() => handleEdit(child)}>Edit</button>
                  {sponsoredChildrenIds.includes(child.id) ? (
                    <button className="btn-secondary" onClick={() => handleUnsponsor(child.id)}>Unsponsor</button>
                  ) : (
                    <button className="btn-primary" onClick={() => handleSponsor(child.id)}>Sponsor</button>
                  )}
                </td>
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
              <p><strong>Birthdate:</strong> {child.birthdate}</p>
              <p><strong>Age:</strong> {child.age}</p>
              <p><strong>Gender:</strong> {child.gender}</p>
              <p><strong>Health:</strong> {child.healthStatus}</p>
              <p><strong>Home:</strong> {child.home}</p>
              <p><strong>Notes:</strong> {child.notes}</p>
              <div className="card-actions">
                <button className="btn-view" onClick={() => handleEdit(child)}>View</button>
                <button className="btn-edit" onClick={() => handleEdit(child)}>Edit</button>
                {sponsoredChildrenIds.includes(child.id) ? (
                  <button className="btn-secondary" onClick={() => handleUnsponsor(child.id)}>Unsponsor</button>
                ) : (
                  <button className="btn-primary" onClick={() => handleSponsor(child.id)}>Sponsor</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editingChild && (
        <EditChildModal
          child={editingChild}
          onClose={handleCloseModal}
          onSave={handleSaveChild}
        />
      )}
    </div>
  );
};

export default ChildrenList;

