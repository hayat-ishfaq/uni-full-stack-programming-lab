function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <small>SKU: {product.sku}</small>
        <div className="card-row">
          <strong>${product.price}</strong>
          <button type="button" onClick={() => onAdd(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
