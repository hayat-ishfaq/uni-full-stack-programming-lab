import ProductCard from "../components/ProductCard";

function ProductsPage({ products, onAddToCart }) {
  return (
    <section>
      <div className="section-header">
        <h2>Products</h2>
        <p>Browse the spa catalog and add items to your cart.</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
