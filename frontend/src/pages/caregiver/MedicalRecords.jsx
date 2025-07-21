import React from "react";

const dummyMedicalRecords = [
  {
    id: 1,
    child: "Amani Mwangi",
    date: "2025-06-10",
    type: "Checkup",
    notes: "Healthy. No issues.",
    doctor: "Dr. Kimani"
  },
  {
    id: 2,
    child: "Neema Wanjiru",
    date: "2025-06-12",
    type: "Dental",
    notes: "Needs dental follow-up.",
    doctor: "Dr. Atieno"
  }
];

const MedicalRecords = ({ caregiverId }) => (
  <div>
    <h3>🏥 Medical Records</h3>
    <table>
      <thead>
        <tr>
          <th>Child</th>
          <th>Date</th>
          <th>Type</th>
          <th>Doctor</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {dummyMedicalRecords.map(record => (
          <tr key={record.id}>
            <td>{record.child}</td>
            <td>{record.date}</td>
            <td>{record.type}</td>
            <td>{record.doctor}</td>
            <td>{record.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MedicalRecords;