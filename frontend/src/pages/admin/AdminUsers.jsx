import { useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../utils/authserver";
import "./AdminDashboard.css";

const AdminUsers = ({ expanded, toggleSection, onUserCountChange }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roles: [],
    password: "",
  });

  // Available roles for selection
  const availableRoles = ["admin", "donor", "caregiver", "manager"];

  useEffect(() => {
    if (expanded) {
      fetchUsers();
    }
  }, [expanded]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers();
      const validUsers = Array.isArray(data) ? data : [];
      setUsers(validUsers);
      onUserCountChange?.(validUsers.length);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      roles: isChecked
        ? [...prev.roles, role]
        : prev.roles.filter((r) => r !== role),
    }));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      roles: Array.isArray(user.roles) ? user.roles : [],
      password: "",
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowAddForm(false);
    setFormData({
      name: "",
      email: "",
      roles: [],
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update existing user
        await updateUser(editingUser.id, formData);
      } else {
        // Create new user
        await createUser(formData);
      }
      await fetchUsers();
      handleCancel();
    } catch (error) {
      console.error("Error saving user:", error);
      setError(error.message || "Failed to save user");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        setError(error.message || "Failed to delete user");
      }
    }
  };

  return (
    <div className={`admin-section ${expanded ? "expanded" : ""}`}>
      <div className="section-header" onClick={() => toggleSection("users")}>
        <h3>👥 Manage Users {expanded ? "▴" : "▾"}</h3>
      </div>

      {expanded && (
        <div className="section-content">
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              {/* User Form (for add/edit) */}
              {(editingUser || showAddForm) && (
                <form onSubmit={handleSubmit} className="user-form">
                  <h4>{editingUser ? "Edit User" : "Add New User"}</h4>

                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={!!editingUser}
                    />
                  </div>

                  {!editingUser && (
                    <div className="form-group">
                      <label>Password:</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={!editingUser}
                        minLength="6"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Roles:</label>
                    <div className="roles-checkboxes">
                      {availableRoles.map((role) => (
                        <label key={role}>
                          <input
                            type="checkbox"
                            checked={formData.roles.includes(role)}
                            onChange={(e) =>
                              handleRoleChange(role, e.target.checked)
                            }
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-save">
                      {editingUser ? "Update" : "Create"} User
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Users Table */}
              {users.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Roles</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name || "Unnamed User"}</td>
                        <td>{user.email || "N/A"}</td>
                        <td>{user.roles?.join(", ") || "N/A"}</td>
                        <td className="actions">
                          <button
                            onClick={() => handleEdit(user)}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Add New User Button (only shown when not in edit/add mode) */}
              {!editingUser && !showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="add-new-btn"
                >
                  + Add New User
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
