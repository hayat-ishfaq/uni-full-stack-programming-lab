function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Contact Us</h3>
          <p>yoursitename.com</p>
          <p>Call 24/7: 888 - 201 - 8899</p>
          <p>Email: servicemail@yoursitename.com</p>
        </div>
        <div>
          <h3>Information</h3>
          <p>About Us</p>
          <p>Customer Service</p>
          <p>Privacy Policy</p>
        </div>
        <div>
          <h3>My Account</h3>
          <p>Sign In</p>
          <p>View Cart</p>
          <p>My Wishlist</p>
        </div>
        <div>
          <h3>Newsletter</h3>
          <input placeholder="Your email" aria-label="Newsletter" />
          <button type="button">Subscribe</button>
        </div>
      </div>
      <p className="copyright">© 2026 HotSpring Portable Spas. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
