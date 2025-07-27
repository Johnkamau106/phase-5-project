import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/api";

const initialForm = {
  name: "",
  location: "",
  children: "",
  description: "",
};

const AdminHomes = ({ expanded, toggleSection, onHomeCountChange }) => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/api/homes`);
    const data = await res.json();
    const validHomes = Array.isArray(data) ? data : [];
    setHomes(validHomes);
    onHomeCountChange?.(validHomes.length); // <-- Notify dashboard
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (home) => {
    setForm({
      name: home.name || "",
      location: home.location || "",
      children: home.children || "",
      description: home.description || "",
    });
    setEditingId(home.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this home?")) return;
    await fetch(`${BASE_URL}/api/homes/${id}`, { method: "DELETE" });
    fetchHomes();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${BASE_URL}/api/homes/${editingId}`
      : `${BASE_URL}/api/homes`;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    fetchHomes();
  };

  if (loading) return <div>Loading homes...</div>;

  return (
    <div>
      <h3>🏠 Manage Homes</h3>
      <button onClick={handleAdd}>+ Add New Home</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Children</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homes.map((home) => (
            <tr key={home.id}>
              <td>{home.name}</td>
              <td>{home.location}</td>
              <td>{home.children}</td>
              <td>{home.description}</td>
              <td>
                <button onClick={() => handleEdit(home)}>Edit</button>
                <button onClick={() => handleDelete(home.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "1em" }}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleInputChange}
            required
          />
          <input
            name="children"
            placeholder="Children"
            value={form.children}
            onChange={handleInputChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
          />
          <button type="submit">{editingId ? "Update" : "Add"}</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminHomes;
