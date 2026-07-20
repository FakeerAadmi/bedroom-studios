import PageShell from '@/components/PageShell';
import WishlistContent from '@/components/wishlist/WishlistContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Your saved objects. Taste archived for later.',
  alternates: {
    canonical: '/wishlist',
  },
  openGraph: {
    title: 'Wishlist — Bedroom Studios',
    description: 'Your saved objects. Taste archived for later.',
  },
};

export default function WishlistPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <div className="max-w-3xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
          Wishlist
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Your saved objects. Taste archived for later.
        </h1>
      </div>

      <WishlistContent />
    </PageShell>
  );
}
