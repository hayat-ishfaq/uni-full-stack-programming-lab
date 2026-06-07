import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" },
  { to: "/payment", label: "Checkout" },
  { to: "/terms", label: "Terms" }
];

function MainNav() {
  return (
    <nav className="main-nav">
      <div className="container row-between">
        <div className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
