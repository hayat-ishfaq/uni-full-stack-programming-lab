import React, { useState } from 'react';
import './Products.css';

const Products = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const products = [
    {
      id: 1,
      title: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 129.99,
      image: '🎧',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Smart Watch',
      description: 'Feature-rich smartwatch with heart rate monitor, GPS, and water resistance.',
      price: 299.99,
      image: '⌚',
      rating: 4.6
    },
    {
      id: 3,
      title: 'USB-C Cable',
      description: 'Durable 2-meter USB-C cable with fast charging capability.',
      price: 12.99,
      image: '🔌',
      rating: 4.5
    },
    {
      id: 4,
      title: 'Phone Stand',
      description: 'Adjustable phone stand compatible with all smartphones and tablets.',
      price: 15.99,
      image: '📱',
      rating: 4.7
    },
    {
      id: 5,
      title: 'Wireless Charger',
      description: 'Fast wireless charger pad with overcharge protection and LED indicator.',
      price: 34.99,
      image: '🔋',
      rating: 4.9
    },
    {
      id: 6,
      title: 'Portable Speaker',
      description: 'Waterproof portable speaker with 360-degree sound and 12-hour battery.',
      price: 79.99,
      image: '🔊',
      rating: 4.8
    },
    {
      id: 7,
      title: 'Screen Protector',
      description: 'Tempered glass screen protector for crystal clear display protection.',
      price: 9.99,
      image: '🛡️',
      rating: 4.4
    },
    {
      id: 8,
      title: 'Phone Case',
      description: 'Premium silicone phone case with excellent grip and drop protection.',
      price: 24.99,
      image: '📦',
      rating: 4.7
    }
  ];

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setNotificationMessage(`${product.title} added to cart!`);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <h1>Our Products</h1>
        <p>Discover our amazing collection of tech products</p>
      </section>

      {/* Notification */}
      {showNotification && (
        <div className="notification">
          ✓ {notificationMessage}
        </div>
      )}

      {/* Products Grid */}
      <section className="products-section">
        <div className="products-header">
          <h2>Featured Products</h2>
          <p className="cart-count">Items in cart: {cartItems.length}</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image}
              </div>
              <div className="product-content">
                <h3>{product.title}</h3>
                <p className="description">{product.description}</p>

                <div className="product-footer">
                  <div className="product-info">
                    <div className="price">${product.price}</div>
                    <div className="rating">
                      <span className="stars">⭐</span>
                      <span className="rating-value">{product.rating}</span>
                    </div>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <section className="cart-summary">
          <div className="summary-content">
            <h3>Shopping Cart Summary</h3>
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.image} {item.title} - ${item.price}
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <strong>Total Items:</strong> {cartItems.length}
              <br />
              <strong>Estimated Total:</strong> ${(
                cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)
              )}
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </section>
      )}

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <section className="empty-cart">
          <p>Your cart is empty. Add some amazing products!</p>
        </section>
      )}
    </div>
  );
};

export default Products;
