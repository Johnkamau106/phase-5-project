import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/api";
import "./AdminHomes.css";

const initialForm = {
  name: "",
  location: "",
  children: "",
  description: "",
  amountContributed: "",
  target: "",
  needs: [],
  newNeed: "",
  image: "",
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

  const handleNeedAdd = (e) => {
    e.preventDefault();
    if (form.newNeed.trim()) {
      setForm({
        ...form,
        needs: [...form.needs, form.newNeed.trim()],
        newNeed: "",
      });
    }
  };

  const handleNeedRemove = (idx) => {
    setForm({
      ...form,
      needs: form.needs.filter((_, i) => i !== idx),
    });
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
      amountContributed: home.amountContributed || "",
      target: home.target || "",
      needs: Array.isArray(home.needs) ? home.needs : [],
      newNeed: "",
      image: home.image || "",
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
    const submitForm = { ...form };
    delete submitForm.newNeed;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitForm),
    });
    setShowForm(false);
    fetchHomes();
  };

  if (loading) return <div>Loading homes...</div>;

  return (
    <div>
      <div className="section-header">
        <h3>🏠 Manage Homes</h3>
      </div>

      <button onClick={handleAdd} className="add-new-btn">
        + Add New Home
      </button>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Current Needs</th>
            <th>Description</th>
            <th>Amount Contributed</th>
            <th>Target</th>
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
                <button onClick={() => handleEdit(home)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(home.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="user-form"
          style={{ marginTop: "1em" }}
        >
          <h4>{editingId ? "Edit Home" : "Add New Home"}</h4>

          <div className="form-group">
            <label>Name:</label>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Children:</label>
            <input
              name="children"
              placeholder="Children"
              value={form.children}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              {editingId ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminHomes;
