import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { formatCurrency, getCategories, getFeaturedProducts, getSalePrice } from "@/lib/shop";

const categoryHighlights = [
  "statement beds",
  "lounge chairs",
  "coffee tables",
  "storage",
];

export default async function Home() {
  const [products, categories] = await Promise.all([getFeaturedProducts(8), getCategories()]);
  const hero = products[0];
  const featured = products.slice(1, 8);

  console.log("Homepage products loaded:", products.map(p => ({ id: p.id, title: p.title })));

  if (!hero) {
    return (
      <div className="rounded-4xl border border-stone-200 bg-white p-12 text-center shadow-sm">
        <p className="section-label">Store unavailable</p>
        <h1 className="mt-4 text-4xl font-semibold text-stone-950">No products were returned by the mock API.</h1>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-6">
      <section className="overflow-hidden rounded-[36px] border border-stone-200 bg-[linear-gradient(135deg,#fffdf9_0%,#f5ece0_55%,#f8f1e8_100%)] shadow-[0_28px_80px_rgba(73,47,21,0.12)]">
        <div className="grid gap-10 px-6 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6">
              <p className="section-label">Modern furniture store</p>
              <h1 className="max-w-xl font-(--font-display) text-6xl leading-[0.95] text-stone-950 sm:text-7xl">
                Warm interiors, curated pieces, and a mock checkout flow that feels real.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-stone-600 sm:text-xl">
                Browse mock products from DummyJSON, inspect every detail, add them to cart, place a sample order, and land on a polished confirmation page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/products/${hero.id}`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff7a1a] px-6 text-sm font-semibold text-white transition hover:bg-[#e56a00] shadow-md"
              >
                Explore hero piece
              </Link>
              <Link
                href="/checkout"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[#ff7a1a] bg-white px-6 text-sm font-semibold text-[#ff7a1a] transition hover:bg-[#fff5eb]"
              >
                Mock checkout
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Inventory", `${products.length}+ live items`],
                ["Cart flow", "Persistent local cart"],
                ["Orders", "Mock history saved locally"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-stone-500">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-stone-950">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="hero-shadow overflow-hidden rounded-4xl border border-stone-200 bg-white">
              <div className="relative aspect-4/3 bg-[#f2eadf]">
                <img src={hero.thumbnail} alt={hero.title} className="h-full w-full object-cover" />
                <div className="absolute left-5 top-5 rounded-full bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  {Math.round(hero.discountPercentage)}% off
                </div>
                <div className="absolute bottom-5 left-5 rounded-3xl bg-white/92 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Featured now</p>
                  <p className="mt-2 max-w-xs font-(--font-display) text-3xl text-stone-950">
                    {hero.title}
                  </p>
                  <p className="mt-2 text-sm text-stone-600">{hero.brand}</p>
                </div>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div>
                  <p className="section-label">Current price</p>
                  <p className="mt-2 text-4xl font-semibold text-stone-950">
                    {formatCurrency(getSalePrice(hero.price, hero.discountPercentage))}
                  </p>
                  <p className="text-sm text-stone-500 line-through">{formatCurrency(hero.price)}</p>
                </div>
                <div className="rounded-3xl bg-[#ff7a1a] p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/80">Why it works</p>
                  <p className="mt-3 text-sm leading-6 text-white">
                    Clean product cards, quick cart actions, and a no-fuss order flow keep the experience focused on the catalog.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {categories.slice(0, 3).map((category, index) => (
                <div key={category} className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Category</p>
                  <p className="mt-3 font-(--font-display) text-3xl text-stone-950">{category}</p>
                  <p className="mt-2 text-sm text-stone-600">
                    {categoryHighlights[index] ?? "balanced pieces for daily living"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5 rounded-4xl border border-stone-200 bg-white px-5 py-6 shadow-sm sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Collections</p>
            <h2 className="mt-2 font-(--font-display) text-4xl text-stone-950 sm:text-5xl">
              Latest arrivals and everyday staples.
            </h2>
          </div>
          <Link href="/cart" className="text-sm font-semibold text-[#ff7a1a]">
            Jump to cart
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-4xl border border-stone-200 bg-[linear-gradient(180deg,#fff9f2_0%,#f4e8d9_100%)] p-6 shadow-sm sm:p-8">
          <p className="section-label">Latest updates</p>
          <h3 className="mt-2 font-(--font-display) text-4xl text-stone-950">
            A store layout tuned for comparison, pricing, and confident buying.
          </h3>
          <p className="mt-4 max-w-lg text-base leading-7 text-stone-600">
            Browse the product details page for imagery, pricing, stock, and related items. Then move through cart, checkout, and order confirmation without leaving the app.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Pricing</p>
              <p className="mt-2 text-2xl font-semibold text-stone-950">Sale math is calculated from the API discount percentage.</p>
            </div>
            <div className="rounded-3xl bg-[#ff7a1a] p-5 text-white shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-white/80">Cart</p>
              <p className="mt-2 text-2xl font-semibold text-white">Item counts, quantity changes, and totals persist locally.</p>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="section-label">Design system</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group overflow-hidden rounded-[28px] border border-stone-200 bg-stone-50 transition hover:-translate-y-1 hover:bg-white"
              >
                <div className="aspect-4/3 overflow-hidden bg-[#f5ede2]">
                  <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-stone-500">{product.category}</p>
                  <p className="mt-2 text-xl font-semibold text-stone-950">{product.title}</p>
                  <p className="mt-2 text-sm text-stone-600">{formatCurrency(getSalePrice(product.price, product.discountPercentage))}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
