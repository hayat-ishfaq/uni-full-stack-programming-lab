import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link className="btn primary" to="/">Go back home</Link>
    </section>
  );
}

export default NotFoundPage;
