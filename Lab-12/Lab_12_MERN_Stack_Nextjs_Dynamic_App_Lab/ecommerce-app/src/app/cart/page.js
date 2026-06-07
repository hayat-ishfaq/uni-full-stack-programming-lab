"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { QuantityStepper } from "@/components/quantity-stepper";
import { formatCurrency, getSalePrice } from "@/lib/shop";

export default function CartPage() {
  const { items, itemCount, subtotal, savings, shipping, tax, total, updateQuantity, removeItem } = useCart();

  return (
    <div className="space-y-8 pb-6">
      <section className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Cart</p>
            <h1 className="mt-2 font-(--font-display) text-5xl text-stone-950">
              {itemCount} item{itemCount === 1 ? "" : "s"} in your basket.
            </h1>
          </div>
          <Link href="/checkout" className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white shadow-md hover:bg-[#e56a00]">
            Go to checkout
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-dashed border-stone-300 p-10 text-center">
            <p className="text-lg text-stone-600">Your cart is empty. Start with the homepage featured products.</p>
            <Link href="/" className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {items.map((item) => {
                const salePrice = getSalePrice(item.price, item.discountPercentage);

                return (
                  <article key={item.id} className="flex flex-col gap-4 rounded-[28px] border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:items-center">
                    <div className="h-28 w-full overflow-hidden rounded-[22px] bg-white sm:h-24 sm:w-24 sm:flex-none">
                      <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{item.category}</p>
                      <h2 className="mt-1 text-xl font-semibold text-stone-950">{item.title}</h2>
                      <p className="mt-1 text-sm text-stone-600">{item.brand}</p>
                      <p className="mt-2 text-sm text-stone-500">
                        {formatCurrency(salePrice)} each · {formatCurrency(item.price)} original
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <QuantityStepper value={item.quantity} onChange={(value) => updateQuantity(item.id, value)} />
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:border-stone-950"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="rounded-4xl border border-stone-200 bg-white p-6 shadow-sm h-fit">
              <p className="section-label">Order summary</p>
              <div className="mt-6 space-y-4 text-sm text-stone-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-950">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Savings</span>
                  <span className="font-semibold text-[#ff7a1a]">-{formatCurrency(savings)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-stone-950">{formatCurrency(shipping)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span className="font-semibold text-stone-950">{formatCurrency(tax)}</span>
                </div>
                <div className="border-t border-stone-200 pt-4 flex items-center justify-between text-lg">
                  <span className="font-semibold text-stone-950">Total</span>
                  <span className="font-(--font-display) text-4xl text-stone-950">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <Link href="/checkout" className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white shadow-md hover:bg-[#e56a00]">
                  Proceed to checkout
                </Link>
                <Link href="/order" className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#ff7a1a] bg-white px-6 text-sm font-semibold text-[#ff7a1a] hover:bg-[#fff5eb]">
                  View mock order page
                </Link>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
