"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useStoreState } from './StoreContext';

const CartContext = createContext<any>(null);

const STORAGE_KEYS = {
  cart: 'bi_cart',
  wishlist: 'bi_wishlist',
  recentlyViewed: 'bi_recently_viewed',
};

function readStorage(key: string, fallback: any) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function makeToast(message: string) {
  return { id: Date.now(), message };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { allProductsById } = useStoreState();
  
  // Hydration fix: Start with empty arrays to match SSR
  const [items, setItems] = useState<any[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<any>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Hydration fix: Read from localStorage only after mount on the client
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStorage(STORAGE_KEYS.cart, []));
    setWishlistIds(readStorage(STORAGE_KEYS.wishlist, []));
    setRecentlyViewedIds(readStorage(STORAGE_KEYS.recentlyViewed, []));
    setIsInitialized(true);
  }, []);

  // Persist cart
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // Persist wishlist
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlistIds));
    }
  }, [wishlistIds, isInitialized]);

  // Persist recently viewed
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(recentlyViewedIds));
    }
  }, [recentlyViewedIds, isInitialized]);

  const showToast = useCallback((message: string) => {
    const nextToast = makeToast(message);
    setToast(nextToast);
    window.clearTimeout(toastTimeoutRef.current ?? undefined);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((current: any) => (current?.id === nextToast.id ? null : current));
    }, 2400);
  }, []);

  const addItem = useCallback((product: any) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    showToast(`${product.name} is now living in your cart.`);
    setIsCartOpen(true);
  }, [showToast]);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    if (isInitialized) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    }
  }, [isInitialized]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds((current) => {
      const exists = current.includes(productId);
      const next = exists ? current.filter((id) => id !== productId) : [productId, ...current];
      showToast(
        exists
          ? 'Removed from wishlist. Brutal, but fair.'
          : `${allProductsById?.[productId]?.name ?? 'Item'} saved for later.`,
      );
      return next;
    });
  }, [allProductsById, showToast]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewedIds((current) =>
      [productId, ...current.filter((id) => id !== productId)].slice(0, 8),
    );
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const wishlistItems = wishlistIds.map((id) => allProductsById?.[id]).filter(Boolean);
  const recentlyViewed = recentlyViewedIds.map((id) => allProductsById?.[id]).filter(Boolean);

  const value = useMemo(
    () => ({
      addItem,
      addRecentlyViewed,
      clearCart,
      isCartOpen,
      itemCount,
      items,
      recentlyViewed,
      removeItem,
      setIsCartOpen,
      subtotal,
      toast,
      toggleWishlist,
      updateQuantity,
      wishlistIds,
      wishlistItems,
      isInitialized,
    }),
    [
      addItem,
      addRecentlyViewed,
      clearCart,
      isCartOpen,
      itemCount,
      items,
      recentlyViewed,
      removeItem,
      subtotal,
      toast,
      toggleWishlist,
      updateQuantity,
      wishlistIds,
      wishlistItems,
      isInitialized
    ],
  );

  useEffect(
    () => () => {
      window.clearTimeout(toastTimeoutRef.current ?? undefined);
    },
    [],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
