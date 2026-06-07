import React, { useState } from 'react';

const UserForm = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // State for submitted data
  const [submittedData, setSubmittedData] = useState([]);
  
  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle name input change
  const handleNameChange = (e) => {
    setName(e.target.value);
    // Clear error when user starts typing
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {};

    // Validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // If there are errors, display them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add submitted data to list
    setSubmittedData([
      ...submittedData,
      {
        id: Date.now(),
        name: name,
        email: email
      }
    ]);

    // Clear input fields
    setName('');
    setEmail('');
    setErrors({});
  };

  // Delete a submitted entry
  const handleDelete = (id) => {
    setSubmittedData(submittedData.filter(item => item.id !== id));
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>User Registration Form</h1>
        
        <form onSubmit={handleSubmit} className="form">
          {/* Name Input Field */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your full name"
              className={`input-field ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Input Field */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>

      {/* Display Submitted Data */}
      {submittedData.length > 0 && (
        <div className="submitted-data-section">
          <h2>Submitted Users ({submittedData.length})</h2>
          <div className="users-list">
            {submittedData.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <p>
                    <strong>Name:</strong> <span>{user.name}</span>
                  </p>
                  <p>
                    <strong>Email:</strong> <span>{user.email}</span>
                  </p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                  title="Delete this entry"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State Message */}
      {submittedData.length === 0 && (
        <div className="empty-state">
          <p>No users submitted yet. Fill the form to add users!</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
