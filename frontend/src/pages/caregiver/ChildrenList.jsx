import React from 'react';
import './ChildrenList.css';

const childrenData = [
  {
    id: 1,
    name: 'Amina Wanjiku',
    age: 8,
    gender: 'Female',
    status: 'Healthy',
  },
  {
    id: 2,
    name: 'John Otieno',
    age: 10,
    gender: 'Male',
    status: 'Needs Checkup',
  },
  {
    id: 3,
    name: 'Faith Mwikali',
    age: 7,
    gender: 'Female',
    status: 'Healthy',
  },
];

const ChildrenList = () => {
  return (
    <div className="children-list">
      <h2>Children Under Your Care</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {childrenData.map((child) => (
            <tr key={child.id}>
              <td>{child.name}</td>
              <td>{child.age}</td>
              <td>{child.gender}</td>
              <td>{child.status}</td>
              <td>
                <button className="view-btn">View</button>
                <button className="mark-btn">Mark Attendance</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildrenList;
