import React from 'react';

function StudentCard({ name, rollNo, department, university, color }) {
  return (
    <div className="student-card" style={{ backgroundColor: color }}>
      <h2 className="student-name">{name}</h2>
      <div className="student-details">
        <p><strong>Roll No:</strong> {rollNo}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>University:</strong> {university}</p>
      </div>
    </div>
  );
}

export default StudentCard;
