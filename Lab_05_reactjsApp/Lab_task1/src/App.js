import React from 'react';
import StudentCard from './StudentCard';

function App() {
  return (
    <div className="App">
      <h1 className="app-title">Student Information Cards</h1>
      <div className="cards-container">
        <StudentCard
          name="Ahmed Khan"
          rollNo="BSCS-2021-001"
          department="Computer Science"
          university="University of Engineering and Technology"
          color="#e3f2fd"
        />
        <StudentCard
          name="Fatima Ali"
          rollNo="BSCS-2021-045"
          department="Computer Science"
          university="University of Engineering and Technology"
          color="#f3e5f5"
        />
        <StudentCard
          name="Hassan Raza"
          rollNo="BSCS-2021-089"
          department="Computer Science"
          university="University of Engineering and Technology"
          color="#e8f5e9"
        />
      </div>
    </div>
  );
}

export default App;
