const API_BASE = "https://dummyjson.com";

const PRODUCT_FIELDS =
  "id,title,description,category,price,discountPercentage,rating,stock,brand,thumbnail,images";

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  return currencyFormatter.format(value);
}

export function getSalePrice(price, discountPercentage = 0) {
  const discount = Math.max(0, Number(discountPercentage) || 0);
  return Math.max(0, price - (price * discount) / 100);
}

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return response.json();
}

export async function getFeaturedProducts(limit = 8) {
  const data = await fetchJson(
    `/products?limit=${limit}&select=${PRODUCT_FIELDS}`,
  );
  return data.products ?? [];
}

export async function getProduct(id) {
  try {
    const product = await fetchJson(
      `/products/${id}?select=${PRODUCT_FIELDS}`,
    );
    // Ensure product has all required fields
    if (!product || !product.id) {
      console.warn(`Product ${id} not found or missing required fields`);
      return null;
    }
    console.log(`Successfully loaded product ${id}: ${product.title}`);
    return product;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export async function getRelatedProducts(category, limit = 4) {
  const data = await fetchJson(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&select=${PRODUCT_FIELDS}`,
  );
  return data.products ?? [];
}

export async function getCategories() {
  const data = await fetchJson("/products/category-list");
  return Array.isArray(data) ? data : [];
}

export async function getProductsByCategory(category, limit = 8) {
  const data = await fetchJson(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&select=${PRODUCT_FIELDS}`,
  );
  return data.products ?? [];
}

export function buildCartItem(product, quantity = 1) {
  return {
    id: product.id,
    title: product.title,
    price: Number(product.price) || 0,
    discountPercentage: Number(product.discountPercentage) || 0,
    category: product.category,
    brand: product.brand,
    thumbnail: product.thumbnail,
    quantity,
  };
}

export function getLineTotal(item) {
  return getSalePrice(item.price, item.discountPercentage) * item.quantity;
}

export function getLineSavings(item) {
  return ((Number(item.price) || 0) - getSalePrice(item.price, item.discountPercentage)) * item.quantity;
}
