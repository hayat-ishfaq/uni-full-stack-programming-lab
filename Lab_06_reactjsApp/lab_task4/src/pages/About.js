import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About ShopHub</h1>
        <p>Your Trusted Online Shopping Destination</p>
      </section>

      {/* Main Content */}
      <section className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, ShopHub started with a simple mission: to make online shopping
            accessible, convenient, and trustworthy for everyone. What began as a small startup
            has grown into a leading e-commerce platform serving thousands of customers worldwide.
          </p>
          <p>
            Our journey has been driven by a passion for innovation and a commitment to
            customer satisfaction. We've continuously evolved to meet the changing needs of our
            customers and adapting to new market trends.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At ShopHub, our mission is to revolutionize the way people shop online by providing:
          </p>
          <ul className="mission-list">
            <li>High-quality products from trusted brands</li>
            <li>Competitive pricing and regular discounts</li>
            <li>Fast and reliable shipping services</li>
            <li>Exceptional customer service and support</li>
            <li>A secure and user-friendly shopping experience</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🎯 Customer First</h3>
              <p>We prioritize customer satisfaction in everything we do.</p>
            </div>
            <div className="value-card">
              <h3>✨ Quality</h3>
              <p>We maintain the highest standards in our products and services.</p>
            </div>
            <div className="value-card">
              <h3>🤝 Integrity</h3>
              <p>We conduct business with honesty and transparency.</p>
            </div>
            <div className="value-card">
              <h3>🚀 Innovation</h3>
              <p>We constantly innovate to improve the shopping experience.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Why Choose ShopHub?</h2>
          <div className="reasons-grid">
            <div className="reason-item">
              <div className="reason-number">1</div>
              <h4>Wide Selection</h4>
              <p>Browse thousands of products across multiple categories</p>
            </div>
            <div className="reason-item">
              <div className="reason-number">2</div>
              <h4>Best Prices</h4>
              <p>Competitive pricing with regular sales and discounts</p>
            </div>
            <div className="reason-item">
              <div className="reason-number">3</div>
              <h4>Fast Delivery</h4>
              <p>Quick shipping with multiple delivery options</p>
            </div>
            <div className="reason-item">
              <div className="reason-number">4</div>
              <h4>Secure Checkout</h4>
              <p>Safe and encrypted payment processing</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Achievements</h2>
          <div className="achievements">
            <div className="achievement">
              <h4>50,000+</h4>
              <p>Happy Customers</p>
            </div>
            <div className="achievement">
              <h4>100,000+</h4>
              <p>Products Available</p>
            </div>
            <div className="achievement">
              <h4>99.5%</h4>
              <p>Customer Satisfaction</p>
            </div>
            <div className="achievement">
              <h4>25+</h4>
              <p>Countries Served</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
