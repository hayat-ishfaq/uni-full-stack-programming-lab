import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  // Increment count
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // Decrement count (prevent going below 0)
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // Reset count to 0
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h1>Counter Application</h1>
      <div className="counter-display">
        <h2>Current Count: <span className="count-value">{count}</span></h2>
      </div>
      <div className="button-group">
        <button className="btn btn-increment" onClick={handleIncrement}>
          Increment
        </button>
        <button className="btn btn-decrement" onClick={handleDecrement}>
          Decrement
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <p className="info-text">Count cannot go below 0</p>
    </div>
  );
};

export default Counter;
