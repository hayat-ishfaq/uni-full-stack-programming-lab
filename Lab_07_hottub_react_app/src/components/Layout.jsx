import TopBar from "./TopBar";
import SiteHeader from "./SiteHeader";
import MainNav from "./MainNav";
import Footer from "./Footer";

function Layout({ cartCount, children }) {
  return (
    <div className="app-shell">
      <TopBar />
      <SiteHeader cartCount={cartCount} />
      <MainNav />
      <main className="container page-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
