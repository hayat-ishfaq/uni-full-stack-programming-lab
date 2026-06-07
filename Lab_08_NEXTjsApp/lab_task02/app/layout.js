<<<<<<< HEAD
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Lab Task 02 - Dynamic Product App',
  description: 'A Next.js app with a product list, dynamic routing, and shared navigation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
=======
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Lab Task 02 - Dynamic Product App',
  description: 'A Next.js app with a product list, dynamic routing, and shared navigation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
>>>>>>> f9253df3f1baf194a3fda381200b9cbe335453ef
