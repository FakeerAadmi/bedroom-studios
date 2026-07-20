// @ts-nocheck
"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';

import PageShell from '@/components/PageShell';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlistItems, recentlyViewed } = useCart();

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <>
        <title>Saved Items — Bedroom Studios</title>
      </>
      <div className="max-w-3xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
          Wishlist
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Your saved objects. Taste archived for later.
        </h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-ink/25 bg-white/50 p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink/40"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <p className="mt-5 font-display text-2xl font-bold">Nothing saved yet</p>
          <p className="mt-3 max-w-sm text-lg text-ink/60">Wander through the shop and rescue a few things from indecision.</p>
          <Link
            href="/shop"
            className="mt-8 rounded-full border border-ink px-6 py-3 font-medium transition hover:bg-ink hover:text-paper"
          >
            Explore the shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wishlistItems.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}

      {recentlyViewed.length > 0 ? (
        <section className="mt-14">
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
            Recently viewed
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {recentlyViewed.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
