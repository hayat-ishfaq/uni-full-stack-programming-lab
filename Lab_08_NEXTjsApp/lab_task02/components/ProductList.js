<<<<<<< HEAD
import Link from 'next/link';
import { products } from './productsData';

export default function ProductList() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          <p className="product-price">{product.price}</p>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <Link href={`/products/${product.id}`} className="button-secondary">
            View Details
          </Link>
        </article>
      ))}
    </div>
  );
}
=======
import Link from 'next/link';
import { products } from './productsData';

export default function ProductList() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          <p className="product-price">{product.price}</p>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <Link href={`/products/${product.id}`} className="button-secondary">
            View Details
          </Link>
        </article>
      ))}
    </div>
  );
}
>>>>>>> f9253df3f1baf194a3fda381200b9cbe335453ef
