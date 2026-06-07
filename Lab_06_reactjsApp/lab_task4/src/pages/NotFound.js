import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>

        <div className="error-illustration">
          🔍
        </div>

        <p className="error-description">
          It seems like you've wandered off the beaten path. 
          The page might have been removed or moved, or you may have entered the wrong URL.
        </p>

        <div className="error-actions">
          <Link to="/" className="home-button">
            ← Back to Home
          </Link>
          <Link to="/products" className="products-button">
            Browse Products →
          </Link>
        </div>

        <div className="helpful-links">
          <h3>Helpful Links:</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
