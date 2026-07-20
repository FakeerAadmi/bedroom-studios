// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { ArrowRight, LampDesk, Loader2 } from 'lucide-react';

import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { useStoreState } from '@/context/StoreContext';
import { getCountdownParts } from '@/utils';

const tickerItems = [
  'MADE IN INDIA',
  'CABLE MANAGEMENT SAVES LIVES',
  'UPI ACCEPTED',
  'TOUCH GRASS',
  'NOT ON AMAZON',
  'DESK SNACKS NOT INCLUDED',
  'HEAVY ENOUGH TO BE A WEAPON',
  "NOT YOUR BOSS'S DESK DECOR",
  "HR CAN'T SEE YOUR DESK FROM HERE",
  'MY BACK HURTS',
  'PAID FOR WITH ADULT MONEY',
];

export default function HomePage() {
  const { liveAllProducts, liveCategories, liveFandoms, isStoreLoading } = useStoreState();
  
  if (isStoreLoading) {
    return (
      <PageShell>
        <>
        
      </>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-40 text-ink/50">
          <Loader2 className="h-6 w-6 animate-spin text-ink/40" />
          <span className="font-mono text-xs uppercase tracking-widest">Loading Store...</span>
        </div>
      </PageShell>
    );
  }

  const upcomingDrops = liveAllProducts.filter((product) => product.limitedDrop).slice(0, 3);

  return (
    <PageShell>
      <>

        
        <meta name="description" content="Small-batch 3D printed desk toys, brutalist cementware, cable organizers, and fandom props. Designed and made in India." />
        <meta property="og:title" content="Bedroom Studios — Handmade Desk Objects, Made in India" />
        <meta property="og:description" content="Small-batch 3D printed desk toys, brutalist cementware, cable organizers, and fandom props. Designed and made in India." />
        <meta property="og:type" content="website" />
      
      </>
      {/* Ticker — mobile only, sits right under the header */}
      <div className="overflow-hidden border-b border-ink bg-ink py-3 text-paper md:hidden">
        <div className="ticker-track flex items-center min-w-max gap-6 px-6 text-[0.6rem] uppercase tracking-[0.35em]">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <div key={`m-${item}-${index}`} className="flex items-center gap-6">
              <span>{item}</span>
              <span className="opacity-60">✦</span>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 md:px-8 md:pb-20 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <span className="rounded-full border border-ink/15 px-4 py-2 text-[0.62rem] uppercase tracking-[0.12em] text-ink/60 md:text-xs md:tracking-[0.28em]">
              Handmade desk objects for people with open tabs
            </span>
            <h1 className="mt-6 max-w-4xl font-editorial text-5xl leading-[1.05] text-ink md:text-7xl">
              We print the things you didn&apos;t know you needed.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              Bedroom Studios makes tactile desk upgrades, collectible oddities, and brutalist
              cement pieces that are essentially handmade, small-batch, and full of more point of
              view than mass-produced setups usually bother with.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:scale-[1.01]"
            >
              Explore the Stash
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div
            initial={{ rotate: -4, opacity: 0, scale: 0.95 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-ink/15 bg-[#ece8dd] p-8 shadow-card"
          >
            <div className="absolute right-5 top-5 rounded-full border border-ink/15 bg-paper/80 px-3 py-1 text-xs uppercase tracking-[0.2em]">
              Bedroom made
            </div>
            <div className="flex min-h-[28rem] flex-col justify-between bg-[linear-gradient(160deg,rgba(255,255,255,0.55),rgba(0,87,255,0.1))] p-6">
              <div className="flex justify-end">
                <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] border border-ink/15 bg-paper/70">
                  <LampDesk className="h-16 w-16 text-ink" />
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-ink/55">Flagship weirdness</p>
                <p className="mt-3 max-w-sm font-editorial text-3xl">
                  The lamp that says, &quot;Yes, I do own a mood board.&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2.4rem] border border-ink bg-ink p-8 text-paper shadow-card">
            <p className="text-sm uppercase tracking-[0.25em] text-paper/55">Brand line</p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight md:text-5xl">
              Design-forward desk objects made in India for people who want utility with a point of view.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[2rem] border border-ink/15 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-ink/45">3D printed</p>
              <p className="mt-3 text-ink/70">Sharper forms, cleaner utility, better texture than generic setup clutter.</p>
            </div>
            <div className="rounded-[2rem] border border-ink/15 bg-[#f4f1ea] p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-ink/45">Cementware</p>
              <p className="mt-3 text-ink/70">Heavy, sculptural objects that make a workspace feel more considered.</p>
            </div>
            <div className="rounded-[2rem] border border-ink/15 bg-[#edf4ff] p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-ink/45">Collectibles</p>
              <p className="mt-3 text-ink/70">Shelf-worthy pieces and fandom drops that do not look like generic merch filler.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker — desktop only, in its natural position */}
      <div className="hidden overflow-hidden border-y border-ink bg-ink py-4 text-paper md:block">
        <div className="ticker-track flex items-center min-w-max gap-6 px-6 text-sm uppercase tracking-[0.35em]">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center gap-6">
              <span>{item}</span>
              <span className="opacity-60">✦</span>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-ink/50">Featured editorial</p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight md:text-5xl">
              Brutalist Cement Lamp
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2.3rem] border border-ink/15 bg-[#d7d1c9] p-6 shadow-card">
              <div className="flex h-full min-h-[22rem] flex-col justify-between rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(28,28,28,0.1))] p-6">
                <span className="w-fit rounded-full bg-paper/70 px-3 py-1 text-xs uppercase tracking-[0.25em]">
                  Cementware
                </span>
                <p className="max-w-sm font-editorial text-3xl leading-tight">
                  Poured, sanded, and emotionally overthought until it looked expensive.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[2.3rem] border border-ink/15 p-8">
              <p className="text-lg leading-relaxed text-ink/70">
                Half sculpture, half lighting fixture, and fully capable of making your desk
                look like it has opinions. Each one is mixed in small batches and finished by
                hand because factory perfection is a little boring.
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                <span className="text-sm uppercase tracking-[0.25em] text-ink/55">Small batch</span>
                <span className="font-display text-xl font-bold">₹1,499</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-8 md:pb-24">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-ink/50">Drop calendar</p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight md:text-5xl">
              Limited releases with a countdown, because scarcity is annoying but effective.
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {upcomingDrops.map((product) => {
            const countdown = getCountdownParts(product.releaseDate);

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className={`block rounded-[2.2rem] border border-ink/15 p-6 transition hover:-translate-y-1 hover:shadow-card ${product.panelClass}`}
              >
                <p className="text-sm uppercase tracking-[0.25em] text-ink/45">{product.categoryName}</p>
                <h3 className="mt-3 font-editorial text-3xl leading-tight">{product.name}</h3>
                <p className="mt-4 text-ink/70">{product.description}</p>
                <div className="mt-6 rounded-[1.6rem] border border-ink/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-ink/45">Drop countdown</p>
                  <p className="mt-2 font-display text-3xl font-bold">
                    {countdown.isLive
                      ? 'Live now'
                      : `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-8 md:pb-24">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-ink/50">Browse by category</p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight md:text-5xl">
              Built in families, not just random product tiles.
            </h2>
          </div>
          <Link href="/shop" className="hidden rounded-full border border-ink px-5 py-3 text-sm font-medium md:inline-flex">
            See all categories
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {liveCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/shop#${category.id}`}
              className={`block rounded-[2.2rem] border border-ink/15 p-6 transition hover:-translate-y-1 hover:shadow-card ${
                index % 3 === 0 ? 'bg-[#f4f1ea]' : index % 3 === 1 ? 'bg-[#edf4ff]' : 'bg-paper'
              }`}
            >
              <p className="text-sm uppercase tracking-[0.25em] text-ink/45">{category.eyebrow}</p>
              <h3 className="mt-3 font-editorial text-3xl leading-tight">{category.name}</h3>
              <p className="mt-4 text-ink/70">{category.description}</p>
              <p className="mt-5 rounded-[1.4rem] border border-ink/10 bg-white/70 p-4 text-sm text-ink/65">
                {category.note}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-8 md:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.4rem] border border-ink bg-ink p-8 text-paper shadow-card">
            <p className="text-sm uppercase tracking-[0.25em] text-paper/55">How we make things</p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight md:text-5xl">
              Printer gremlins, concrete dust, and too many revision loops.
            </h2>
            <p className="mt-5 max-w-xl text-paper/72">
              The workflow is half industrial design, half bedroom panic spiral. That is
              unfortunately where the charm comes from.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-ink/15 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-ink/45">3D printed tools</p>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                Small functional upgrades for desks, setups, and people who like their objects
                to feel thought-through, touched by actual humans, and not assembled by a brand deck.
              </p>
            </div>
            <div className="rounded-[2rem] border border-ink/15 bg-[#f4f1ea] p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-ink/45">Cement pieces</p>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                Heavier, moodier pieces mixed and finished in small runs for when your workspace
                needs less gadget and more gravitas.
              </p>
            </div>
            <div className="rounded-[2rem] border border-ink/15 bg-[#edf4ff] p-6 md:col-span-2">
              <p className="text-sm uppercase tracking-[0.25em] text-ink/45">Custom commissions</p>
              <p className="mt-4 text-lg leading-relaxed text-ink/70">
                If you want a desk object built around a specific setup, fandom, gift brief, or
                odd little idea, custom commissions are part of the studio. Expect thoughtful
                iteration, honest feasibility feedback, and objects that feel made for someone,
                not for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-28">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-ink bg-lime p-8 shadow-card">
            <p className="text-sm uppercase tracking-[0.25em] text-ink/55">Fandom branch</p>
            <h2 className="mt-4 font-editorial text-4xl leading-tight md:text-5xl">
              Also making dioramas, fandom merch, and collectible little worlds? Excellent.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
              Explore fandom-inspired desk pieces, shelf collectibles, and miniature scenes built
              for people who want their favourite worlds to exist a little closer to the keyboard.
            </p>
            <Link
              href="/fandoms"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 font-medium transition hover:bg-ink hover:text-paper"
            >
              Explore the fandom lab
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4">
            {liveFandoms.map((collection) => (
              <div key={collection.id} className="rounded-[2rem] border border-ink/15 p-5">
                <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
                  {collection.name}
                </p>
                <p className="mt-3 text-lg text-ink/70">{collection.fandoms.join(', ')}</p>
                <p className="mt-2 text-sm text-ink/55">{collection.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
