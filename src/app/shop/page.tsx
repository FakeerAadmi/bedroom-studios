import PageShell from '@/components/PageShell';
import ShopClientFeatures from '@/components/shop/ShopClientFeatures';
import { productCategories } from '@/data/products';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse fidget gears, cable organisers, cement planters, desk organisers, and oddities. All small-batch, all made in India.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop — Bedroom Studios',
    description: 'Browse fidget gears, cable organisers, cement planters, desk organisers, and oddities. All small-batch, all made in India.',
  },
};

export default function ShopPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">      <ShopClientFeatures initialCategories={productCategories} />
    </PageShell>
  );
}
