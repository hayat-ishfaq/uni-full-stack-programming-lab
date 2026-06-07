import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { StoreHeader } from "@/components/store-header";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "Furnish Home Store",
  description: "A warm modern ecommerce storefront with mock cart and checkout flow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <CartProvider>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,178,101,0.26),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_26%),linear-gradient(180deg,#fff9f2_0%,#f6eee4_35%,#f9f6f1_100%)]">
            <StoreHeader />
            <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
