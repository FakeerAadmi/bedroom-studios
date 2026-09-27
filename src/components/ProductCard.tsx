/**
 * CLIENT COMPONENT
 * Reason: Uses `framer-motion` for hover animations, `useCart` for interactions, and `useRouter` for imperative navigation.
 */
"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getProductIcon } from './icons/ProductIcons';

export default function ProductCard({ product, index }: { product: any; index: number }) {
  const router = useRouter();
  const { addItem, toggleWishlist, wishlistIds } = useCart();
  const [isThudding, setIsThudding] = useState(false);
  const isWishlisted = wishlistIds.includes(product.id);
  const isUnavailable = product.price === null || product.price === undefined || product.adminStatus !== 'active' || product.stock <= 0;
  const tiltAngle = index % 2 === 0 ? -1.5 : 1.5;
  const indexNumber = String(index + 1).padStart(3, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={isThudding ? { y: [0, 6, -2, 0], scale: [1, 0.985, 1.005, 1] } : { opacity: 1, y: 0 }}
      transition={
        isThudding
          ? { duration: 0.28, ease: "easeOut" }
          : {
              opacity: { duration: 0.3, delay: index * 0.03 },
              y: { duration: 0.3, delay: index * 0.03 },
              rotate: { type: 'spring', stiffness: 520, damping: 24, mass: 0.4 },
              scale: { type: 'spring', stiffness: 520, damping: 24, mass: 0.4 },
            }
      }
      whileHover={isUnavailable || isThudding ? {} : { rotate: tiltAngle, scale: 1.01 }}
      whileTap={isUnavailable || isThudding ? {} : { rotate: tiltAngle * 1.4, scale: 0.985 }}
      onClick={() => !isUnavailable && router.push(`/product/${product.slug}`)}
      className={`group relative overflow-hidden rounded-[2rem] border border-ink/15 bg-[#faf9f5] shadow-card origin-center flex flex-col h-full ${isUnavailable ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {/* Coming Soon overlay for unavailable products */}
      {isUnavailable && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <span className="rounded-full border border-ink/20 bg-white/95 px-5 py-2 text-xs font-mono uppercase tracking-[0.2em] text-ink/70 shadow-md backdrop-blur-sm">
            Batch Queued / Unavailable
          </span>
        </div>
      )}

      {/* Blur wrapper for unavailable cards */}
      <div className={`flex flex-col flex-1 h-full ${isUnavailable ? 'pointer-events-none select-none blur-[1.5px] grayscale-[30%] opacity-65' : ''}`}>
        
        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Toggle wishlist"
          onClick={(event) => {
            event.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute right-4 top-4 z-10 rounded-full border border-ink/10 bg-white/80 p-2 transition ${
            isWishlisted ? 'text-[#db2a63]' : 'text-ink/40 hover:text-ink'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Minimal Vector Blueprint Canvas (No Product Photo) */}
        <div className="relative h-64 w-full shrink-0 overflow-hidden border-b border-ink/10 bg-[#f4f2ec] p-6 flex flex-col justify-between">
          {/* Subtle architectural millimeter grid */}
          <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          {/* Top technical meta */}
          <div className="relative z-[2] flex items-center justify-between">
            <span className="font-mono text-xs font-semibold tracking-wider text-ink/50">
              {indexNumber}
            </span>
            <span className="rounded-full border border-ink/10 bg-white/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink/60">
              {product.sku || `BS-OBJ-${product.id}`}
            </span>
          </div>

          {/* Centered Minimal SVG Icon */}
          <div className="relative z-[2] my-auto flex items-center justify-center py-4">
            <div className="relative flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-110">
              {/* Subtle hover neon glow behind icon */}
              <div className="absolute inset-0 rounded-full bg-[#d4ff00]/0 blur-xl transition duration-500 group-hover:bg-[#d4ff00]/40" />
              <div className="relative text-ink transition-colors duration-300">
                {getProductIcon(product.slug, { size: 84, strokeWidth: 1.5 })}
              </div>
            </div>
          </div>

          {/* Bottom badge info */}
          <div className="relative z-[2] flex items-center justify-between">
            <div className="flex gap-2">
              <span className="rounded-full border border-ink/15 bg-white/80 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-ink/75">
                {product.label || 'Studio Object'}
              </span>
              <span className="rounded-full border border-ink/10 bg-white/50 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-ink/50">
                {product.family}
              </span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition duration-300 group-hover:bg-[#d4ff00] group-hover:border-ink">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* Card Body & Specs */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                {product.materials?.[0] && (
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ink/55 font-mono">
                    {product.materials[0]}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink/65 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 grid gap-2.5 sm:grid-cols-[1fr_auto]">
            <motion.button
              type="button"
              disabled={isUnavailable}
              whileHover={isUnavailable ? {} : { scale: 1.02 }}
              whileTap={isUnavailable ? {} : { 
                scale: 0.95, 
                y: 3, 
                transition: { type: "spring", stiffness: 700, damping: 15 } 
              }}
              onClick={(event) => {
                event.stopPropagation();
                if (!isUnavailable) {
                  setIsThudding(true);
                  setTimeout(() => setIsThudding(false), 300);
                  addItem(product);
                }
              }}
              className={`rounded-full border px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold transition-colors ${
                isUnavailable
                  ? 'border-ink/10 bg-ink/5 text-ink/30 cursor-not-allowed'
                  : 'border-ink bg-ink text-[#d4ff00] hover:bg-[#d4ff00] hover:text-ink'
              }`}
            >
              {isUnavailable ? 'Queued' : 'Request Order'}
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/product/${product.slug}`);
              }}
              className="rounded-full border border-ink/20 bg-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-medium text-ink transition hover:border-ink hover:bg-white"
            >
              Blueprint →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
