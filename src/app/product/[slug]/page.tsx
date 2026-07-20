// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from 'react';
import { Heart, ShoppingBag, Share2, Loader2 } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import PageShell from '@/components/PageShell';
import ProductCard from '@/components/ProductCard';
import { getCategoryById } from '@/data/products';
import { useStoreState } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { formatPrice, getCountdownParts } from '@/utils';

// ─── Material deep-dive copy ────────────────────────────────────────────────
// Keyed by the first entry in product.materials[]. Add new keys as new
// materials are introduced. Each guide renders a full editorial block on the
// product page, styled to match the rest of the design system.
const materialGuides = {
  'PLA+': {
    eyebrow: 'Material · PLA+',
    headline: 'The workhorse. Rigid, clean, and dialled in.',
    body: 'PLA+ is our go-to for desk objects that need a sharp edge and a matte surface that feels considered. It prints at higher detail than standard PLA, handles light stress well, and takes a sand-and-paint finish beautifully. Not ideal near direct heat sources — keep it off dashboards in May.',
    specs: [
      ['Finish', 'Matte, layer-line visible or sanded smooth'],
      ['Rigidity', 'High — holds its form under normal desk use'],
      ['Heat tolerance', 'Up to ~55°C — fine for indoor AC rooms'],
      ['Eco note', 'Plant-based, compostable under industrial conditions'],
    ],
  },
  'Cast cement': {
    eyebrow: 'Material · Cementware',
    headline: 'Hand-poured in small batches. Heavier than it looks.',
    body: 'Our cement pieces are mixed from Portland cement, fine sand, and mineral pigment in small batches — no two pieces have identical surface variation. Each one is poured into a mould, vibrated to remove air pockets, and cured for at least 72 hours before demoulding. The surface is then sanded by hand and sealed. The result is dense, tactile, and genuinely permanent.',
    specs: [
      ['Mix', 'Portland cement + fine sand + mineral pigment'],
      ['Finish', 'Raw sanded or sealed matte — your product page shows which'],
      ['Weight', 'Substantially heavier than it appears — that is the point'],
      ['Care', 'Wipe with a damp cloth. No soaking. No dragging on polished stone'],
    ],
  },
  'Flexible TPU': {
    eyebrow: 'Material · TPU',
    headline: 'Flexible filament. Grip, give, and function first.',
    body: 'TPU (Thermoplastic Polyurethane) is what lets cable clips, grips, and flexible objects actually flex without snapping. It is printed at a slower speed than rigid filaments, which gives it a more consistent surface. Great for anything that needs to stay put without leaving marks on desks or wires.',
    specs: [
      ['Flexibility', 'High — compresses and returns to shape'],
      ['Surface', 'Slightly grippy, matte texture'],
      ['Heat tolerance', 'Up to ~80°C — more resilient than PLA+'],
      ['Use case', 'Cable clips, grips, anything that needs to bend without breaking'],
    ],
  },
  PETG: {
    eyebrow: 'Material · PETG',
    headline: "More resilient. Better for India's climate.",
    body: "PETG runs stronger and more heat-resistant than PLA+ — it handles temperatures up to around 80°C, which makes it a better choice for objects near windows, in cars, or in non-AC rooms during summer. It has a slightly glossier surface out of the printer, which we sand back to matte before finishing.",
    specs: [
      ['Finish', 'Naturally slight gloss — sanded to matte for our objects'],
      ['Rigidity', 'High, with some flex — less brittle than PLA+ under impact'],
      ['Heat tolerance', 'Up to ~80°C — significantly more summer-safe'],
      ['Use case', 'Objects near sunlight, outdoor-adjacent spots, or heated rooms'],
    ],
  },
  'Resin-filled shell': {
    eyebrow: 'Material · Weighted Resin',
    headline: 'Cast resin. Smooth, dense, and unexpectedly heavy.',
    body: 'Our resin objects are poured from a 2-part polyurethane or epoxy resin into silicone or 3D-printed moulds. The result is a glass-smooth exterior with a satisfying weight that feels more expensive than the price suggests. Surface pigments and inclusions are mixed in before the pour — each batch has slight colour variation.',
    specs: [
      ['Finish', 'Glass-smooth exterior, fully sealed'],
      ['Weight', 'Heavier than printed PLA objects of equivalent size'],
      ['Heat tolerance', 'Moderate — avoid prolonged direct sunlight on coloured pieces'],
      ['Care', 'Wipe with a dry cloth. Avoid harsh solvents near pigmented surfaces'],
    ],
  },
};

function getMaterialGuide(materials) {
  if (!materials?.length) return null;
  return materialGuides[materials[0]] ?? null;
}

// ─── SpecCard ────────────────────────────────────────────────────────────────
function SpecCard({ body, title }) {
  return (
    <div className="rounded-[1.8rem] border border-ink/10 bg-[#f4f1ea] p-5">
      <p className="text-sm uppercase tracking-[0.25em] text-ink/45">{title}</p>
      <p className="mt-3 text-ink/70">{body}</p>
    </div>
  );
}

// ─── ProductPage ─────────────────────────────────────────────────────────────
export default function ProductPage() {
  const { slug } = useParams() as { slug: string };
  const { allProductsBySlug, liveCategories, isStoreLoading } = useStoreState();
  const product = allProductsBySlug?.[slug];
  const { addItem, addRecentlyViewed, toggleWishlist, wishlistIds } = useCart();
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? '');
  const [selectedMaterial, setSelectedMaterial] = useState(product?.materialOptions?.[0] ?? '');
  const [copiedLink, setCopiedLink] = useState(false);

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
        console.log('Share canceled or failed:', err);
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

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setSelectedColor('');
      setSelectedMaterial('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);


  const mainMaterial = product?.materials?.[0]?.toLowerCase() || '';
  let materialSustainTitle = 'Built to Outlast';
  let materialSustainText = 'We use materials designed to survive your desk setup for years to come.';
  if (mainMaterial.includes('pla')) {
    materialSustainTitle = 'Plant-based PLA+';
    materialSustainText = "Our filament is industrially compostable (if you ever decide to throw out your setup, which you won't).";
  } else if (mainMaterial.includes('cement')) {
    materialSustainTitle = 'Forever Concrete';
    materialSustainText = "Mixed by hand in tiny batches. It literally lasts forever, so there's zero planned obsolescence here.";
  } else if (mainMaterial.includes('tpu')) {
    materialSustainTitle = 'Indestructible TPU';
    materialSustainText = "This flexible material is virtually impossible to break, meaning it won't snap and end up in a landfill next year.";
  } else if (mainMaterial.includes('resin')) {
    materialSustainTitle = 'Zero-Waste Resin';
    materialSustainText = "Hand-poured in exact quantities for each mould so there is absolutely zero chemical waste from over-production.";
  } else if (mainMaterial.includes('petg')) {
    materialSustainTitle = 'Climate-Proof PETG';
    materialSustainText = "Tough enough to survive direct Indian summers without warping, meaning you only ever have to buy it once.";
  }

  if (isStoreLoading) {
    return (
      <PageShell>
        <>
        
      </>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-40 text-ink/50">
          <Loader2 className="h-6 w-6 animate-spin text-ink/40" />
          <span className="font-mono text-xs uppercase tracking-widest">Loading Product...</span>
        </div>
      </PageShell>
    );
  }

  if (!product) {
    return (
      <PageShell className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4">
        <div className="rounded-[2.5rem] border border-dashed border-ink/20 p-8 text-ink/65">
          That product wandered off. Head back to the{' '}
          <Link href="/shop" className="text-accent">shop</Link>.
        </div>
      </PageShell>
    );
  }

  const category = liveCategories?.find(c => c.id === product.categoryId);
  const relatedProducts = category?.products
    .filter((item) => item.id !== product.id)
    .slice(0, 3) ?? [];
  const countdown = getCountdownParts(product.releaseDate);
  const isWishlisted = wishlistIds.includes(product.id);
  const materialGuide = getMaterialGuide(product.materials);

  // Guard against products that don't yet have optional selector fields
  const colors = product.colors ?? [];
  const materialOptions = product.materialOptions ?? [];

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <>

        
        <meta name="description" content={`${product.story} ${product.materials?.join(', ')}. Made in India by Bedroom Studios.`} />
        <meta property="og:title" content={`${product.name} — Bedroom Studios`} />
        <meta property="og:description" content={product.story} />
      
      </>

      {/* ── Hero: gallery + product info ── */}
      <section className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">

        {/* Left — gallery */}
        <div className="contents lg:block lg:space-y-5">
          <div className="order-1 flex flex-wrap gap-4 lg:order-none">
            <span className="rounded-full border border-ink px-4 py-2 text-xs uppercase tracking-[0.25em]">
              {product.categoryName}
            </span>
            {product.limitedDrop ? (
              <span className="collectible-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]">
                Limited drop
              </span>
            ) : null}
          </div>

          <div className="order-2 lg:order-none">
            <div className={`rounded-[2.8rem] border border-ink/15 p-6 ${product.panelClass}`}>
              <div className={`relative min-h-[25rem] overflow-hidden rounded-[2.2rem] bg-gradient-to-br ${product.color} p-6 ${product.textureClass}`}>
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    priority
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover" 
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_45%)]" />
                    <div className="relative flex h-full items-end">
                      <div className="max-w-sm rounded-[1.6rem] border border-white/30 bg-white/65 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-ink/45">Hero placeholder</p>
                        <p className="mt-2 text-sm text-ink/70">
                          Drop your main product photo here later. The block is already doing the spacing job.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="order-4 lg:order-none">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 lg:grid lg:overflow-x-visible lg:pb-0 scrollbar-hide">
              {product.gallery.slice(1).map((frame) => (
                <div key={frame.label} className={`min-w-[85vw] snap-center lg:min-w-0 rounded-[2rem] border border-ink/15 p-4 relative overflow-hidden ${frame.className}`}>
                  {frame.image ? (
                    <>
                      <Image 
                        src={frame.image} 
                        alt={frame.label} 
                        fill
                        sizes="(max-width: 1024px) 85vw, 33vw"
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/10 to-transparent z-[1]" />
                      <div className="relative flex min-h-[12rem] flex-col justify-between rounded-[1.6rem] border border-white/20 bg-white/45 p-4 z-[2]">
                        <div className="text-xs uppercase tracking-[0.25em] text-ink font-bold">{frame.label}</div>
                        <p className="max-w-xs text-sm text-ink/90 font-medium leading-relaxed">{frame.caption}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex min-h-[12rem] flex-col justify-between rounded-[1.6rem] border border-white/30 bg-white/45 p-4">
                      <div className="text-xs uppercase tracking-[0.25em] text-ink/45">{frame.label}</div>
                      <p className="max-w-xs text-sm text-ink/70">{frame.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — product info + controls */}
        <div className="contents lg:block lg:space-y-6">
          <div className="order-3 lg:order-none">
            <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
              Bedroom Studios
            </p>
            <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">{product.story}</p>
          </div>

          {/* Purchase card */}
          <div className="order-5 lg:order-none rounded-[2rem] border border-ink/15 bg-white/65 p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-3xl font-bold">{formatPrice(product.price)}</p>
                <p className="mt-2 text-sm text-ink/60">{product.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {/* Share Button with Tooltip */}
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

                {/* Wishlist Button */}
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

            {/* Limited drop countdown */}
            {product.limitedDrop ? (
              <div className="mt-5 rounded-[1.6rem] border border-ink bg-ink px-4 py-4 text-paper">
                <p className="text-xs uppercase tracking-[0.25em] text-paper/60">Next release window</p>
                <p className="mt-2 font-display text-3xl font-bold">
                  {countdown.isLive
                    ? 'Drop is live'
                    : `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`}
                </p>
              </div>
            ) : null}

            {/* Colorway selector */}
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

            {/* Material selector */}
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

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={(product.price === null || product.price === undefined) || (colors.length > 0 && !selectedColor) || (materialOptions.length > 0 && !selectedMaterial)}
                onClick={() => addItem({ ...product, selectedColor, selectedMaterial })}
                className={`inline-flex flex-[1.25] items-center justify-center gap-3 rounded-full px-6 py-4 font-medium transition ${
                  ((product.price === null || product.price === undefined) || (colors.length > 0 && !selectedColor) || (materialOptions.length > 0 && !selectedMaterial))
                    ? 'bg-ink/10 text-ink/40 cursor-not-allowed border border-ink/10'
                    : 'bg-ink text-paper hover:bg-accent'
                }`}
              >
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">
                  {product.price === null || product.price === undefined ? 'Coming soon' : 'Add to cart'}
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

          {/* Spec cards */}
          <div className="order-6 grid gap-4 md:grid-cols-2 lg:order-none">
            <SpecCard title="Dimensions" body={product.dimensions} />
            <SpecCard title="Materials" body={product.materials?.join(' · ') ?? '—'} />
            <SpecCard title="Care" body={product.care} />
            <SpecCard title="Good for" body={product.goodFor?.join(' · ') ?? '—'} />
          </div>
        </div>
      </section>

      {/* ── Material deep-dive ── */}
      {materialGuide && (
        <section className="mt-14">
          <div className="grid gap-6 lg:grid-cols-[0.45fr_0.55fr]">
            <div className={`rounded-[2.5rem] border border-ink/15 p-8 ${product.panelClass}`}>
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] opacity-50">
                {materialGuide.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
                {materialGuide.headline}
              </h2>
              <p className="mt-5 text-base leading-relaxed opacity-75">{materialGuide.body}</p>
            </div>

            <div className="rounded-[2.5rem] border border-ink/15 bg-paper/70 p-8">
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
                Material specs
              </p>
              <div className="mt-6 overflow-hidden rounded-[1.8rem] border border-ink/10">
                {materialGuide.specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[0.4fr_0.6fr] border-b border-ink/10 bg-paper px-5 py-4 last:border-b-0"
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-ink/45">{label}</p>
                    <p className="text-ink/70">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Sustainability ── */}
      <section className="mt-14 rounded-[2.5rem] border border-ink/15 bg-lime p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
              Eco & Logistics
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              We try not to ruin the planet, mostly because we live here.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Look, we print plastic and pour concrete. We're not claiming to save the rainforest. But we manufacture intentionally, avoiding the pitfalls of mass production and planned obsolescence.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="rounded-[1.8rem] border border-ink/10 bg-paper/60 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em]">{materialSustainTitle}</p>
              <p className="mt-2 text-sm text-ink/70">{materialSustainText}</p>
            </div>
            <div className="rounded-[1.8rem] border border-ink/10 bg-paper/60 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em]">Zero Dead Stock</p>
              <p className="mt-2 text-sm text-ink/70">Small batches mean we only make what people actually want. No landfill waste from unsold hype drops.</p>
            </div>
            <div className="rounded-[1.8rem] border border-ink/10 bg-paper/60 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em]">No Corporate Packaging</p>
              <p className="mt-2 text-sm text-ink/70">It arrives safe, but we don't waste your money on 14 layers of glossy unboxing cardboard. You're throwing it away anyway.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Editorial note ── */}
      <section className="mt-14">
        <div className={`rounded-[2.5rem] border border-ink/15 p-8 md:p-12 ${product.panelClass}`}>
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] opacity-50">
            Editorial note
          </p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight">
            Small-batch, essentially handmade Indian desk objects for people who care how useful things look.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed opacity-75">{product.categoryIdentity}</p>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="mt-14">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
            Reviews
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Desk people had opinions. Mostly nice ones.
          </h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {product.reviews.map((review) => (
            <div key={review.author} className="rounded-[2rem] border border-ink/15 p-6 shadow-card">
              <p className="font-display text-2xl font-bold leading-tight">&quot;{review.quote}&quot;</p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink/55">{review.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related products ── */}
      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
                Same category
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">More from this family</h2>
            </div>
            <Link
              href="/shop"
              className="hidden rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent md:inline-flex"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((related, index) => (
              <ProductCard key={related.id} product={related} index={index} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
