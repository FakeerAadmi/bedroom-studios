// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import PageShell from '@/components/PageShell';
import ProductCard from '@/components/ProductCard';
import { useStoreState } from '@/context/StoreContext';

// ─── FandomSection ───────────────────────────────────────────────────────────
function FandomSection({ collection }) {
  const sentinelRef = useRef(null);
  const [navHeight, setNavHeight] = useState(76); // Safe default
  const [isStuck, setIsStuck] = useState(false);
  const pillOffset = 16; // 16px padding between navbar and sticky pill

  useEffect(() => {
    // Only apply on mobile
    const mq = window.matchMedia('(max-width: 767px)');
    if (!mq.matches) return;

    // Dynamically track navbar height
    const navbar = document.getElementById('global-navbar');
    const updateNavHeight = () => {
      if (navbar && navbar.offsetHeight !== navHeight) {
        setNavHeight(navbar.offsetHeight);
      }
    };
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      {
        rootMargin: `-${navHeight + pillOffset}px 0px 0px 0px`,
        threshold: 0,
      }
    );
    observer.observe(sentinel);

    return () => {
      window.removeEventListener('resize', updateNavHeight);
      observer.disconnect();
    };
  }, [navHeight]);

  return (
    <section className="relative flex flex-col gap-6 lg:grid lg:grid-cols-[0.42fr_0.58fr]">
      {/* ── Sentinel (Mobile Only) ── */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-px w-full md:hidden"
      />

      {/* ── Mobile Layout (< md) ── */}
      {/* 
        PURE CSS PARALLAX:
        To prevent the products from scrolling up 2x as fast as the card shrinks (which causes overlapping),
        we MUST decouple the sticky header from the scrolling body in the DOM. 
        Because they are separate siblings in the normal document flow, their heights NEVER change. 
        This guarantees the 24px gap to the products is structurally locked and physically impossible to break.
      */}
      
      {/* STICKY HEADER */}
      <div
        style={{ top: navHeight + pillOffset }}
        className="sticky z-30 md:hidden"
      >
        {/* GHOST ELEMENT (Holds layout bounds fixed to prevent scroll jumps) */}
        <div className="relative flex items-start pt-6 px-6 pb-2 invisible pointer-events-none" aria-hidden="true">
          <div className="mt-5 mr-0 w-0 flex-shrink-0">
            <span className="inline-block h-2 w-2" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-sm font-display font-bold uppercase tracking-[0.25em]">{collection.eyebrow}</p>
            <h2 className="text-4xl font-display font-bold tracking-tight">{collection.name}</h2>
          </div>
        </div>

        {/* VISUAL PILL WRAPPER */}
        <div className={`
          absolute top-0 left-0 right-0 z-10 pointer-events-none
          ${isStuck ? 'bottom-auto' : 'bottom-0'}
        `}>
          {/* GHOST STUCK TEXT (Determines shrunk height dynamically based on text wrapping) */}
          <div className={`
            invisible flex items-start pt-6 px-6 pb-4
            ${isStuck ? 'block' : 'hidden'}
          `} aria-hidden="true">
            <div className="mt-1 mr-3 w-3 flex-shrink-0">
              <span className="inline-block h-2 w-2" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-0 text-[0.65rem] font-display font-bold uppercase tracking-[0.25em]">{collection.eyebrow}</p>
              <h2 className="text-xl leading-none font-display font-bold tracking-tight">{collection.name}</h2>
            </div>
          </div>

          {/* EXACT SHAPE BLUR AURA */}
          <div 
            className={`
              absolute -top-[10px] -left-[10px] -right-[10px] -bottom-[10px] transition-opacity duration-300 ease-out
              backdrop-blur-md
              ${isStuck 
                ? 'opacity-100 rounded-[calc(1.6rem+10px)]' 
                : 'opacity-0 rounded-t-[calc(2.3rem+10px)] rounded-b-none'
              }
            `}
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%), linear-gradient(to right, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskImage: 'linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%), linear-gradient(to right, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%)',
              maskComposite: 'intersect'
            }}
          />

          {/* PILL BACKGROUND & CONTENT */}
          <div className={`
            absolute inset-0 pointer-events-auto
            border-ink ${collection.panelClass || 'bg-paper'}
            ${
              isStuck
                ? 'rounded-[1.6rem] shadow-[0_8px_32px_rgba(28,28,26,0.12)] border'
                : 'rounded-t-[2.3rem] border-x border-t border-b-0'
            }
          `}>
            <div className="absolute inset-0 z-10 flex items-start pt-6 px-6 pointer-events-none">
              <div
                className={`
                  flex items-center justify-center overflow-hidden transition-all duration-300 ease-out flex-shrink-0
                  ${isStuck ? 'mt-1 mr-3 w-3 opacity-40' : 'mt-4 mr-0 w-0 opacity-0'}
                `}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-current" />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`
                    font-display font-bold uppercase tracking-[0.25em] transition-all duration-300 ease-out
                    ${isStuck ? 'mb-0 text-[0.65rem] opacity-70' : 'mb-1 text-sm opacity-50'}
                  `}
                >
                  {collection.eyebrow}
                </p>
                <h2
                  className={`
                    font-display font-bold tracking-tight transition-all duration-300 ease-out
                    ${isStuck ? 'text-xl leading-none' : 'text-4xl'}
                  `}
                >
                  {collection.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLLING BODY */}
      <div
        className={`
          relative z-10 overflow-hidden border-x border-b border-ink p-6 pt-3 md:hidden
          ${collection.panelClass || 'bg-paper'}
          -mt-[25px]
          transition-all duration-300
          ${
            isStuck
              ? 'rounded-t-[1.6rem] rounded-b-[2.3rem] border-t'
              : 'rounded-t-none rounded-b-[2.3rem] border-t-0'
          }
        `}
      >

        {collection.logoUrl && (
          <img
            src={collection.logoUrl}
            alt={`${collection.name} logo`}
            className="pointer-events-none absolute -bottom-4 -right-4 h-40 w-40 object-contain opacity-10 mix-blend-luminosity grayscale"
          />
        )}

        <div className="relative z-10">
          <p className="text-lg leading-relaxed opacity-80">{collection.description}</p>
          <p className="mt-6 rounded-[1.6rem] border border-ink/10 bg-paper/90 p-4 text-sm text-ink/80">
            {collection.note}
          </p>
          <div className="mt-6 rounded-[1.6rem] border border-ink/10 bg-ink px-4 py-4 text-sm text-paper/90">
            {collection.identity}
          </div>
        </div>
      </div>

      {/* ── Desktop Layout (md+) ── */}
      <div className="hidden lg:sticky lg:top-28 lg:z-auto lg:self-start md:block">
        <div
          className={`relative overflow-hidden rounded-[2.3rem] border border-ink p-6 ${
            collection.panelClass || 'bg-paper'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-10" />

          {collection.logoUrl && (
            <img
              src={collection.logoUrl}
              alt={`${collection.name} logo`}
              className="pointer-events-none absolute -bottom-4 -right-4 h-40 w-40 object-contain opacity-10 mix-blend-luminosity grayscale"
            />
          )}

          <div className="relative z-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] opacity-50">
              {collection.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {collection.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">{collection.description}</p>
            <p className="mt-6 rounded-[1.6rem] border border-ink/10 bg-paper/90 p-4 text-sm text-ink/80">
              {collection.note}
            </p>
            <div className="mt-6 rounded-[1.6rem] border border-ink/10 bg-ink px-4 py-4 text-sm text-paper/90">
              {collection.identity}
            </div>
          </div>
        </div>
      </div>

      {/* ── Products ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {collection.products.map((product, pIndex) => {
          const actualProduct = {
            ...product,
            color: collection.cardColor,
          };
          return <ProductCard key={actualProduct.id} product={actualProduct} index={pIndex} />;
        })}
      </div>
    </section>
  );
}

// ─── FandomPage ──────────────────────────────────────────────────────────────
export default function FandomPage() {
  const { liveFandoms, isStoreLoading } = useStoreState();

  if (isStoreLoading) {
    return (
      <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <>
        
      </>
        <div className="flex justify-center py-40 text-ink/50 font-mono animate-pulse text-sm uppercase tracking-widest">
          Loading Fandoms...
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <>

        
        <meta name="description" content="Fan-inspired desk props, dioramas, and collectible objects for gamers, anime fans, and anyone with too much lore and not enough shelf space." />
        <meta property="og:title" content="Fandom Lab — Bedroom Studios" />
        <meta property="og:description" content="Fan-inspired desk props, dioramas, and collectible objects for gamers and fans with too much lore." />
      
      </>

      {/* ── Page header ── */}
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
            Fandom lab
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Dioramas, fan merch, and collectible desk nonsense with lore attached.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Think fandom-led drops, shelf pieces, mini environments, and collectible objects
            inspired by worlds people actually care about. Designed to look display-worthy even
            before anyone asks where you got them.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-ink bg-ink p-8 text-paper shadow-card">
          <p className="text-sm uppercase tracking-[0.25em] text-paper/60">Current trajectory</p>
          <p className="mt-5 font-display text-3xl font-bold leading-tight">
            Radiant Protocol. Global Offensive. Middle Realms. Wizarding Halls. Earth's Mightiest.
            And whatever else makes the group chat impossible to shut up about.
          </p>
          <p className="mt-5 text-paper/70">
            Expect sharper worldbuilding, richer iconography, and the kind of objects that make a
            shelf feel curated instead of merely occupied.
          </p>
        </div>
      </section>

      {/* ── Collections ── */}
      <div className="mt-12 space-y-16">
        {liveFandoms.map((collection) => (
          <FandomSection key={collection.id} collection={collection} />
        ))}
      </div>

      {/* ── Custom fandom builds CTA ── */}
      <section className="mt-12 rounded-[2.5rem] border border-ink bg-lime p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-ink/55">Custom fandom builds</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          From map-room dioramas to tactical desk props, this side of the studio is built for
          people who want collectibles with more atmosphere and less generic merch energy.
        </h2>
        <p className="mt-5 max-w-3xl text-lg text-ink/70">
          Limited drops, themed desk accessories, and commissioned display pieces can all live
          here without losing the clean, editorial feel of the main store.
        </p>
        <Link
          href="/commissions"
          className="mt-8 inline-flex rounded-full border border-ink px-5 py-3 font-medium transition hover:bg-ink hover:text-paper"
        >
          Pitch a custom fandom idea
        </Link>
      </section>
    </PageShell>
  );
}
