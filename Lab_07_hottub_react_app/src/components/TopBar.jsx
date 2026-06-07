import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="container row-between">
        <p>Call for Customer support: <span className="accent">020 38989565</span></p>
        <div className="mini-links">
          <Link to="/login">My Account</Link>
          <Link to="/products">Wishlist</Link>
          <Link to="/payment">To Checkout</Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
