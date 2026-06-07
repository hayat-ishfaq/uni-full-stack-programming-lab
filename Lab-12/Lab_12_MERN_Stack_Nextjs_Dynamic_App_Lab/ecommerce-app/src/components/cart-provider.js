"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { buildCartItem, getLineSavings, getLineTotal, getSalePrice } from "@/lib/shop";

const CART_STORAGE_KEY = "ecommerce-cart-v1";
const ORDERS_STORAGE_KEY = "ecommerce-orders-v1";
const LAST_ORDER_KEY = "ecommerce-last-order-v1";

const CartContext = createContext(null);

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return { items: action.items };
    case "add": {
      const incoming = action.item;
      const existingItem = state.items.find((item) => item.id === incoming.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === incoming.id
              ? { ...item, quantity: item.quantity + incoming.quantity }
              : item,
          ),
        };
      }

      return {
        items: [...state.items, incoming],
      };
    }
    case "update":
      return {
        items: state.items
          .map((item) =>
            item.id === action.id ? { ...item, quantity: action.quantity } : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "remove":
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };
    case "clear":
      return initialState;
    default:
      return state;
  }
}

function readStorage(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function computeSummary(items) {
  const subtotal = items.reduce((total, item) => total + getLineTotal(item), 0);
  const savings = items.reduce((total, item) => total + getLineSavings(item), 0);
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 18;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    savings,
    shipping,
    tax,
    total,
  };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch({ type: "hydrate", items: readStorage(CART_STORAGE_KEY, []) });
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    writeStorage(CART_STORAGE_KEY, state.items);
  }, [ready, state.items]);

  const cart = useMemo(() => {
    const summary = computeSummary(state.items);
    const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

    return {
      items: state.items,
      itemCount,
      ...summary,
    };
  }, [state.items]);

  const actions = useMemo(() => {
    return {
      addItem(product, quantity = 1) {
        dispatch({ type: "add", item: buildCartItem(product, quantity) });
      },
      updateQuantity(id, quantity) {
        dispatch({ type: "update", id, quantity: Math.max(0, Number(quantity) || 0) });
      },
      removeItem(id) {
        dispatch({ type: "remove", id });
      },
      clearCart() {
        dispatch({ type: "clear" });
      },
      saveOrder(order) {
        const orders = readStorage(ORDERS_STORAGE_KEY, []);
        const nextOrders = [order, ...orders];
        writeStorage(ORDERS_STORAGE_KEY, nextOrders);
        writeStorage(LAST_ORDER_KEY, order);
        return order;
      },
      getLastOrder() {
        return readStorage(LAST_ORDER_KEY, null);
      },
      getOrders() {
        return readStorage(ORDERS_STORAGE_KEY, []);
      },
      salePrice(price, discountPercentage) {
        return getSalePrice(price, discountPercentage);
      },
    };
  }, []);

  const value = useMemo(
    () => ({
      ...cart,
      ...actions,
    }),
    [actions, cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return value;
}
