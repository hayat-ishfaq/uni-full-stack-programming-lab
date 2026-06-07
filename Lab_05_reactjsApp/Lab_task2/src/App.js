import React from 'react';
import CourseItem from './CourseItem';

function App() {
  const courses = [
    {
      id: 1,
      courseName: 'Web Development Fundamentals',
      instructor: 'Dr. Sarah Ahmed',
      duration: '12 weeks',
      courseType: 'Online'
    },
    {
      id: 2,
      courseName: 'Data Structures and Algorithms',
      instructor: 'Prof. Muhammad Ali',
      duration: '16 weeks',
      courseType: 'Offline'
    },
    {
      id: 3,
      courseName: 'Machine Learning with Python',
      instructor: 'Dr. Ayesha Khan',
      duration: '10 weeks',
      courseType: 'Online'
    },
    {
      id: 4,
      courseName: 'Mobile App Development',
      instructor: 'Mr. Usman Tariq',
      duration: '14 weeks',
      courseType: 'Offline'
    },
    {
      id: 5,
      courseName: 'Cloud Computing and DevOps',
      instructor: 'Dr. Hassan Raza',
      duration: '8 weeks',
      courseType: 'Online'
    }
  ];

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">📚 Available Courses</h1>
        <p className="app-subtitle">Browse our comprehensive course catalog</p>
      </header>
      <div className="course-list">
        {courses.map((course) => (
          <CourseItem
            key={course.id}
            courseName={course.courseName}
            instructor={course.instructor}
            duration={course.duration}
            courseType={course.courseType}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
