// @ts-nocheck
/**
 * CLIENT COMPONENT
 * Reason: Uses `framer-motion` for hover animations, `useCart` for interactions, and `useRouter` for imperative navigation.
 */
"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils';

export default function ProductCard({ product, index }) {
  const navigate = useRouter();
  const { addItem, toggleWishlist, wishlistIds } = useCart();
  const isWishlisted = wishlistIds.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -10, rotate: -0.2 }}
      onClick={() => navigate(`/product/${product.slug}`)}
      className={`group relative cursor-pointer overflow-hidden rounded-[2rem] border border-ink/15 bg-paper shadow-card transition ${product.textureClass}`}
    >
      <button
        type="button"
        aria-label="Toggle wishlist"
        onClick={(event) => {
          event.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute right-4 top-4 z-10 rounded-full border border-ink/10 bg-white/85 p-2 transition ${
          isWishlisted ? 'text-[#db2a63]' : 'text-ink/45'
        }`}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${product.color} p-6`}>
        {product.image ? (
          <>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/40 to-transparent z-[1]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_45%)]" />
            <div className={`absolute inset-0 opacity-30 ${product.textureClass}`} />
          </>
        )}
        <div className="relative flex h-full items-end justify-between z-[2]">
          <div>
            <span className="rounded-full border border-ink/15 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-ink">
              {product.label}
            </span>
            <p className="mt-4 max-w-[14rem] text-sm text-ink/80 font-medium transition duration-300 group-hover:translate-y-1">
              {product.description}
            </p>
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.7rem] border border-ink/15 bg-white/80 text-center text-[10px] uppercase tracking-[0.2em] text-ink transition duration-500 group-hover:rotate-6 group-hover:scale-110">
            View gallery
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold leading-tight">{product.name}</h3>
            <p className="mt-2 text-sm text-ink/60">{formatPrice(product.price)}</p>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 text-ink/40 transition group-hover:text-ink" />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            disabled={product.price === null || product.price === undefined}
            onClick={(event) => {
              event.stopPropagation();
              addItem(product);
            }}
            className={`rounded-full border px-5 py-3 text-sm font-medium transition ${
              product.price === null || product.price === undefined
                ? 'border-ink/10 bg-ink/5 text-ink/30 cursor-not-allowed'
                : 'border-ink bg-ink text-paper hover:scale-[1.01] hover:bg-accent'
            }`}
          >
            {product.price === null || product.price === undefined ? 'Soon' : index % 2 === 0 ? 'Snag It' : 'Yeet into Cart'}
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/product/${product.slug}`);
            }}
            className="rounded-full border border-ink px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}
