"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/order", label: "Order" },
];

export function StoreHeader() {
  const pathname = usePathname();
  const { itemCount, total } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[rgba(250,245,238,0.9)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#ff8a3d,#ffb65c)] text-lg font-black text-white shadow-[0_18px_40px_rgba(255,138,61,0.35)]">
            F
          </span>
          <span className="leading-tight">
            <span className="block font-[family:var(--font-display)] text-2xl text-stone-950">
              Furnish
            </span>
            <span className="block text-xs uppercase tracking-[0.32em] text-stone-500">
              home store
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-stone-200 bg-white/80 p-1 shadow-sm md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#ff7a1a] text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Current cart</p>
            <p className="text-sm font-semibold text-stone-900">
              {itemCount} item{itemCount === 1 ? "" : "s"} · {total.toFixed(2)}
            </p>
          </div>
          <Link
            href="/cart"
            className="relative inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-5 text-sm font-semibold text-stone-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Cart
            <span className="ml-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ff7a1a] px-2 text-xs font-bold text-white">
              {itemCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
