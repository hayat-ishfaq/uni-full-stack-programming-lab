import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <section>
      <div className="section-header"><h2>Login or Create Account</h2></div>
      <div className="two-col">
        <form className="panel form-grid" onSubmit={(event) => event.preventDefault()}>
          <h3>User Login Details</h3>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <label className="check-row"><input type="checkbox" /> Remember me</label>
          <button className="btn primary" type="submit">Sign In</button>
          <Link to="/forgot-password">Forgot your password?</Link>
        </form>
        <div className="panel">
          <h3>New Customer</h3>
          <ul className="simple-list">
            <li>Shop faster and receive updates</li>
            <li>Check order status</li>
            <li>Track delivery status</li>
            <li>Manage your address book</li>
          </ul>
          <button type="button" className="btn primary">Create New Account</button>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
