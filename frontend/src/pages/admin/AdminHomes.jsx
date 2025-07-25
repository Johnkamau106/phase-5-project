import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/api";
import "./Admin.css";

const AdminHomes = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newHome, setNewHome] = useState({
    name: "",
    location: "",
    current_need: "",
    description: "",
    amount_contributed: 0,
    target_amount: 0,
    image: "",
  });
  const [editingHome, setEditingHome] = useState(null);

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/homes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHomes(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingHome) {
      setEditingHome({ ...editingHome, [name]: value });
    } else {
      setNewHome({ ...newHome, [name]: value });
    }
  };

  const handleAddHome = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/homes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHome),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewHome({
        name: "",
        location: "",
        current_need: "",
        description: "",
        amount_contributed: 0,
        target_amount: 0,
        image: "",
      });
      fetchHomes();
    } catch (error) {
      setError(error);
    }
  };

  const handleEditClick = (home) => {
    setEditingHome({ ...home });
  };

  const handleUpdateHome = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/homes/${editingHome.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingHome),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEditingHome(null);
      fetchHomes();
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteHome = async (id) => {
    if (window.confirm("Are you sure you want to delete this home?")) {
      try {
        const response = await fetch(`${BASE_URL}/api/homes/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchHomes();
      } catch (error) {
        setError(error);
      }
    }
  };

  if (loading) {
    return <div className="admin-page">Loading homes...</div>;
  }

  if (error) {
    return <div className="admin-page">Error: {error.message}</div>;
  }

  return (
    <div className="admin-page">
      <h3>🏠 Manage Homes</h3>

      {/* Add New Home Form */}
      <div className="add-item-form">
        <h4>{editingHome ? "Edit Home" : "Add New Home"}</h4>
        <input
          type="text"
          name="name"
          placeholder="Home Name"
          value={editingHome ? editingHome.name : newHome.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={editingHome ? editingHome.location : newHome.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="current_need"
          placeholder="Current Need"
          value={editingHome ? editingHome.current_need : newHome.current_need}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={editingHome ? editingHome.description : newHome.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="number"
          name="amount_contributed"
          placeholder="Amount Contributed"
          value={editingHome ? editingHome.amount_contributed : newHome.amount_contributed}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="target_amount"
          placeholder="Target Amount"
          value={editingHome ? editingHome.target_amount : newHome.target_amount}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={editingHome ? editingHome.image : newHome.image}
          onChange={handleInputChange}
        />
        {editingHome ? (
          <>
            <button onClick={handleUpdateHome}>Update Home</button>
            <button onClick={() => setEditingHome(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddHome}>Add Home</button>
        )}
      </div>

      {/* Homes Table */}
      {homes.length === 0 ? (
        <p>No homes found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Current Need</th>
              <th>Description</th>
              <th>Contributed</th>
              <th>Target</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {homes.map((home) => (
              <tr key={home.id}>
                <td>{home.name}</td>
                <td>{home.location}</td>
                <td>{home.current_need}</td>
                <td>{home.description}</td>
                <td>{home.amount_contributed}</td>
                <td>{home.target_amount}</td>
                <td><img src={home.image} alt={home.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} /></td>
                <td>
                  <button onClick={() => handleEditClick(home)}>Edit</button>
                  <button onClick={() => handleDeleteHome(home.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHomes;