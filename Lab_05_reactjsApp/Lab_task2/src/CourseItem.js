import React from 'react';

function CourseItem({ courseName, instructor, duration, courseType }) {
  return (
    <div className="course-item">
      <div className="course-header">
        <h3 className="course-name">{courseName}</h3>
        <span className={`course-type ${courseType.toLowerCase()}`}>
          {courseType}
        </span>
      </div>
      <div className="course-details">
        <div className="detail-row">
          <span className="detail-icon">👨‍🏫</span>
          <span className="detail-label">Instructor:</span>
          <span className="detail-value">{instructor}</span>
        </div>
        <div className="detail-row">
          <span className="detail-icon">⏱️</span>
          <span className="detail-label">Duration:</span>
          <span className="detail-value">{duration}</span>
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
