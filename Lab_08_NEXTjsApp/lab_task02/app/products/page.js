<<<<<<< HEAD
import Link from 'next/link';
import ProductList from '../../components/ProductList';

export default function ProductsPage() {
  return (
    <section className="content-card">
      <p className="eyebrow">Product List</p>
      <h1>Available Products</h1>
      <p className="lead compact">
        Select any product below to view its dynamic detail page.
      </p>
      <ProductList />
      <div className="page-links">
        <Link href="/" className="button-secondary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
=======
import Link from 'next/link';
import ProductList from '../../components/ProductList';

export default function ProductsPage() {
  return (
    <section className="content-card">
      <p className="eyebrow">Product List</p>
      <h1>Available Products</h1>
      <p className="lead compact">
        Select any product below to view its dynamic detail page.
      </p>
      <ProductList />
      <div className="page-links">
        <Link href="/" className="button-secondary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
>>>>>>> f9253df3f1baf194a3fda381200b9cbe335453ef
