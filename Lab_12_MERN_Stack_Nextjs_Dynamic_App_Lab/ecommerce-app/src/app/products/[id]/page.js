import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { PurchasePanel } from "@/components/purchase-panel";
import { formatCurrency, getProduct, getRelatedProducts, getSalePrice } from "@/lib/shop";

function InfoChip({ label, value }) {
  return (
    <div className="rounded-[22px] border border-stone-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.26em] text-stone-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-stone-950">{value}</p>
    </div>
  );
}

export default async function ProductDetailsPage({ params: paramsPromise }) {
  const params = await paramsPromise;
  let product = null;

  try {
    console.log("Fetching product with ID:", params.id);
    product = await getProduct(params.id);
    console.log("Product data:", product ? `Loaded ${product.title}` : "No product found");
  } catch (error) {
    console.error("Error fetching product:", error);
    product = null;
  }

  if (!product) {
    return (
      <div className="space-y-8 pb-6">
        <div className="rounded-4xl border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="section-label">Not found</p>
          <h1 className="mt-4 font-(--font-display) text-5xl text-stone-950">This product is unavailable.</h1>
          <p className="mt-3 text-stone-600">Product ID: {String(params.id)}</p>
          <Link href="/" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white shadow-md hover:bg-[#e56a00]">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const related = await getRelatedProducts(product.category, 4).catch(() => []);
  const salePrice = getSalePrice(product.price, product.discountPercentage);

  return (
    <div className="space-y-8 pb-6">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-[36px] border border-stone-200 bg-white shadow-sm">
          <div className="relative aspect-5/4 bg-[#f4eadf]">
            <img src={product.images?.[0] ?? product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
            <div className="absolute left-5 top-5 rounded-full bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white">
              {Math.round(product.discountPercentage)}% off
            </div>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-3">
            {(product.images ?? [product.thumbnail]).slice(0, 3).map((src, index) => (
              <div key={`${src}-${index}`} className="aspect-4/3 overflow-hidden rounded-3xl bg-stone-100">
                <img src={src} alt={`${product.title} ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[36px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="section-label">Product details</p>
            <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="max-w-xl font-(--font-display) text-5xl leading-none text-stone-950 sm:text-6xl">
                  {product.title}
                </h1>
                <p className="mt-3 text-sm uppercase tracking-[0.28em] text-stone-500">
                  {product.brand} · {product.category}
                </p>
              </div>
              <div className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">
                {product.rating?.toFixed(1)} rating
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-stone-500">Price</p>
                <p className="mt-2 text-5xl font-semibold text-stone-950">
                  {formatCurrency(salePrice)}
                </p>
              </div>
              <p className="text-lg text-stone-500 line-through">{formatCurrency(product.price)}</p>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              {product.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <InfoChip label="Stock" value={`${product.stock} units`} />
              <InfoChip label="Shipping" value={product.shippingInformation} />
              <InfoChip label="Return policy" value={product.returnPolicy} />
            </div>
          </div>

          <PurchasePanel product={product} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="section-label">Quick facts</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
            <p><span className="font-semibold text-stone-950">Category:</span> {product.category}</p>
            <p><span className="font-semibold text-stone-950">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold text-stone-950">SKU:</span> {product.sku}</p>
            <p><span className="font-semibold text-stone-950">Availability:</span> {product.availabilityStatus}</p>
            <p><span className="font-semibold text-stone-950">Warranty:</span> {product.warrantyInformation}</p>
          </div>
        </div>

        <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Related</p>
              <h2 className="mt-2 font-(--font-display) text-4xl text-stone-950">More from this category</h2>
            </div>
            <Link href="/" className="text-sm font-semibold text-[#ff7a1a]">Back to homepage</Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {related.filter((item) => item.id !== product.id).slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
