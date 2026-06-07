"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatCurrency, getSalePrice } from "@/lib/shop";

const emptyForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  country: "",
  cardNumber: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, tax, total, clearCart, saveOrder } = useCart();
  const [form, setForm] = useState(emptyForm);

  const itemTotal = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (items.length === 0) {
      router.push("/");
      return;
    }

    const orderNumber = `FN-${Date.now().toString().slice(-6)}`;
    const order = {
      orderNumber,
      placedAt: new Date().toISOString(),
      customer: form,
      items,
      totals: { subtotal, shipping, tax, total },
    };

    saveOrder(order);
    clearCart();
    router.push(`/order/placed?order=${orderNumber}`);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-4xl border border-stone-200 bg-white p-10 text-center shadow-sm">
        <p className="section-label">Checkout</p>
        <h1 className="mt-4 font-(--font-display) text-5xl text-stone-950">Your cart is empty.</h1>
        <Link href="/" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-semibold text-white">
          Back to store
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-6">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={handleSubmit} className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="section-label">Checkout</p>
          <h1 className="mt-2 font-(--font-display) text-5xl text-stone-950">Enter mock shipping details.</h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["fullName", "Full name"],
              ["email", "Email"],
              ["address", "Address"],
              ["city", "City"],
              ["zip", "ZIP code"],
              ["country", "Country"],
              ["cardNumber", "Card number"],
            ].map(([name, label]) => (
              <label key={name} className={name === "address" || name === "cardNumber" ? "sm:col-span-2" : ""}>
                <span className="mb-2 block text-sm font-semibold text-stone-700">{label}</span>
                <input
                  required
                  name={name}
                  value={form[name]}
                  onChange={updateField}
                  placeholder={label}
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-[#ff7a1a]"
                />
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#e56a00]"
          >
            Place mock order
          </button>
        </form>

        <aside className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="section-label">Review</p>
          <h2 className="mt-2 font-(--font-display) text-4xl text-stone-950">{itemTotal} item{itemTotal === 1 ? "" : "s"} ready for order.</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-4">
                <div>
                  <p className="font-semibold text-stone-950">{item.title}</p>
                  <p className="text-sm text-stone-600">
                    Qty {item.quantity} · {formatCurrency(getSalePrice(item.price, item.discountPercentage))}
                  </p>
                </div>
                <p className="font-semibold text-stone-950">
                  {formatCurrency(getSalePrice(item.price, item.discountPercentage) * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 rounded-[28px] border-2 border-[#ff7a1a] bg-white p-5 text-stone-950">
            <div className="flex items-center justify-between text-stone-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-3xl font-semibold text-white">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
