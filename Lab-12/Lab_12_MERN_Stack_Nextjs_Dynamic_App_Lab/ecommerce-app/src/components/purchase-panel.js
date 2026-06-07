"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { QuantityStepper } from "@/components/quantity-stepper";
import { formatCurrency } from "@/lib/shop";

export function PurchasePanel({ product }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addItem, salePrice } = useCart();

  const discounted = salePrice(product.price, product.discountPercentage);

  function handleBuyNow() {
    addItem(product, quantity);
    router.push("/checkout");
  }

  return (
    <div className="rounded-[28px] border-2 border-[#ff7a1a] bg-white p-6 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-label text-[#ff7a1a] font-semibold">Purchase</p>
          <p className="mt-2 text-3xl font-semibold text-stone-950">
            {formatCurrency(discounted)}
          </p>
          <p className="mt-1 text-sm text-stone-500 line-through">
            {formatCurrency(product.price)}
          </p>
        </div>
        <div className="rounded-full bg-orange-50 px-4 py-2 text-right text-xs uppercase tracking-[0.28em] text-[#ff7a1a] font-semibold border border-[#ff7a1a]/20">
          {product.stock} in stock
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <button
          type="button"
          onClick={() => addItem(product, quantity)}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#e56a00]"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#ff7a1a] px-5 text-sm font-semibold text-[#ff7a1a] transition hover:bg-orange-50"
        >
          Checkout now
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-stone-600">
        <div className="rounded-2xl bg-orange-50 px-3 py-3 border border-orange-100">Free mock shipping</div>
        <div className="rounded-2xl bg-orange-50 px-3 py-3 border border-orange-100">Easy returns</div>
        <div className="rounded-2xl bg-orange-50 px-3 py-3 border border-orange-100">Safe checkout</div>
      </div>
    </div>
  );
}
