import { Link } from "react-router-dom";

function OrderSummaryPage() {
  return (
    <section>
      <div className="section-header">
        <h2>Order Summary</h2>
      </div>
      <div className="panel">
        <p className="success">Thank you. Your order has been received.</p>
        <p><strong>Order #:</strong> 0303</p>
        <p><strong>Date:</strong> March 31, 2026</p>
        <p><strong>Payment Method:</strong> Direct Bank Transfer</p>
        <p><strong>Total:</strong> $2,500</p>
        <div className="hero-actions">
          <Link to="/order-details" className="btn primary">View Order Details</Link>
          <Link to="/products" className="btn">Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
}

export default OrderSummaryPage;
