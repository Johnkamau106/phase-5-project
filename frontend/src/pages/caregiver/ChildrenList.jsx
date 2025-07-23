import React, { useState, useEffect } from 'react';
import './ChildrenList.css';
import { BASE_URL } from '../../utils/api';

const ChildrenList = () => {
  const [view, setView] = useState('table'); // 'table' or 'card'
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
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

    fetchChildren();
  }, []);

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
                  <button className="btn-view">View</button>
                  <button className="btn-edit">Edit</button>
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
                <button className="btn-view">View</button>
                <button className="btn-edit">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildrenList;
