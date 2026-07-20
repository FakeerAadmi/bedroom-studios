import PageShell from '@/components/PageShell';
import CheckoutClientFeatures from '@/components/checkout/CheckoutClientFeatures';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Clean checkout. No chaos. Mostly.',
  alternates: {
    canonical: '/checkout',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <CheckoutClientFeatures />
    </PageShell>
  );
}
