import React from 'react';

function Greeting({ name, timeOfDay, bgColor }) {
  // Conditional rendering based on timeOfDay
  let greetingMessage = '';
  let icon = '';

  if (timeOfDay === 'morning') {
    greetingMessage = 'Good Morning';
    icon = '🌅';
  } else if (timeOfDay === 'afternoon') {
    greetingMessage = 'Good Afternoon';
    icon = '☀️';
  } else if (timeOfDay === 'evening') {
    greetingMessage = 'Good Evening';
    icon = '🌆';
  } else if (timeOfDay === 'night') {
    greetingMessage = 'Good Night';
    icon = '🌙';
  } else {
    greetingMessage = 'Hello';
    icon = '👋';
  }

  return (
    <div className="greeting-card" style={{ backgroundColor: bgColor }}>
      <div className="greeting-icon">{icon}</div>
      <h2 className="greeting-message">{greetingMessage}</h2>
      <p className="greeting-name">{name}!</p>
      <span className="time-badge">{timeOfDay}</span>
    </div>
  );
}

export default Greeting;
