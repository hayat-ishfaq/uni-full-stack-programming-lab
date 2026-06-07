import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopHub</h1>
          <p>Your Gateway to Amazing Products</p>
          <Link to="/products" className="cta-button">
            Explore Products
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Shipping</h3>
            <p>Get your orders delivered quickly and safely to your doorstep.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payment</h3>
            <p>Multiple payment options with 100% secure transactions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Quality Products</h3>
            <p>We offer only the best quality products from trusted brands.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Our customer service team is always ready to help you.</p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links">
        <h2>Quick Navigation</h2>
        <div className="links-grid">
          <Link to="/about" className="quick-link-card">
            <span className="link-icon">ℹ️</span>
            <h3>Learn About Us</h3>
            <p>Discover our story and mission</p>
          </Link>
          <Link to="/products" className="quick-link-card">
            <span className="link-icon">🛍️</span>
            <h3>Browse Products</h3>
            <p>Check our latest collection</p>
          </Link>
          <Link to="/contact" className="quick-link-card">
            <span className="link-icon">📧</span>
            <h3>Get in Touch</h3>
            <p>Send us your feedback</p>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get exclusive deals and updates delivered to your inbox</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
