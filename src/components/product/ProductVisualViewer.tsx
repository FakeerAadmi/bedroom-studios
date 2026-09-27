"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronDown, Sparkles, Layers, Maximize2 } from 'lucide-react';
import { getProductIcon } from '../icons/ProductIcons';

export default function ProductVisualViewer({ product }: { product: any }) {
  const [showPhotos, setShowPhotos] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const photos = [
    ...(product.image ? [{ label: 'Studio Hero', caption: product.name, image: product.image }] : []),
    ...(product.gallery?.filter((g: any) => g.image) || []),
  ];

  return (
    <div className="space-y-4">
      {/* ── 1. Minimal Vector Technical Blueprint (Default Hero Viewport) ── */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/15 bg-[#faf9f5] shadow-card">
        {/* Millimeter grid background */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Top technical banner */}
        <div className="relative z-10 flex items-center justify-between border-b border-ink/10 px-6 py-4 bg-white/40">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#d4ff00] border border-ink" />
            <span className="font-mono text-xs uppercase tracking-widest text-ink/70">
              Technical Blueprint · {product.sku || 'BS-OBJ-01'}
            </span>
          </div>
          <span className="rounded-full border border-ink/15 bg-white/80 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink/60">
            Vector Schematic
          </span>
        </div>

        {/* Blueprint display arena */}
        <div className="relative z-10 flex min-h-[24rem] md:min-h-[28rem] flex-col items-center justify-center p-8">
          {/* Ambient subtle beacon circle */}
          <div className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(212,255,0,0.3)_0%,transparent_70%)] blur-2xl" />

          {/* Centered Large SVG Icon */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative flex items-center justify-center text-ink"
          >
            {getProductIcon(product.slug, { size: 160, strokeWidth: 1.4 })}
          </motion.div>

          {/* Dimension & Spec Watermarks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-ink/55">
            <span className="rounded-lg border border-ink/10 bg-white/60 px-3 py-1">
              H: {product.dimensions?.split('×')?.[1]?.trim() || 'Custom Scale'}
            </span>
            <span className="rounded-lg border border-ink/10 bg-white/60 px-3 py-1">
              Material: {product.materials?.[0] || 'Additive Resin / PLA'}
            </span>
            <span className="rounded-lg border border-ink/10 bg-white/60 px-3 py-1">
              Precision: 0.16mm Layer
            </span>
          </div>
        </div>

        {/* Blueprint Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-ink/10 px-6 py-3 bg-[#f3efe7] text-[11px] font-mono text-ink/60">
          <span>BEDROOM LABS // V2.0 VECTOR CAD</span>
          <span>STATUS: MADE TO ORDER</span>
        </div>
      </div>

      {/* ── 2. Collapsible Studio Photography Dropdown ── */}
      {photos.length > 0 && (
        <div className="rounded-[2rem] border border-ink/15 bg-[#faf9f5] overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setShowPhotos(!showPhotos)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-ink/5 group"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white group-hover:bg-[#d4ff00] group-hover:border-ink transition-colors">
                <Camera className="h-4 w-4 text-ink" />
              </div>
              <div>
                <p className="font-display text-sm font-bold tracking-wide text-ink">
                  View Studio Photography
                </p>
                <p className="text-xs font-mono text-ink/55">
                  {photos.length} real studio photograph{photos.length > 1 ? 's' : ''} available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-ink/10 bg-white px-3 py-1 font-mono text-[11px] text-ink/70">
                {showPhotos ? 'Hide Photographs' : 'Expand Dropdown'}
              </span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white transition-transform duration-300 ${showPhotos ? 'rotate-180 bg-[#d4ff00]' : ''}`}>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </button>

          {/* Collapsible Photo Tray */}
          <AnimatePresence>
            {showPhotos && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-ink/10"
              >
                <div className="p-6 space-y-4 bg-white/70">
                  {/* Primary expanded photograph */}
                  <div className="relative h-80 md:h-96 w-full overflow-hidden rounded-[1.8rem] border border-ink/15 bg-[#ece7dd]">
                    <Image
                      src={photos[activePhotoIndex]?.image || photos[0].image}
                      alt={photos[activePhotoIndex]?.label || product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1]" />
                    <div className="absolute bottom-4 left-4 right-4 z-[2] flex items-center justify-between text-white">
                      <span className="font-mono text-xs uppercase tracking-wider bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        {photos[activePhotoIndex]?.label || 'Studio Shot'}
                      </span>
                      {photos[activePhotoIndex]?.caption && (
                        <p className="text-xs text-white/80 max-w-xs truncate hidden sm:block">
                          {photos[activePhotoIndex].caption}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Selector if multiple photos exist */}
                  {photos.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {photos.map((photo, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActivePhotoIndex(idx)}
                          className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                            activePhotoIndex === idx
                              ? 'border-ink ring-2 ring-[#d4ff00]'
                              : 'border-ink/20 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image src={photo.image} alt={photo.label || ''} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
