"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sliders, Check, Copy, ArrowRight, Zap, Sparkles, Terminal } from 'lucide-react';
import Link from 'next/link';
import { getProductIcon } from '../icons/ProductIcons';
import { useCart } from '@/context/CartContext';
import { allProducts } from '@/data/catalog';

const tabs = [
  { id: 'desk-lamps', label: '01 Desk Luminaires', badge: 'Active' },
  { id: 'cementware', label: '02 Mineral Cementware', badge: 'Hand-Cast' },
  { id: 'schematics', label: '03 Technical Schematics', badge: 'CAD 0.16mm' },
  { id: 'telemetry', label: '04 Studio Radar & Queue', badge: 'Live Discord' },
];

export default function StudioWorkbench() {
  const [activeTab, setActiveTab] = useState('desk-lamps');
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { addItem } = useCart();

  const activeCategoryProducts = allProducts.filter((p) => {
    if (activeTab === 'cementware') return p.categoryId === 'cementware';
    return p.categoryId === 'desk-lamps';
  });

  const currentProduct = activeCategoryProducts[selectedProductIndex] || activeCategoryProducts[0] || allProducts[0];

  const handleCopySpec = () => {
    const text = `OBJECT: ${currentProduct.name}\nSKU: ${currentProduct.sku}\nMATERIAL: ${currentProduct.materials?.join(', ')}\nDIMENSIONS: ${currentProduct.dimensions}\nSTATUS: Made to Order (Bedroom Studios)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      {/* Hairline Technical Section Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#d4ff00] border border-ink" />
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
              Interactive Workbench // v2.0
            </p>
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Live Spec & Object Console
          </h2>
        </div>
        <p className="max-w-md text-sm text-ink/65 leading-relaxed">
          Inspect dimensional CAD wireframes, layer parameters, and material formulation before requesting your made-to-order batch.
        </p>
      </div>

      {/* Segmented Control Bar (Deepgram style with Neon Lime active tab) */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-ink/15 bg-[#f4f2eb] p-1.5 shadow-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedProductIndex(0);
              }}
              className={`relative flex items-center gap-2.5 rounded-xl px-5 py-3 font-mono text-xs font-semibold tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-[#d4ff00] text-ink shadow-sm border border-ink'
                  : 'text-ink/60 hover:text-ink hover:bg-white/60'
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <span className="rounded-full bg-ink px-2 py-0.5 text-[9px] text-[#d4ff00]">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Workbench Terminal Box */}
      <div className="mt-4 rounded-[2.5rem] border border-ink/15 bg-[#faf9f5] shadow-card overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-ink/10 bg-white/70 px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full border border-ink/20 bg-ink/15" />
            </div>
            <span className="font-mono text-xs text-ink/50 ml-2">
              console://brm-lab/vector-engine/{currentProduct?.slug}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySpec}
              className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1 font-mono text-[11px] text-ink transition hover:bg-[#d4ff00] hover:border-ink"
            >
              {copied ? <Check className="h-3 w-3 text-ink" /> : <Copy className="h-3 w-3 text-ink/60" />}
              <span>{copied ? 'Copied' : 'Copy Specs'}</span>
            </button>
          </div>
        </div>

        {/* Workbench Body */}
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Panel: Vector CAD Arena */}
          <div className="relative border-b lg:border-b-0 lg:border-r border-ink/10 bg-[#f6f4ed] p-8 flex flex-col justify-between min-h-[380px]">
            {/* Fine architectural grid */}
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Top Object Selector Chips */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {activeCategoryProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductIndex(idx)}
                  className={`rounded-full px-3 py-1 font-mono text-xs transition border ${
                    selectedProductIndex === idx
                      ? 'bg-ink text-[#d4ff00] border-ink font-semibold'
                      : 'bg-white/70 text-ink/60 border-ink/10 hover:border-ink/40'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Centered Large Interactive SVG Vector */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center py-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-48 w-48 rounded-full bg-[#d4ff00]/30 blur-2xl animate-pulse" />
                <div className="relative text-ink transition-transform duration-500 hover:scale-110 cursor-pointer">
                  {getProductIcon(currentProduct.slug, { size: 140, strokeWidth: 1.4 })}
                </div>
              </div>

              {/* Crosshair dimensional callouts */}
              <div className="mt-6 flex items-center gap-4 font-mono text-xs text-ink/50">
                <span>[X: 100mm]</span>
                <span>✦</span>
                <span>[Y: 100mm]</span>
                <span>✦</span>
                <span>[Z: {currentProduct.dimensions?.split('×')?.[1]?.trim() || '180mm'}]</span>
              </div>
            </div>

            {/* Bottom status badge */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs text-ink/60">
              <span>PARAM: NOZZLE 0.4MM / GYROID 15%</span>
              <span className="text-ink font-semibold">ZERO RESIN SEAMS</span>
            </div>
          </div>

          {/* Right Panel: Technical Spec Sheet & Action */}
          <div className="p-8 flex flex-col justify-between bg-[#faf9f5]">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-ink/50">
                    {currentProduct.family} · {currentProduct.sku}
                  </span>
                  <h3 className="mt-1 font-display text-3xl font-bold text-ink">
                    {currentProduct.name}
                  </h3>
                </div>
                <span className="rounded-full bg-[#d4ff00] border border-ink px-3 py-1 font-mono text-xs font-bold text-ink">
                  Made to Order
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink/75">
                {currentProduct.description}
              </p>

              {/* Micro specs grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="rounded-xl border border-ink/10 bg-white p-3.5">
                  <p className="text-ink/45 text-[10px] uppercase tracking-wider">Primary Material</p>
                  <p className="mt-1 font-semibold text-ink truncate">{currentProduct.materials?.[0] || 'Additive Resin'}</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white p-3.5">
                  <p className="text-ink/45 text-[10px] uppercase tracking-wider">Dimensions</p>
                  <p className="mt-1 font-semibold text-ink truncate">{currentProduct.dimensions}</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white p-3.5">
                  <p className="text-ink/45 text-[10px] uppercase tracking-wider">Power / Illumination</p>
                  <p className="mt-1 font-semibold text-ink truncate">{currentProduct.materials?.[2] || '5V Low-Heat LED'}</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white p-3.5">
                  <p className="text-ink/45 text-[10px] uppercase tracking-wider">Production Cycle</p>
                  <p className="mt-1 font-semibold text-ink">3–5 Business Days</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-ink/10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => addItem(currentProduct)}
                className="flex-1 rounded-full border border-ink bg-ink px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#d4ff00] transition hover:bg-[#d4ff00] hover:text-ink shadow-sm"
              >
                Queue Made-to-Order Request
              </button>
              <Link
                href={`/product/${currentProduct.slug}`}
                className="rounded-full border border-ink/20 bg-white px-5 py-3.5 font-mono text-xs font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-white"
              >
                Full Study →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
