// @ts-nocheck

import PageShell from '@/components/PageShell';
import AnimatedCard from '@/components/AnimatedCard';
import { reviews } from '@/data/products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Small-batch, essentially handmade Indian desk objects. Built for people who care about their setups.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Our Story — Bedroom Studios',
    description: 'Small-batch, essentially handmade Indian desk objects. Built for people who care about their setups.',
  },
};

export default function AboutPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <div className="max-w-3xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
          Our story
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          We make objects for desks that deserve better than boring.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/70">
          Bedroom Studios exists in the space between product design, collectible culture, and
          deeply unnecessary levels of desk taste.
        </p>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.5rem] border border-ink bg-[#edf4ff] p-8 shadow-card">
          <p className="text-sm uppercase tracking-[0.25em] text-ink/50">The origin</p>
          <p className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight">
            Why are we doing this? Because mass-produced plastic is boring.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            We started this to make desk toys that actually survive your 3 PM existential dread.
            Somewhere between failed prints, concrete dust, and too much caffeine, the brand
            accidentally became real.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-ink bg-[#f4f1ea] p-8">
          <div className="flex h-full min-h-[18rem] flex-col justify-between rounded-[2rem] border border-dashed border-ink/20 p-6">
            <span className="text-sm uppercase tracking-[0.25em] text-ink/50">Studio notes</span>
            <p className="font-display text-3xl font-bold">
              Design objects with main-character energy. Ship them without drama.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <AnimatedCard
          delay={0.1}
          xOffset={-20}
          className="rounded-[2.5rem] border border-ink p-8"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-ink/50">3D printing</p>
          <p className="mt-5 font-display text-3xl font-bold leading-tight">
            Hours of tweaking settings, fighting stringing, and watching hot plastic magically
            become functional gear.
          </p>
        </AnimatedCard>

        <AnimatedCard
          delay={0.15}
          xOffset={20}
          className="rounded-[2.5rem] border border-ink bg-ink p-8 text-paper"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-paper/55">Cementware</p>
          <p className="mt-5 font-display text-3xl font-bold leading-tight">
            Mixing concrete in buckets, vibrating bubbles out, and waiting patiently. It&apos;s
            messy, it&apos;s heavy, and it doubles as self-defense.
          </p>
        </AnimatedCard>
      </section>

      <section className="mt-8 rounded-[2.5rem] border border-ink bg-lime p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-ink/50">The ethos</p>
        <p className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
          100% independent. 0% corporate fluff. Just good design for modern desks.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-ink bg-[#fff5de] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-ink/45">Tagline</p>
          <p className="mt-3 font-display text-2xl font-bold">Small-batch, essentially handmade Indian desk objects.</p>
        </div>
        <div className="rounded-[2rem] border border-ink bg-[#edf4ff] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-ink/45">Personality</p>
          <p className="mt-3 text-ink/70">Editorial taste, internet self-awareness, no fake luxury voice.</p>
        </div>
        <div className="rounded-[2rem] border border-ink bg-[#f4f1ea] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-ink/45">Promise</p>
          <p className="mt-3 text-ink/70">Useful things should not have to look generic to prove they work.</p>
        </div>
      </section>

      <section className="mt-10">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-ink/50">Vibe check</p>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Reviews from the desk frontier.</h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.author} className="rounded-[2rem] border border-ink p-6 shadow-card">
              <p className="font-display text-2xl font-bold leading-tight">&quot;{review.quote}&quot;</p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink/55">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
