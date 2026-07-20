// @ts-nocheck
import PageShell from '@/components/PageShell';
import ShopClientFeatures from '@/components/shop/ShopClientFeatures';
import { productCategories } from '@/data/products';

export default function ShopPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <>
        <meta name="description" content="Browse fidget gears, cable organisers, cement planters, desk organisers, and oddities. All small-batch, all made in India." />
        <meta property="og:title" content="Shop — Bedroom Studios" />
        <meta property="og:description" content="Browse fidget gears, cable organisers, cement planters, desk organisers, and oddities. All small-batch, all made in India." />
      </>

      <ShopClientFeatures initialCategories={productCategories} />
    </PageShell>
  );
}
