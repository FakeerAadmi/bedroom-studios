
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <PageShell className="mx-auto flex min-h-[75vh] max-w-7xl items-center px-4 py-10 md:px-8">
      <div className="w-full">
        <div className="grid gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:items-center">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/40">
              404 — Off the map
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
              You wandered somewhere that doesn't exist yet.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/65">
              The page you're looking for either moved, never existed, or is still being overthought
              in a bedroom somewhere.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent"
              >
                Browse the Shop
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 font-medium transition hover:border-accent hover:text-accent"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative rounded-[2.5rem] border border-ink/15 bg-[#f4f1ea] p-10 shadow-card">
              <p className="text-center font-display text-[8rem] font-bold leading-none tracking-tight text-ink/10 md:text-[10rem]">
                404
              </p>
              <p className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-ink/50">
                Nothing here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
