import React, { useState } from 'react';

const Actions = () => {
  const [message, setMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#333333');
  const [isHovering, setIsHovering] = useState(false);

  // List of colors for background changes
  const colors = [
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#f9ca24',
    '#6c5ce7',
    '#a29bfe',
    '#fd79a8',
    '#fdcb6e'
  ];

  // Handle Show Message button
  const handleShowMessage = () => {
    setMessage('Hello! This message appears when you click the "Show Message" button. 👋');
  };

  // Handle Change Background Color button
  const handleChangeBackground = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  };

  // Handle Show Alert button
  const handleShowAlert = () => {
    alert('🎉 This is an Alert Box!\n\nEvent handling in React makes it easy to respond to user interactions!');
  };

  // Handle Mouse Over for text color change
  const handleMouseOver = () => {
    setIsHovering(true);
    setTextColor('#667eea');
  };

  // Handle Mouse Out to reset text color
  const handleMouseOut = () => {
    setIsHovering(false);
    setTextColor('#333333');
  };

  return (
    <div className="actions-container" style={{ backgroundColor }}>
      <div className="actions-content">
        <h1 
          className={`title ${isHovering ? 'hovering' : ''}`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          style={{ color: textColor }}
        >
          Interactive Event Handling App
        </h1>

        <div className="buttons-section">
          <h2>Event Demonstration Buttons</h2>
          
          <div className="button-group">
            {/* Show Message Button */}
            <button
              className="action-btn btn-message"
              onClick={handleShowMessage}
            >
              📝 Show Message
            </button>

            {/* Change Background Color Button */}
            <button
              className="action-btn btn-color"
              onClick={handleChangeBackground}
            >
              🎨 Change Background Color
            </button>

            {/* Show Alert Button */}
            <button
              className="action-btn btn-alert"
              onClick={handleShowAlert}
            >
              ⚠️ Show Alert
            </button>
          </div>

          <p className="hint-text">
            💡 Tip: Hover over the title to see the text color change!
          </p>
        </div>

        {/* Display Message Section */}
        {message && (
          <div className="message-section">
            <h3>💬 Message:</h3>
            <p className="message-text">{message}</p>
            <button
              className="close-btn"
              onClick={() => setMessage('')}
            >
              Clear Message
            </button>
          </div>
        )}

        {/* Event Information Section */}
        <div className="info-section">
          <h3>Events Demonstrated:</h3>
          <ul className="events-list">
            <li>
              <strong>onClick:</strong> Triggered when buttons are clicked
              <ul>
                <li>Show Message - updates state with a message</li>
                <li>Change Background Color - selects random color</li>
                <li>Show Alert - displays browser alert</li>
              </ul>
            </li>
            <li>
              <strong>onMouseOver:</strong> Changes text color when hovering over the title
            </li>
            <li>
              <strong>onMouseOut:</strong> Resets text color when mouse leaves the title
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Actions;
