import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function HomePage({ products, onAddToCart }) {
  const featured = products.slice(0, 3);

  return (
    <section>
      <div className="hero">
        <div>
          <p className="eyebrow">Premium wellness collection</p>
          <h2>Luxury hot tubs and portable spas for every home.</h2>
          <p>
            Converted from the FullStack-A-01 pages into a complete React experience with route-based
            navigation and reusable components.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn primary">Shop Products</Link>
            <Link to="/cart" className="btn">View Cart</Link>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h3>Featured Products</h3>
      </div>
      <div className="product-grid">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
