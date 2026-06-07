import { Link } from "react-router-dom";

function PaymentPage({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section>
      <div className="section-header">
        <h2>Secure Checkout</h2>
      </div>

      <div className="two-col">
        <form className="panel form-grid" onSubmit={(event) => event.preventDefault()}>
          <h3>Step 1. Billing Address</h3>
          <input placeholder="First name" required />
          <input placeholder="Last name" required />
          <input placeholder="Email" type="email" required />
          <input placeholder="Phone" required />
          <input placeholder="Address" required />
          <input placeholder="City" required />
          <input placeholder="State" required />
          <input placeholder="Zip code" required />
        </form>

        <div className="panel">
          <h3>Step 2. Payment Details</h3>
          <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
            <input placeholder="Card holder" required />
            <input placeholder="Card number" required />
            <input placeholder="MM/YY" required />
            <input placeholder="CVV" required />
          </form>

          <h3 className="mt">Step 3. Review</h3>
          {cartItems.length === 0 ? <p>No cart items yet.</p> : null}
          <ul className="simple-list">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="total">Total with shipping: ${total}</p>
          <div className="hero-actions">
            <Link className="btn primary" to="/order-summary">Place Order</Link>
            <Link className="btn" to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentPage;
