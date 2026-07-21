"use client";

import { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils';
import DropCountdown from '@/components/home/DropCountdown';

export default function ProductPurchaseCard({ product }) {
  const { addItem, addRecentlyViewed, toggleWishlist, wishlistIds } = useCart();
  
  const colors = product.colors ?? [];
  const materialOptions = product.materialOptions ?? [];

  const [selectedColor, setSelectedColor] = useState(colors[0] ?? '');
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0] ?? '');
  const [copiedLink, setCopiedLink] = useState(false);
  const isUnavailable = product.price === null || product.price === undefined || product.adminStatus !== 'active' || product.stock <= 0;

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setSelectedColor(colors[0] ?? '');
      setSelectedMaterial(materialOptions[0] ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const handleShareProduct = async () => {
    const shareData = {
      title: `${product.name} — Bedroom Studios`,
      text: `Check out the ${product.name} at Bedroom Studios:`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Share canceled or failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const isWishlisted = wishlistIds.includes(product.id);

  return (
    <div className="order-5 lg:order-none rounded-[2rem] border border-ink/15 bg-white/65 p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-3xl font-bold">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-ink/60">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/55">
            <span className="rounded-full border border-ink/10 px-3 py-1">{product.family}</span>
            <span className="rounded-full border border-ink/10 px-3 py-1">{product.stock <= 0 ? 'Out of stock' : `${product.stock} ready to ship`}</span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={handleShareProduct}
              aria-label="Share product"
              className={`rounded-full border p-3 transition ${
                copiedLink 
                  ? 'border-accent bg-accent/15 text-ink'
                  : 'border-ink bg-paper text-ink hover:bg-ink/5'
              }`}
            >
              <Share2 className="h-5 w-5" />
            </button>
            {copiedLink && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-lg bg-ink px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-paper shadow-sm whitespace-nowrap z-10">
                Link Copied ✦
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`rounded-full border border-ink/20 p-3 transition ${
              isWishlisted
                ? 'bg-[#ffe5ee] text-[#db2a63]'
                : 'bg-paper text-ink hover:bg-[#fff0f5]'
            }`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {product.limitedDrop ? (
        <div className="mt-5 rounded-[1.6rem] border border-ink bg-ink px-4 py-4 text-paper">
          <p className="text-xs uppercase tracking-[0.25em] text-paper/60">Next release window</p>
          <DropCountdown releaseDate={product.releaseDate} />
        </div>
      ) : null}

      {colors.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-medium text-ink/60" id="colorway-label">
            Colorway — <span className="text-ink">{selectedColor}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-labelledby="colorway-label">
            {colors.map((color) => (
              <button
                type="button"
                key={color}
                role="radio"
                aria-checked={selectedColor === color}
                onClick={() => setSelectedColor(color)}
                className={`rounded-full border px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-accent ${
                  selectedColor === color
                    ? 'border-accent bg-accent text-white'
                    : 'border-ink/20 hover:border-ink/50'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {materialOptions.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-ink/60" id="material-label">
            Material — <span className="text-ink">{selectedMaterial}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-labelledby="material-label">
            {materialOptions.map((material) => (
              <button
                type="button"
                key={material}
                role="radio"
                aria-checked={selectedMaterial === material}
                onClick={() => setSelectedMaterial(material)}
                className={`rounded-full border px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ink/40 ${
                  selectedMaterial === material
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/20 hover:border-ink/50'
                }`}
              >
                {material}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={isUnavailable || (colors.length > 0 && !selectedColor) || (materialOptions.length > 0 && !selectedMaterial)}
          onClick={() => addItem({ ...product, selectedColor, selectedMaterial })}
          className={`inline-flex flex-[1.25] items-center justify-center gap-3 rounded-full px-6 py-4 font-medium transition ${
            (isUnavailable || (colors.length > 0 && !selectedColor) || (materialOptions.length > 0 && !selectedMaterial))
              ? 'bg-ink/10 text-ink/40 cursor-not-allowed border border-ink/10'
              : 'bg-ink text-paper hover:bg-accent'
          }`}
        >
          <ShoppingBag className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">
            {product.stock <= 0 ? 'Currently sold out' : product.price === null || product.price === undefined ? 'Coming soon' : 'Add to cart'}
          </span>
        </button>
        <Link
          href="/commissions"
          className="flex-1 whitespace-nowrap rounded-full border border-ink/20 px-6 py-4 text-center font-medium transition hover:border-accent hover:text-accent"
        >
          Request custom
        </Link>
      </div>
    </div>
  );
}
