"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency, getSalePrice } from "@/lib/shop";

export default function OrderPage() {
  const { getOrders } = useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, [getOrders]);

  const latest = orders[0];

  return (
    <div className="space-y-8 pb-6">
      <section className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="section-label">Orders</p>
        <h1 className="mt-2 font-[family:var(--font-display)] text-5xl text-stone-950">Mock order history.</h1>
        {latest ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[28px] border-2 border-[#ff7a1a] bg-white p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[#ff7a1a] font-semibold">Latest order</p>
              <p className="mt-3 text-4xl font-semibold text-white">{latest.orderNumber}</p>
              <p className="mt-2 text-sm text-white/70">Placed on {new Date(latest.placedAt).toLocaleString()}</p>
              <p className="mt-6 text-sm text-white/70">{latest.customer.fullName}</p>
              <p className="text-sm text-white/70">{latest.customer.address}, {latest.customer.city}</p>
            </div>

            <div className="space-y-3">
              {latest.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-[24px] border border-stone-200 bg-stone-50 p-4">
                  <div>
                    <p className="font-semibold text-stone-950">{item.title}</p>
                    <p className="text-sm text-stone-600">Qty {item.quantity} · {formatCurrency(getSalePrice(item.price, item.discountPercentage))}</p>
                  </div>
                  <p className="font-semibold text-stone-950">{formatCurrency(getSalePrice(item.price, item.discountPercentage) * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-[28px] border border-dashed border-stone-300 p-10 text-center">
            <p className="text-lg text-stone-600">No mock orders yet. Place one from checkout to populate this page.</p>
            <Link href="/checkout" className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white">
              Go to checkout
            </Link>
          </div>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Processing", "Mock queue status"],
          ["Delivered", "Confirmed on success page"],
          ["History", `${orders.length} stored order${orders.length === 1 ? "" : "s"}`],
        ].map(([title, detail]) => (
          <div key={title} className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">{title}</p>
            <p className="mt-2 text-lg font-semibold text-stone-950">{detail}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
