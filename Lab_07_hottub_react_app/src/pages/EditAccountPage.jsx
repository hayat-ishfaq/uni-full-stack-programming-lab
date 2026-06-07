function EditAccountPage() {
  return (
    <section>
      <div className="section-header"><h2>Edit Profile Details</h2></div>
      <form className="panel form-grid" onSubmit={(event) => event.preventDefault()}>
        <input placeholder="First name" required />
        <input placeholder="Last name" required />
        <input placeholder="Email" type="email" required />
        <input placeholder="Current password" type="password" required />
        <input placeholder="New password" type="password" required />
        <input placeholder="Confirm password" type="password" required />
        <button className="btn primary" type="submit">Update Details</button>
      </form>
    </section>
  );
}

export default EditAccountPage;
