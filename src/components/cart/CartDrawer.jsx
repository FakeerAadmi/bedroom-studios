// @ts-nocheck
/**
 * CLIENT COMPONENT
 * Reason: Uses `framer-motion`, `useState`, and `useCart` context for interactive drawer management.
 */
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils';

export default function CartDrawer() {
  const {
    isCartOpen,
    items,
    recentlyViewed,
    removeItem,
    setIsCartOpen,
    subtotal,
    updateQuantity,
    wishlistItems,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-ink bg-paper"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <p className="font-display text-xl font-bold">Your stash</p>
                <p className="text-sm text-ink/60">No impulse control detected.</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} aria-label="Close cart" className="rounded-full border border-ink p-2">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-ink/25 bg-white/50 p-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/5">
                    <ShoppingBag className="h-6 w-6 text-ink/40" />
                  </div>
                  <p className="mt-4 font-display text-lg font-bold">Your cart is empty</p>
                  <p className="mt-2 text-sm text-ink/60 max-w-[14rem]">Fix that. Respectfully. The printer needs something to do.</p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 rounded-full border border-ink px-5 py-2.5 text-sm font-medium transition hover:bg-ink hover:text-paper"
                  >
                    Start browsing
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="rounded-[2rem] border border-ink p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-lg font-semibold">{item.name}</p>
                        <p className="text-sm text-ink/60">{formatPrice(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-ink/60 transition hover:text-ink"
                      >
                        Dump it
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-ink">
                        <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity" className="p-2">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity" className="p-2">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))
              )}

              {wishlistItems.length > 0 ? (
                <div className="rounded-[2rem] border border-ink/10 bg-[#fff6f8] p-5">
                  <p className="font-display text-lg font-semibold">Saved for later</p>
                  <div className="mt-3 space-y-2 text-sm text-ink/65">
                    {wishlistItems.slice(0, 3).map((item) => (
                      <p key={item.id}>{item.name}</p>
                    ))}
                  </div>
                  <Link href="/wishlist" onClick={() => setIsCartOpen(false)} className="mt-4 inline-flex text-sm font-medium text-accent">
                    Open wishlist
                  </Link>
                </div>
              ) : null}

              {recentlyViewed.length > 0 ? (
                <div className="rounded-[2rem] border border-ink/10 bg-[#edf4ff] p-5">
                  <p className="font-display text-lg font-semibold">Recently viewed</p>
                  <div className="mt-3 space-y-2 text-sm text-ink/65">
                    {recentlyViewed.slice(0, 2).map((item) => (
                      <p key={item.id}>{item.name}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-ink/60">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block rounded-full bg-ink px-5 py-3 text-center font-medium text-paper transition hover:scale-[1.01]"
                >
                  Checkout Safely
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
