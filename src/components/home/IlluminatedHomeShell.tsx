"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import PullChainLampHero from './PullChainLampHero';
import { useLampState } from '../../context/LampContext';
import StudioWorkbench from './StudioWorkbench';
import ProductCard from '@/components/ProductCard';
import {
  ModernShojiIcon,
  BoofaLampIcon,
  HotAirBalloonIcon,
  CementPlinthIcon,
} from '@/components/icons/ProductIcons';

const tickerItems = [
  'MADE TO ORDER',
  'MICRON-ACCURATE ADDITIVE GEOMETRY',
  'ZERO WAREHOUSE WASTE',
  'RAW PORTLAND CEMENT',
  'LOW-VOLTAGE 5V USB CORE',
  'DISCORD TELEMETRY RADAR',
  'JAPANDI & BRUTALIST DESKWARES',
  'HAND-FINISHED IN BENGALURU',
];

const indexItems = [
  {
    num: '001',
    name: 'Modern Shoji',
    tag: 'Japandi Luminaire',
    desc: 'Lattice timber geometry with translucent washi diffusion panels around a dimmable LED core.',
    href: '/product/modern-shoji-lamp',
    icon: <ModernShojiIcon size={36} />,
  },
  {
    num: '002',
    name: 'BOOFA Lamp',
    tag: 'Architectural Dome',
    desc: 'KABO Editions fluted mushroom dome casting indirect ambient illumination over a flared plinth.',
    href: '/product/boofa-table-lamp',
    icon: <BoofaLampIcon size={36} />,
  },
  {
    num: '003',
    name: 'Hot Air Balloon',
    tag: 'Whimsical Aerial',
    desc: '18cm diameter ribbed diffusion envelope with intricately woven hanging gondola basket.',
    href: '/product/hot-air-balloon-lamp',
    icon: <HotAirBalloonIcon size={36} />,
  },
  {
    num: '004',
    name: 'Cementware',
    tag: 'Mineral Brutalism',
    desc: 'Solid hand-cast Portland cement incense trays, candle pedestals, and display plinths.',
    href: '/shop',
    icon: <CementPlinthIcon size={36} />,
  },
];

const studioSteps = [
  {
    title: 'Precision Layer Geometry',
    desc: '0.16mm layer height with specialized vase-mode extrusion to eliminate seams and hotspots.',
  },
  {
    title: 'Optical Micro-Diffusion',
    desc: 'Textured diffusion walls calibrate direct LED diodes into soft, soothing ambient haloes.',
  },
  {
    title: 'Mineral Cement Casting',
    desc: 'High-density Portland cement hand-poured in silicone moulds and cured over 48 hours.',
  },
  {
    title: 'Low-Heat Safe Lighting',
    desc: 'Powered exclusively via 5V USB LED modules or low-wattage E27 filament bulbs.',
  },
  {
    title: 'Direct Studio Dispatch',
    desc: 'Real-time order telemetry dispatched to studio Discord for personal batch verification.',
  },
];

const testimonials = [
  {
    id: '001',
    quote: 'The ambient glow through the Shoji panels creates the calmest late-night workstation vibe I’ve ever had.',
    author: 'Vikram R.',
    role: 'Creative Technologist',
    city: 'Bengaluru',
  },
  {
    id: '002',
    quote: 'The BOOFA lamp is an architectural sculpture even when turned off. Solid, heavy, and impeccable finish.',
    author: 'Tanvi M.',
    role: 'Product Architect',
    city: 'Mumbai',
  },
  {
    id: '003',
    quote: 'The cement incense holder has real weight and gravitas. You can tell this was made by human hands.',
    author: 'Arjun K.',
    role: 'Studio Founder',
    city: 'Pune',
  },
  {
    id: '004',
    quote: 'Replacing generic Amazon desk accessories with Bedroom Studios objects completely changed my deep work focus.',
    author: 'Meera S.',
    role: 'Software Engineer',
    city: 'Hyderabad',
  },
  {
    id: '005',
    quote: 'The hot air balloon lamp is pure magic in person. The hanging basket detail is unreal.',
    author: 'Ananya D.',
    role: 'Brand Designer',
    city: 'Delhi',
  },
  {
    id: '006',
    quote: 'Zero mass-production feel. Knowing it was 3D printed to order for my desk makes it feel special.',
    author: 'Nikhil P.',
    role: 'Hardware Hacker',
    city: 'Gurgaon',
  },
];

export default function IlluminatedHomeShell({ allProducts }: { allProducts: any[] }) {
  // Lamp state from context (shared with layout for header visibility)
  const { isLit, setIsLit } = useLampState();
  const [hasUnlockedScroll, setHasUnlockedScroll] = useState(false);
  const activateLampRef = useRef<(() => void) | null>(null);

  const deskLamps = allProducts.filter((p) => p.categoryId === 'desk-lamps');
  const cementware = allProducts.filter((p) => p.categoryId === 'cementware');

  // Strict scroll lock when lamp is off: prevents wheel, touch, and keys
  useEffect(() => {
    if (!hasUnlockedScroll) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const preventDefaultAction = (e: Event) => {
        e.preventDefault();
      };

      const preventScrollKeys = (e: KeyboardEvent) => {
        if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
          e.preventDefault();
        }
      };

      window.addEventListener('wheel', preventDefaultAction, { passive: false });
      window.addEventListener('touchmove', preventDefaultAction, { passive: false });
      window.addEventListener('keydown', preventScrollKeys);

      return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('wheel', preventDefaultAction);
        window.removeEventListener('touchmove', preventDefaultAction);
        window.removeEventListener('keydown', preventScrollKeys);
      };
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [hasUnlockedScroll]);

  // When lamp turns lit, unlock scroll after delay
  useEffect(() => {
    if (isLit) {
      const timer = setTimeout(() => {
        setHasUnlockedScroll(true);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [isLit]);

  // 4-second inactivity auto-activation when lamp is still OFF
  useEffect(() => {
    if (isLit) return; // Already lit, no timer needed

    let timeoutId: NodeJS.Timeout;

    const startTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Trigger the same activation as manual chain pull
        if (activateLampRef.current) {
          activateLampRef.current();
        } else {
          setIsLit(true);
        }
      }, 4000);
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      startTimer();
    };

    // Start initial timer
    startTimer();

    // Activity events that reset the timer
    const events: (keyof WindowEventMap)[] = [
      'mousemove', 'pointermove', 'pointerdown',
      'touchstart', 'touchmove', 'keydown', 'scroll',
    ];
    events.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));

    return () => {
      clearTimeout(timeoutId);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [isLit, setIsLit]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-white/90">
      {/* ── 1. PULL CHAIN LAMP HERO (Solid black background, zero text, only lamp and downward light) ── */}
      <PullChainLampHero
        isLit={isLit}
        setIsLit={setIsLit}
        onLitComplete={() => setHasUnlockedScroll(true)}
        activateLampRef={activateLampRef}
      />

      {/* ── 2. ILLUMINATED WEBSITE CONTENT (Lit up by the downward light) ── */}
      <div
        id="illuminated-content"
        className={`relative transition-all duration-1000 bg-[#faf9f5] text-ink ${
          isLit
            ? 'opacity-100 filter-none pointer-events-auto'
            : 'opacity-0 filter-none pointer-events-none'
        }`}
      >
        {/* Warm downward light halo spilling over the top */}
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 pointer-events-none transition-opacity duration-1000 ${
            isLit ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse at top, rgba(255, 215, 140, 0.45) 0%, rgba(250, 249, 245, 0) 70%)',
          }}
        />

        {/* ── TICKER STRIP ── */}
        <div className="overflow-hidden border-y border-ink/10 py-2.5 font-mono text-[10px] tracking-[0.25em] bg-[#f4f2ec] text-ink/65">
          <div className="ticker-track flex items-center min-w-max gap-8 px-6 uppercase">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <div key={`${item}-${index}`} className="flex items-center gap-6">
                <span>{item}</span>
                <span className="text-[#d4ff00]">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 001, 002, 003, 004 TECHNICAL INDEX STRIP ── */}
        <section className="border-b border-ink/10 bg-[#f6f4ed]">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-ink/10">
              {indexItems.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="group p-8 transition-colors duration-300 hover:bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-ink/50">
                      <span className="font-bold text-ink/70">{item.num}</span>
                      <span className="text-[10px] uppercase tracking-wider text-ink/40 group-hover:text-accent">
                        {item.tag}
                      </span>
                    </div>

                    <div className="my-6 text-ink transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>

                    <h3 className="font-display text-lg font-bold text-ink group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink/65 font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink/50 group-hover:text-ink">
                    <span>Explore Blueprint</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE WORKBENCH CONSOLE ── */}
        <div id="workbench">
          <StudioWorkbench />
        </div>

        {/* ── ARCHITECTURAL UNIFIED STANDARD ── */}
        <section className="border-y border-ink/10 py-16 md:py-24 bg-[#faf9f5]">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-14 text-center max-w-3xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
                Architecture & Craft
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl text-ink">
                A single, unified Studio Build Standard
              </h2>
              <p className="mt-4 text-sm md:text-base text-ink/70 leading-relaxed">
                Every piece is manufactured to order. Zero mass-production waste, custom fluted diffusion geometry, and hand-cast minerals.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
              {/* Build Principles */}
              <div className="space-y-4">
                {studioSteps.map((step, idx) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-ink/10 bg-white p-5 transition shadow-sm hover:border-ink"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4ff00] border border-ink font-mono text-[10px] font-bold text-ink">
                        {idx + 1}
                      </span>
                      <h3 className="font-display text-base font-bold text-ink">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-xs md:text-sm text-ink/65 leading-relaxed pl-9">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Exploded Diagram Box */}
              <div className="relative rounded-[2.5rem] border border-ink/15 bg-[#f5f2ea] p-8 md:p-12 shadow-card overflow-hidden">
                <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />

                <div className="relative z-10 flex flex-col items-center justify-center space-y-4 py-6">
                  {/* Layer 5 */}
                  <div className="w-64 rounded-2xl border border-ink bg-white/95 p-4 shadow-sm text-center text-ink">
                    <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">LAYER 05</span>
                    <p className="font-display text-sm font-bold">Optical Diffuser Shell</p>
                    <p className="text-[11px] font-mono text-ink/60 mt-0.5">Vase Mode Translucent PETG (0.16mm)</p>
                  </div>

                  <div className="h-6 w-0.5 border-l border-dashed border-ink/40" />

                  {/* Layer 4 */}
                  <div className="w-56 rounded-2xl border border-ink bg-[#d4ff00] p-4 shadow-sm text-center text-ink">
                    <span className="font-mono text-[10px] text-ink/50 uppercase tracking-widest">LAYER 04</span>
                    <p className="font-display text-sm font-bold">5V High-CRI LED Core</p>
                    <p className="text-[11px] font-mono text-ink/70 mt-0.5">Inline Dimmer / Zero Heat</p>
                  </div>

                  <div className="h-6 w-0.5 border-l border-dashed border-ink/40" />

                  {/* Layer 3 */}
                  <div className="w-64 rounded-2xl border border-ink bg-white/95 p-4 shadow-sm text-center text-ink">
                    <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">LAYER 03</span>
                    <p className="font-display text-sm font-bold">Structural Gyroid Infill</p>
                    <p className="text-[11px] font-mono text-ink/60 mt-0.5">15% Minimal Surface Density</p>
                  </div>

                  <div className="h-6 w-0.5 border-l border-dashed border-ink/40" />

                  {/* Layer 2 */}
                  <div className="w-72 rounded-2xl border border-ink bg-[#e8e4db] p-4 shadow-sm text-center text-ink">
                    <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">LAYER 02</span>
                    <p className="font-display text-sm font-bold">Hand-Cast Portland Cement Base</p>
                    <p className="text-[11px] font-mono text-ink/60 mt-0.5">Weighted Mineral Plinth (~650g)</p>
                  </div>

                  <div className="h-6 w-0.5 border-l border-dashed border-ink/40" />

                  {/* Layer 1 */}
                  <div className="w-80 rounded-xl border border-ink bg-ink p-3 text-center text-paper">
                    <span className="font-mono text-[10px] text-paper/50 uppercase tracking-widest">LAYER 01</span>
                    <p className="font-display text-xs font-bold text-[#d4ff00]">Acoustic Felt Desk Cushion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL OBJECT SHOWCASE (VECTOR BLUEPRINTS) ── */}
        <section id="showcase" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/10 pb-6 mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
                Studio Catalog // All Objects
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl text-ink">
                Architectural Desktop Collection
              </h2>
            </div>
            <p className="max-w-md text-sm text-ink/65 leading-relaxed">
              Click any vector blueprint to inspect details or queue a made-to-order run directly with our studio.
            </p>
          </div>

          {/* Desk Lamps */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#d4ff00] border border-ink" />
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                Series 01 · Desk Luminaires ({deskLamps.length})
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {deskLamps.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          </div>

          {/* Cementware */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2 w-2 rounded-full bg-ink/30 border border-ink/40" />
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-ink">
                Series 02 · Mineral Cementware ({cementware.length})
              </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cementware.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx + deskLamps.length} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 3-TRACK JOURNEY ── */}
        <section className="border-t border-ink/10 py-16 md:py-24 bg-[#f6f4ed]">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
                Studio Tracks
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl text-ink">
                Choose your Studio Journey
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Path 1 */}
              <div className="rounded-[2.2rem] border border-ink/15 bg-white p-8 flex flex-col justify-between shadow-sm transition hover:shadow-card hover:-translate-y-1">
                <div>
                  <span className="font-mono text-xs text-ink/50 uppercase tracking-widest">PATH 01</span>
                  <div className="my-6 text-ink">
                    <ModernShojiIcon size={52} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink">Desk Luminaires</h3>
                  <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                    Sculptural ambient lighting engineered with micro-diffusers and low-heat LED cores.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="mt-8 inline-flex items-center justify-between rounded-full border border-ink/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-[#d4ff00] font-semibold"
                >
                  <span>Browse Luminaires</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Path 2 */}
              <div className="rounded-[2.2rem] border border-ink/15 bg-white p-8 flex flex-col justify-between shadow-sm transition hover:shadow-card hover:-translate-y-1">
                <div>
                  <span className="font-mono text-xs text-ink/50 uppercase tracking-widest">PATH 02</span>
                  <div className="my-6 text-ink">
                    <CementPlinthIcon size={52} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink">Mineral Cementware</h3>
                  <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                    Raw Portland cement objects cured 48 hours in silicone forms. Heavy, tactile anchors.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="mt-8 inline-flex items-center justify-between rounded-full border border-ink/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-[#d4ff00] font-semibold"
                >
                  <span>Browse Cementware</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Path 3 */}
              <div className="rounded-[2.2rem] border border-ink/15 bg-white p-8 flex flex-col justify-between shadow-sm transition hover:shadow-card hover:-translate-y-1">
                <div>
                  <span className="font-mono text-xs text-ink/50 uppercase tracking-widest">PATH 03</span>
                  <div className="my-6 text-ink">
                    <HotAirBalloonIcon size={52} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink">Custom Commissions</h3>
                  <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                    Custom dimension requests, bespoke shades, or setup integration. We iterate runs with you.
                  </p>
                </div>
                <Link
                  href="/commissions"
                  className="mt-8 inline-flex items-center justify-between rounded-full border border-ink/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-[#d4ff00] font-semibold"
                >
                  <span>Inquire Commission</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="border-t border-ink/10 py-16 md:py-24 bg-[#faf9f5]">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
                Verified Workstations
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl text-ink">
                Trusted by creators and workspaces
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-[2rem] border border-ink/10 bg-white p-6 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-ink/40">{t.id}</span>
                    <p className="mt-4 text-sm leading-relaxed text-ink/80 italic font-sans">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
                    <div>
                      <p className="font-display text-xs font-bold text-ink">{t.author}</p>
                      <p className="text-[11px] font-mono text-ink/50">{t.role}</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-[#f4f2eb] text-ink/60 px-2.5 py-1 rounded-md">
                      {t.city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="border-t border-ink/10 py-20 text-center bg-[#f4f1ea]">
          <div className="mx-auto max-w-4xl px-4 md:px-8 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
              Batch Production Queue
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink">
              Unlock studio-grade desktop objects
            </h2>
            <p className="mx-auto max-w-xl text-base text-ink/75 leading-relaxed font-sans">
              Build your ideal workspace ambiance. Submit a made-to-order request today with zero upfront payment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 rounded-full border border-ink bg-[#d4ff00] px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-sm transition hover:bg-ink hover:text-[#d4ff00] hover:scale-[1.02]"
              >
                <span>Submit Order Request</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-7 py-4 font-mono text-xs font-medium uppercase tracking-wider text-ink transition hover:border-ink hover:bg-ink hover:text-white"
              >
                <span>View Full Catalog</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
