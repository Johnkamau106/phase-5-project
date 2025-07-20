import React from "react";

const dummyEducationRecords = [
  {
    id: 1,
    child: "Amani Mwangi",
    term: "Term 1, 2025",
    grade: "B+",
    notes: "Excellent in math.",
    teacher: "Ms. Wambui"
  },
  {
    id: 2,
    child: "Neema Wanjiru",
    term: "Term 1, 2025",
    grade: "A",
    notes: "Very creative.",
    teacher: "Mr. Otieno"
  }
];

const EducationRecords = ({ caregiverId }) => (
  <div>
    <h3>📚 Education Records</h3>
    <table>
      <thead>
        <tr>
          <th>Child</th>
          <th>Term</th>
          <th>Grade</th>
          <th>Teacher</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {dummyEducationRecords.map(record => (
          <tr key={record.id}>
            <td>{record.child}</td>
            <td>{record.term}</td>
            <td>{record.grade}</td>
            <td>{record.teacher}</td>
            <td>{record.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EducationRecords;