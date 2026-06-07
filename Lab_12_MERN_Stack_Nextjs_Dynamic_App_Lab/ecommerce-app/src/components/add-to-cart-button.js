"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({ product, quantity = 1, className = "", label = "Add to cart" }) {
  const [pending, setPending] = useState(false);
  const { addItem } = useCart();

  function handleAdd() {
    setPending(true);
    addItem(product, quantity);
    window.setTimeout(() => setPending(false), 250);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`inline-flex items-center justify-center rounded-full bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#e56a00] ${className}`}
    >
      {pending ? "Added" : label}
    </button>
  );
}
