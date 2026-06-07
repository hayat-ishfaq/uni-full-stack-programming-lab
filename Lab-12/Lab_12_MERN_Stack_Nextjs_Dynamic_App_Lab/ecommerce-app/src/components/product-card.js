import Link from "next/link";
import { formatCurrency, getSalePrice } from "@/lib/shop";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function ProductCard({ product, compact = false }) {
  const salePrice = getSalePrice(product.price, product.discountPercentage);

  return (
    <article
      className={`group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_18px_48px_rgba(56,44,29,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(56,44,29,0.14)] ${
        compact ? "" : "h-full"
      }`}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f6efe7]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-stone-700">
            {product.category}
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/products/${product.id}`} className="font-[family:var(--font-display)] text-2xl text-stone-950 transition group-hover:text-[#ff7a1a]">
              {product.title}
            </Link>
            <p className="mt-1 text-sm uppercase tracking-[0.24em] text-stone-500">
              {product.brand}
            </p>
          </div>
          <div className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
            {product.rating?.toFixed?.(1) ?? "4.8"} rating
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-stone-600">{product.description}</p>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-stone-500 line-through">
              {formatCurrency(product.price)}
            </p>
            <p className="text-2xl font-semibold text-stone-950">
              {formatCurrency(salePrice)}
            </p>
          </div>
          <AddToCartButton product={product} label="Add" />
        </div>
      </div>
    </article>
  );
}
