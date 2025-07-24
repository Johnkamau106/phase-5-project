import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/api';
import './CaregiverDashboard.css';


const EnrollChild = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    age: '',
    gender: '',
    photo: '',
    health_status: '',
    notes: '',
    home: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    // Split name into first and last name
    const [firstName, ...lastNameArr] = formData.name.trim().split(" ");
    const payload = {
      first_name: firstName || formData.name,
      last_name: lastNameArr.join(" ") || "",
      date_of_birth: formData.birthdate,
      gender: formData.gender,
      home_id: Number(formData.home), // must be an integer ID
      photo: formData.photo,
      health_status: formData.health_status,
      background: formData.notes,
    };

    const response = await fetch(`${BASE_URL}/api/children`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    navigate('/caregiver');
  } catch (error) {
    setError(error.message);
  }
};

  return (
    <div className="caregiver-dashboard">
      <div className="caregiver-section expanded">
        <div className="section-header">
          <h3>Enroll New Child</h3>
        </div>
        <div className="section-content">
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="enroll-child-form">
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
              <label>Birthdate:</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Photo URL:</label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Health Status:</label>
              <input
                type="text"
                name="health_status"
                value={formData.health_status}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Notes:</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Home:</label>
              <input
                type="text"
                name="home"
                value={formData.home}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Enroll Child
              </button>
              <button
                type="button"
                onClick={() => navigate('/caregiver')}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollChild;
