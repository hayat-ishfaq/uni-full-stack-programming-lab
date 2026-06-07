import React from 'react';
import Greeting from './Greeting';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Dynamic Greeting App</h1>
        <p>Personalized greetings for different times of the day</p>
      </header>

      <div className="greetings-container">
        <Greeting 
          name="Sarah Ahmed" 
          timeOfDay="morning" 
          bgColor="#FFF9E6"
        />
        
        <Greeting 
          name="Ali Hassan" 
          timeOfDay="afternoon" 
          bgColor="#E8F4FD"
        />
        
        <Greeting 
          name="Fatima Khan" 
          timeOfDay="evening" 
          bgColor="#FFE8F0"
        />
        
        <Greeting 
          name="Usman Raza" 
          timeOfDay="night" 
          bgColor="#E6E6FA"
        />
      </div>
    </div>
  );
}

export default App;
