
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import FandomSection from '@/components/fandoms/FandomSection';
import { fandomCollections } from '@/data/catalog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bedroom Labs',
  description: 'Experimental objects, prototypes, cast studies, and ideas that are still finding their final form.',
  alternates: {
    canonical: '/fandoms',
  },
  openGraph: {
    title: 'Bedroom Labs — Bedroom Studios',
    description: 'Experimental objects, prototypes, cast studies, and ideas that are still finding their final form.',
  },
};

export default function FandomPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      {/* ── Page header ── */}
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
            Bedroom labs
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Experimental builds, material studies, and products still figuring themselves out.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Think lamp studies, casting tests, weird side quests, and prototypes that deserve to be
            seen before they are polished enough for the main store.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-ink bg-ink p-8 text-paper shadow-card">
          <p className="text-sm uppercase tracking-[0.25em] text-paper/60">Current trajectory</p>
          <p className="mt-5 font-display text-3xl font-bold leading-tight">
            Hybrid lamp geometries. Mould-friendly ritual forms. Pigment tests. Better ways to let
            cement and printed parts work together instead of competing.
          </p>
          <p className="mt-5 text-paper/70">
            This branch exists so the main store can stay edited while the studio still gets to be
            curious in public.
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
        <p className="text-sm uppercase tracking-[0.25em] text-ink/55">What happens next</p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          The good experiments graduate. The odd ones stay gloriously weird.
        </h2>
        <p className="mt-5 max-w-3xl text-lg text-ink/70">
          If an experiment becomes stable, makeable, and worth repeating, it can move into the main
          catalog. If not, Bedroom Labs remains the archive for objects that are interesting anyway.
        </p>
        <Link
          href="/commissions"
          className="mt-8 inline-flex rounded-full border border-ink px-5 py-3 font-medium transition hover:bg-ink hover:text-paper"
        >
          Pitch an experimental brief
        </Link>
      </section>
    </PageShell>
  );
}
