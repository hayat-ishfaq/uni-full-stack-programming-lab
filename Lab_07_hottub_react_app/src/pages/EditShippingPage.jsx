function EditShippingPage() {
  return (
    <section>
      <div className="section-header"><h2>Edit Shipping Address</h2></div>
      <form className="panel form-grid" onSubmit={(event) => event.preventDefault()}>
        <input placeholder="First name" required />
        <input placeholder="Last name" required />
        <input placeholder="Email" type="email" required />
        <input placeholder="Phone" required />
        <input placeholder="Address" required />
        <input placeholder="City" required />
        <input placeholder="State" required />
        <input placeholder="Zip code" required />
        <button className="btn primary" type="submit">Save Shipping Address</button>
      </form>
    </section>
  );
}

export default EditShippingPage;
