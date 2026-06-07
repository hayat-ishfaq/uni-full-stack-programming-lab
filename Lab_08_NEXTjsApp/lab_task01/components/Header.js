<<<<<<< HEAD
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div>
        <p className="site-kicker">Lab Task 01</p>
        <h2 className="site-title">Next.js Multi-Page App</h2>
      </div>
      <nav aria-label="Primary navigation" className="nav-links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
=======
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div>
        <p className="site-kicker">Lab Task 01</p>
        <h2 className="site-title">Next.js Multi-Page App</h2>
      </div>
      <nav aria-label="Primary navigation" className="nav-links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
>>>>>>> f9253df3f1baf194a3fda381200b9cbe335453ef
