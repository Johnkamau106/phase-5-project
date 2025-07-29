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
      <h3>🏠 Manage Homes</h3>
      <button onClick={handleAdd}>+ Add New Home</button>
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
          {homes.map((home) => {
            const percentFunded = home.target > 0
              ? Math.min(100, ((home.amountContributed / home.target) * 100).toFixed(1))
              : 0;
            return (
              <tr key={home.id}>
                <td>
                  {home.image ? (
                    <img src={home.image} alt={home.name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                  ) : (
                    <span style={{ color: '#aaa' }}>No image</span>
                  )}
                </td>
                <td>{home.name}</td>
                <td>{home.location}</td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {home.needs?.length > 0
                      ? home.needs.map((need, idx) => (
                          <span key={idx} style={{ background: '#eef2f7', borderRadius: '12px', padding: '2px 8px', fontSize: '0.85rem', color: '#333' }}>{need}</span>
                        ))
                      : <span style={{ color: '#aaa' }}>No current needs</span>}
                  </div>
                </td>
                <td>{home.description}</td>
                <td>
                  <div style={{ minWidth: 120 }}>
                    <div style={{ fontWeight: 600 }}>KES {home.amountContributed?.toLocaleString() || 0}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>({percentFunded}% funded)</div>
                  </div>
                </td>
                <td>KES {home.target?.toLocaleString() || 0}</td>
                <td>
                  <button onClick={() => handleEdit(home)}>Edit</button>
                  <button onClick={() => handleDelete(home.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "1em" }}>
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleInputChange}
            type="url"
            style={{ marginBottom: '8px' }}
          />
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
          <input
            name="amountContributed"
            placeholder="Amount Contributed"
            value={form.amountContributed}
            onChange={handleInputChange}
            type="number"
          />
          <input
            name="target"
            placeholder="Target"
            value={form.target}
            onChange={handleInputChange}
            type="number"
          />
          <div style={{ margin: '1em 0' }}>
            <label>Current Needs:</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
              {form.needs.map((need, idx) => (
                <span key={idx} style={{ background: '#eef2f7', borderRadius: '12px', padding: '2px 8px', fontSize: '0.85rem', color: '#333', display: 'inline-flex', alignItems: 'center' }}>
                  {need}
                  <button type="button" style={{ marginLeft: 4, background: 'none', border: 'none', color: '#d00', cursor: 'pointer', fontSize: '1em' }} onClick={() => handleNeedRemove(idx)}>&times;</button>
                </span>
              ))}
            </div>
            <input
              name="newNeed"
              placeholder="Add a need"
              value={form.newNeed}
              onChange={handleInputChange}
              style={{ marginRight: 8 }}
            />
            <button type="button" onClick={handleNeedAdd}>Add Need</button>
          </div>
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
