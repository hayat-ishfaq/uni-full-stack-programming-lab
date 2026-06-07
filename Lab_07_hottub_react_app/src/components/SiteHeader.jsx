import { Link } from "react-router-dom";

function SiteHeader({ cartCount }) {
  return (
    <header className="site-header">
      <div className="container row-between">
        <Link to="/" className="brand">
          <h1>HOTSPRING</h1>
          <span>Portable Spas</span>
        </Link>
        <Link to="/cart" className="cart-pill">
          <span>My Cart</span>
          <strong>{cartCount} items</strong>
        </Link>
      </div>
    </header>
  );
}

export default SiteHeader;
