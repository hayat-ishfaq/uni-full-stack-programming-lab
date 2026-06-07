"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { formatCurrency, getSalePrice } from "@/lib/shop";

export default function OrderPlacedPage() {
  const searchParams = useSearchParams();
  const { getLastOrder } = useCart();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(getLastOrder());
  }, [getLastOrder]);

  return (
    <div className="space-y-8 pb-6">
      <section className="overflow-hidden rounded-[36px] border border-stone-200 bg-[linear-gradient(135deg,#1f1712_0%,#3b2818_100%)] p-8 text-white shadow-[0_24px_70px_rgba(22,14,8,0.3)] sm:p-10">
        <p className="section-label text-white/50">Order placed</p>
        <h1 className="mt-3 font-(--font-display) text-6xl text-white">Your mock order is confirmed.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
          The checkout flow wrote a sample order into local storage and moved you to a polished confirmation view.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Order ID", order?.orderNumber ?? searchParams.get("order") ?? "PENDING"],
            ["Status", "Confirmed"],
            ["Payment", "Mock card authorized"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">{label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-stone-950">
            Continue shopping
          </Link>
          <Link href="/order" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white">
            View order history
          </Link>
        </div>
      </section>

      {order ? (
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="section-label">Purchased items</p>
            <div className="mt-6 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <div>
                    <p className="font-semibold text-stone-950">{item.title}</p>
                    <p className="text-sm text-stone-600">Qty {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-stone-950">
                    {formatCurrency(getSalePrice(item.price, item.discountPercentage) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="section-label">Shipping summary</p>
            <div className="mt-6 space-y-3 text-sm text-stone-600">
              <p><span className="font-semibold text-stone-950">Customer:</span> {order.customer.fullName}</p>
              <p><span className="font-semibold text-stone-950">Email:</span> {order.customer.email}</p>
              <p><span className="font-semibold text-stone-950">Address:</span> {order.customer.address}</p>
              <p><span className="font-semibold text-stone-950">City:</span> {order.customer.city}</p>
              <p><span className="font-semibold text-stone-950">Country:</span> {order.customer.country}</p>
            </div>

            <div className="mt-8 rounded-[28px] border-2 border-[#ff7a1a] bg-white p-5 shadow-md">
              <div className="flex items-center justify-between text-stone-600">
                <span className="font-semibold">Total paid</span>
                <span className="text-lg font-semibold text-[#ff7a1a]">{formatCurrency(order.totals.total)}</span>
              </div>
              <div className="mt-2 text-3xl font-semibold text-stone-950">Thanks for shopping with us.</div>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-4xl border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-stone-600">No saved order was found. Use checkout to generate one.</p>
        </section>
      )}
    </div>
  );
}
