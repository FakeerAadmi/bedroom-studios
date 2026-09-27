import PageShell from '@/components/PageShell';
import IlluminatedHomeShell from '@/components/home/IlluminatedHomeShell';
import { allProducts } from '@/data/catalog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bedroom Studios — Precision Desktop Objects & Architectural Luminaires',
  description: 'Small-batch 3D-printed architectural luminaires, brutalist cementware, and workspace artifacts. Pull chain to illuminate.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bedroom Studios — Precision Desktop Objects & Architectural Luminaires',
    description: 'Small-batch 3D-printed architectural luminaires, brutalist cementware, and workspace artifacts. Pull chain to illuminate.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <PageShell>
      <IlluminatedHomeShell allProducts={allProducts} />
    </PageShell>
  );
}
