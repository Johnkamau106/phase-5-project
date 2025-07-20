// src/pages/caregiver/ChildrenList.jsx
import React, { useState } from 'react';
import './ChildrenList.css';

const children = [
  {
    id: 1,
    name: 'Amani Mwangi',
    birthdate: '2015-06-12',
    age: 9,
    gender: 'Male',
    photo: '/images/amani.jpg',
    healthStatus: 'Good',
    notes: 'Loves drawing and math.',
    home: 'Hope Children’s Home',
  },
  {
    id: 2,
    name: 'Neema Wanjiru',
    birthdate: '2016-09-30',
    age: 8,
    gender: 'Female',
    photo: '/images/neema.jpg',
    healthStatus: 'Needs Dental Checkup',
    notes: 'Allergic to peanuts. Very playful.',
    home: 'Hope Children’s Home',
  },
  {
    id: 3,
    name: 'Brian Otieno',
    birthdate: '2014-02-18',
    age: 10,
    gender: 'Male',
    photo: '/images/brian.jpg',
    healthStatus: 'Good',
    notes: 'Shy but improving in reading.',
    home: 'Hope Children’s Home',
  },
];

const ChildrenList = () => {
  const [view, setView] = useState('table'); // 'table' or 'card'

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

      {view === 'table' ? (
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
