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

export default function ProductCard({ product, index }) {
  const router = useRouter();
  const { addItem, toggleWishlist, wishlistIds } = useCart();
  const isWishlisted = wishlistIds.includes(product.id);
  const isUnavailable = product.price === null || product.price === undefined || product.adminStatus !== 'active' || product.stock <= 0;
  const tiltAngle = index % 2 === 0 ? -1.8 : 1.8;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.3, delay: index * 0.03 },
        y: { duration: 0.3, delay: index * 0.03 },
        rotate: { type: 'spring', stiffness: 520, damping: 24, mass: 0.4 },
        scale: { type: 'spring', stiffness: 520, damping: 24, mass: 0.4 },
      }}
      whileHover={isUnavailable ? {} : { rotate: tiltAngle, scale: 1.012 }}
      whileTap={isUnavailable ? {} : { rotate: tiltAngle * 1.5, scale: 0.985 }}
      onClick={() => !isUnavailable && router.push(`/product/${product.slug}`)}
      className={`group relative overflow-hidden rounded-[2rem] border border-ink/15 bg-paper shadow-card origin-center flex flex-col h-full ${product.textureClass} ${isUnavailable ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {/* Coming Soon overlay for unavailable products */}
      {isUnavailable && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <span className="rounded-full border border-ink/20 bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 shadow-lg backdrop-blur-sm">
            Coming Soon
          </span>
        </div>
      )}

      {/* Blur wrapper for unavailable cards */}
      <div className={`flex flex-col flex-1 h-full ${isUnavailable ? 'pointer-events-none select-none blur-[2px] grayscale-[40%] opacity-60' : ''}`}>
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

      <div className={`relative h-72 w-full shrink-0 overflow-hidden bg-gradient-to-br ${product.color} p-6`}>
        {product.image ? (
          <>
            <Image 
              src={product.image} 
              alt={product.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_45%)]" />
            <div className={`absolute inset-0 opacity-30 ${product.textureClass}`} />
          </>
        )}
        <div className="relative flex h-full items-end justify-between z-[2]">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] font-medium ${product.image ? 'bg-black/60 text-white border-white/20 backdrop-blur-sm' : 'bg-white/80 text-ink border-ink/15'}`}>
                {product.label}
              </span>
              <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${product.image ? 'bg-black/40 text-white/80 border-white/10 backdrop-blur-sm' : 'bg-white/70 text-ink/65 border-ink/10'}`}>
                {product.family}
              </span>
            </div>
            {!product.image && (
              <p className="mt-4 max-w-[14rem] text-sm text-ink/80 font-medium transition duration-300 group-hover:translate-y-1">
                {product.description}
              </p>
            )}
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition duration-300 group-hover:scale-110 ${product.image ? 'bg-white text-ink border-white/40' : 'bg-white/80 text-ink border-ink/15'}`}>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 min-h-[160px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold leading-tight">{product.name}</h3>
            {product.materials?.[0] && (
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ink/55 font-mono">
                {product.materials[0]}
              </p>
            )}
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 text-ink/40 transition group-hover:text-ink shrink-0" />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            disabled={isUnavailable}
            onClick={(event) => {
              event.stopPropagation();
              addItem(product);
            }}
            className={`rounded-full border px-5 py-3 text-sm font-medium transition ${
              isUnavailable
                ? 'border-ink/10 bg-ink/5 text-ink/30 cursor-not-allowed'
                : 'border-ink bg-ink text-paper hover:scale-[1.01] hover:bg-accent'
            }`}
          >
            {isUnavailable ? 'Coming soon' : 'Request Sample'}
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              router.push(`/product/${product.slug}`);
            }}
            className="rounded-full border border-ink px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            Details
          </button>
        </div>
      </div>
      </div>
    </motion.article>
  );
}
