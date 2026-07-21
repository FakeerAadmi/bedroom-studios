import PageShell from '@/components/PageShell';
import ShopClientFeatures from '@/components/shop/ShopClientFeatures';
import { productCategories } from '@/data/catalog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse small-batch desk objects, ritual pieces, shelf objects, and hybrid builds made in India.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop — Bedroom Studios',
    description: 'Browse small-batch desk objects, ritual pieces, shelf objects, and hybrid builds made in India.',
  },
};

export default function ShopPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">      <ShopClientFeatures initialCategories={productCategories} />
    </PageShell>
  );
}
