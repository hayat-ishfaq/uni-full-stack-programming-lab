function ForgotPasswordPage() {
  return (
    <section>
      <div className="section-header"><h2>Forget Your Password</h2></div>
      <form className="panel form-grid narrow" onSubmit={(event) => event.preventDefault()}>
        <p>Please enter your email address below to retrieve your password.</p>
        <input type="email" placeholder="Email" required />
        <label className="check-row"><input type="checkbox" /> Remember me next time</label>
        <button className="btn primary" type="submit">Submit</button>
      </form>
    </section>
  );
}

export default ForgotPasswordPage;
