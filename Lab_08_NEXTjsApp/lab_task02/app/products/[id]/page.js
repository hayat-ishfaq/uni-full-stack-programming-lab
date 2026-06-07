<<<<<<< HEAD
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '../../../components/productsData';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailsPage({ params }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <section className="content-card detail-card">
      <p className="eyebrow">Product Details</p>
      <h1>{product.title}</h1>
      <p className="lead compact">{product.description}</p>
      <div className="price-pill">{product.price}</div>
      <div className="page-links">
        <Link href="/products" className="button-secondary">
          Back to Product List
        </Link>
        <Link href="/" className="button-primary">
          Home
        </Link>
      </div>
    </section>
  );
}
=======
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '../../../components/productsData';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailsPage({ params }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <section className="content-card detail-card">
      <p className="eyebrow">Product Details</p>
      <h1>{product.title}</h1>
      <p className="lead compact">{product.description}</p>
      <div className="price-pill">{product.price}</div>
      <div className="page-links">
        <Link href="/products" className="button-secondary">
          Back to Product List
        </Link>
        <Link href="/" className="button-primary">
          Home
        </Link>
      </div>
    </section>
  );
}
>>>>>>> f9253df3f1baf194a3fda381200b9cbe335453ef
