<<<<<<< HEAD
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Lab Task 01 - Next.js Multi-Page App',
  description: 'A simple multi-page Next.js application with shared navigation and footer.',
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
  title: 'Lab Task 01 - Next.js Multi-Page App',
  description: 'A simple multi-page Next.js application with shared navigation and footer.',
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
