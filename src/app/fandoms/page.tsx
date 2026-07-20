// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FandomSection from '@/components/fandoms/FandomSection';
import { fandomCollections } from '@/data/products';

export default function FandomPage() {
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
        {fandomCollections.map((collection) => (
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
