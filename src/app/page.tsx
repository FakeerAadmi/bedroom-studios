import { ArrowRight, ChevronRight, Sparkles, Terminal, CheckCircle2, Shield, Layers, Cpu, Zap } from 'lucide-react';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import ProductCard from '@/components/ProductCard';
import StudioWorkbench from '@/components/home/StudioWorkbench';
import { HeroRadialOrb, ModernShojiIcon, BoofaLampIcon, HotAirBalloonIcon, CementPlinthIcon } from '@/components/icons/ProductIcons';
import { productCategories, allProducts } from '@/data/catalog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bedroom Studios — Precision Desktop Objects & Architectural Luminaires',
  description: 'Small-batch 3D-printed architectural luminaires, brutalist cementware, and workspace artifacts. Engineered in India.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bedroom Studios — Precision Desktop Objects & Architectural Luminaires',
    description: 'Small-batch 3D-printed architectural luminaires, brutalist cementware, and workspace artifacts. Engineered in India.',
    type: 'website',
  },
};

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

export default function HomePage() {
  const deskLamps = allProducts.filter((p) => p.categoryId === 'desk-lamps');
  const cementware = allProducts.filter((p) => p.categoryId === 'cementware');

  return (
    <PageShell>
      {/* ── Top Technical Ticker ── */}
      <div className="overflow-hidden border-b border-ink/10 bg-[#faf9f5] py-2.5 text-ink/60 font-mono text-[10px] tracking-[0.25em]">
        <div className="ticker-track flex items-center min-w-max gap-8 px-6 uppercase">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-6">
              <span>{item}</span>
              <span className="text-[#d4ff00]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. HERO SECTION (Deepgram-inspired with giant typography & luminous central orb) ── */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-[#faf9f5] pt-16 pb-20 md:pt-24 md:pb-32">
        {/* Subtle background architectural curve lines */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-40" viewBox="0 0 1440 800" fill="none">
          <path d="M-100,200 C300,50 800,450 1600,100" stroke="#E5E2D9" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M-50,600 C400,750 900,250 1500,700" stroke="#E5E2D9" strokeWidth="1" />
          <circle cx="720" cy="220" r="420" stroke="#E5E2D9" strokeWidth="0.75" strokeDasharray="4 6" />
        </svg>

        {/* Giant ghosted brand typography behind orb */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none text-center">
          <span className="font-display text-[14vw] font-bold tracking-tight text-ink/[0.04] leading-none">
            BEDROOM
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 flex flex-col items-center text-center z-10">
          {/* Central Luminous Radial Orb (Deepgram style) */}
          <div className="mb-10 cursor-pointer transition-transform duration-500 hover:scale-105">
            <HeroRadialOrb size={260} />
          </div>

          {/* Main Headline */}
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/80 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-ink/70 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#d4ff00] border border-ink" />
              <span>Additive & Cast Desk Objects // Studio v2.0</span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl md:text-7xl leading-[1.08]">
              The Desktop Object Standard Crafted by Bedroom Studios
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg text-ink/70 leading-relaxed font-sans">
              Precision 3D-printed architectural luminaires, brutalist cementware, and workspace artifacts. Engineered in small batches with zero mass-production waste.
            </p>
          </div>

          {/* Action Button Pills */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2.5 rounded-full border border-ink bg-[#d4ff00] px-7 py-4 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-sm transition hover:bg-ink hover:text-[#d4ff00] hover:scale-[1.02]"
            >
              <span>Submit Order Request</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#workbench"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/90 px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition hover:border-ink hover:bg-white"
            >
              <span>Explore Workbench</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TECHNICAL INDEX STRIP (001, 002, 003, 004 Hairline Grid) ── */}
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

                  {/* Icon */}
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

      {/* ── 3. INTERACTIVE WORKBENCH CONSOLE ── */}
      <div id="workbench">
        <StudioWorkbench />
      </div>

      {/* ── 4. UNIFIED STUDIO STANDARD (Deepgram Voice Agent API Architecture Replica) ── */}
      <section className="border-y border-ink/10 bg-[#faf9f5] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
              Architecture & Metallurgy
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl text-ink">
              A single, unified Studio Build Standard
            </h2>
            <p className="mt-4 text-sm md:text-base text-ink/70 leading-relaxed">
              Instead of gluing together generic parts, Bedroom Studios unifies CAD geometry, custom filament formulations, hand-cast minerals, and verified electronics into singular desk artifacts.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
            {/* Left: Interactive Build Principles */}
            <div className="space-y-4">
              {studioSteps.map((step, idx) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-ink hover:shadow-sm"
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

            {/* Right: Technical Isometric Exploded Stack Diagram */}
            <div className="relative rounded-[2.5rem] border border-ink/15 bg-[#f5f2ea] p-8 md:p-12 shadow-card overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-4 py-6">
                {/* Layer 5: Diffuser Shade */}
                <div className="w-64 rounded-2xl border border-ink bg-white/90 p-4 shadow-sm text-center">
                  <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">LAYER 05</span>
                  <p className="font-display text-sm font-bold text-ink">Optical Washi Diffuser Shell</p>
                  <p className="text-[11px] font-mono text-ink/60 mt-0.5">Vase Mode Translucent PETG (0.16mm)</p>
                </div>

                <div className="h-6 w-0.5 border-l border-dashed border-ink/40" />

                {/* Layer 4: Internal Core Module */}
                <div className="w-56 rounded-2xl border border-ink bg-[#d4ff00]/40 p-4 shadow-sm text-center">
                  <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">LAYER 04</span>
                  <p className="font-display text-sm font-bold text-ink">5V High-CRI LED Core</p>
                  <p className="text-[11px] font-mono text-ink/60 mt-0.5">Inline Dimmer / USB 2.0 / Zero Heat</p>
                </div>

                <div className="h-6 w-0.5 border-l border-dashed border-ink/40" />

                {/* Layer 3: Gyroid Infill Matrix */}
                <div className="w-64 rounded-2xl border border-ink bg-white/90 p-4 shadow-sm text-center">
                  <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">LAYER 03</span>
                  <p className="font-display text-sm font-bold text-ink">Structural Gyroid Infill</p>
                  <p className="text-[11px] font-mono text-ink/60 mt-0.5">15% Triple-Periodic Minimal Surface</p>
                </div>

                <div className="h-6 w-0.5 border-l border-dashed border-ink/40" />

                {/* Layer 2: Cast Plinth */}
                <div className="w-72 rounded-2xl border border-ink bg-[#e8e4db] p-4 shadow-sm text-center">
                  <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">LAYER 02</span>
                  <p className="font-display text-sm font-bold text-ink">Hand-Cast Portland Cement Base</p>
                  <p className="text-[11px] font-mono text-ink/60 mt-0.5">High-Density Weighted Plinth (~650g)</p>
                </div>

                <div className="h-6 w-0.5 border-l border-dashed border-ink/40" />

                {/* Layer 1: Anti-Skid Foundation */}
                <div className="w-80 rounded-xl border border-ink bg-ink p-3 text-center text-paper">
                  <span className="font-mono text-[10px] text-paper/50 uppercase tracking-widest">LAYER 01</span>
                  <p className="font-display text-xs font-bold text-[#d4ff00]">Acoustic Felt Desk Cushion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FULL OBJECT SHOWCASE (MINIMAL VECTOR ICONS ONLY) ── */}
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
            Click any schematic to inspect specifications or queue a made-to-order run directly to our studio.
          </p>
        </div>

        {/* Desk Lamps Grid */}
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

        {/* Cementware Grid */}
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

      {/* ── 6. CHOOSE YOUR STUDIO JOURNEY (Deepgram 3-Card Architecture) ── */}
      <section className="border-t border-ink/10 bg-[#f6f4ed] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
              Studio Tracks
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl text-ink">
              Choose your Studio Journey
            </h2>
            <p className="mt-3 text-sm text-ink/65">
              Select the path that matches your desktop workspace requirements and ritual needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-[2.2rem] border border-ink/15 bg-white p-8 flex flex-col justify-between shadow-sm transition hover:shadow-card hover:-translate-y-1">
              <div>
                <span className="font-mono text-xs text-ink/50 uppercase tracking-widest">PATH 01</span>
                <div className="my-6">
                  <ModernShojiIcon size={52} />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">Desk Luminaires</h3>
                <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                  Sculptural ambient lighting engineered with micro-diffusers and low-heat LED cores for late night deep focus.
                </p>
              </div>
              <Link
                href="/shop"
                className="mt-8 inline-flex items-center justify-between rounded-full border border-ink/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-[#d4ff00] hover:border-ink font-semibold"
              >
                <span>Browse Luminaires</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="rounded-[2.2rem] border border-ink/15 bg-white p-8 flex flex-col justify-between shadow-sm transition hover:shadow-card hover:-translate-y-1">
              <div>
                <span className="font-mono text-xs text-ink/50 uppercase tracking-widest">PATH 02</span>
                <div className="my-6">
                  <CementPlinthIcon size={52} />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">Mineral Cementware</h3>
                <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                  Raw Portland cement objects cured 48 hours in silicone forms. Grounding, heavy desk anchors with natural pore variations.
                </p>
              </div>
              <Link
                href="/shop"
                className="mt-8 inline-flex items-center justify-between rounded-full border border-ink/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-[#d4ff00] hover:border-ink font-semibold"
              >
                <span>Browse Cementware</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="rounded-[2.2rem] border border-ink/15 bg-white p-8 flex flex-col justify-between shadow-sm transition hover:shadow-card hover:-translate-y-1">
              <div>
                <span className="font-mono text-xs text-ink/50 uppercase tracking-widest">PATH 03</span>
                <div className="my-6">
                  <HotAirBalloonIcon size={52} />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink">Custom Commissions</h3>
                <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                  Have an idiosyncratic desktop brief, specific dimension requirement, or custom shade idea? We iterate bespoke runs with you.
                </p>
              </div>
              <Link
                href="/commissions"
                className="mt-8 inline-flex items-center justify-between rounded-full border border-ink/20 px-5 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-[#d4ff00] hover:border-ink font-semibold"
              >
                <span>Inquire Commission</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS & PROVENANCE (Deepgram 6-Card Grid) ── */}
      <section className="border-t border-ink/10 bg-[#faf9f5] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
              Verified Workstations
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl text-ink">
              Trusted by creators and workspaces
            </h2>
            <p className="mt-3 text-sm text-ink/65">
              Read feedback from developers, designers, and collectors using Bedroom Studios pieces.
            </p>
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
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40 bg-[#f4f2eb] px-2.5 py-1 rounded-md">
                    {t.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. BOTTOM HERO CTA (Deepgram style) ── */}
      <section className="border-t border-ink/10 bg-[#f4f1ea] py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 md:px-8 space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink/50">
            Batch Production Queue
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl text-ink">
            Unlock studio-grade desktop objects
          </h2>
          <p className="mx-auto max-w-xl text-base text-ink/70 leading-relaxed font-sans">
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
    </PageShell>
  );
}
