import { Link } from "react-router-dom";

function CartPage({ cartItems, onRemove, onQtyChange }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section>
      <div className="section-header">
        <h2>Shopping Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="panel">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn primary">Go to Products</Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <article key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <small>${item.price} each</small>
                </div>
                <div className="cart-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => onQtyChange(item.id, Number(event.target.value))}
                  />
                  <button type="button" onClick={() => onRemove(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>

          <div className="summary-box">
            <p>Total Items: {cartItems.reduce((n, item) => n + item.quantity, 0)}</p>
            <h3>Total: ${subtotal}</h3>
            <Link to="/payment" className="btn primary">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
