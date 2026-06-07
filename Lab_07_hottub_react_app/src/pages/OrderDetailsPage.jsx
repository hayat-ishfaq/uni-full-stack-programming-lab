function OrderDetailsPage() {
  return (
    <section>
      <div className="section-header">
        <h2>Order Details</h2>
      </div>
      <div className="panel">
        <p>Order #304 was placed on March 30, 2026 and is currently on hold.</p>
        <table className="details-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Five person hot tub spa with green light inside</td>
              <td>1</td>
              <td>$699.00</td>
            </tr>
            <tr>
              <td>Island Series premium hydro tub</td>
              <td>1</td>
              <td>$699.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OrderDetailsPage;
