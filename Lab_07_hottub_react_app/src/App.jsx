import { Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
import Layout from "./components/Layout";
import { products } from "./data/products";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import TermsPage from "./pages/TermsPage";
import EditAccountPage from "./pages/EditAccountPage";
import EditBillingPage from "./pages/EditBillingPage";
import EditShippingPage from "./pages/EditShippingPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity || 1) } : item))
    );
  };

  const page = (element) => <Layout cartCount={cartCount}>{element}</Layout>;

  return (
    <Routes>
      <Route path="/" element={page(<HomePage products={products} onAddToCart={addToCart} />)} />
      <Route path="/products" element={page(<ProductsPage products={products} onAddToCart={addToCart} />)} />
      <Route
        path="/cart"
        element={page(
          <CartPage cartItems={cartItems} onRemove={removeFromCart} onQtyChange={updateQty} />
        )}
      />
      <Route path="/payment" element={page(<PaymentPage cartItems={cartItems} />)} />
      <Route path="/order-summary" element={page(<OrderSummaryPage />)} />
      <Route path="/order-details" element={page(<OrderDetailsPage />)} />
      <Route path="/terms" element={page(<TermsPage />)} />
      <Route path="/edit-account" element={page(<EditAccountPage />)} />
      <Route path="/edit-billing" element={page(<EditBillingPage />)} />
      <Route path="/edit-shipping" element={page(<EditShippingPage />)} />
      <Route path="/login" element={page(<LoginPage />)} />
      <Route path="/forgot-password" element={page(<ForgotPasswordPage />)} />
      <Route path="*" element={page(<NotFoundPage />)} />
    </Routes>
  );
}

export default App;
