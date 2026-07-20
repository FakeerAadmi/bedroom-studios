import PageShell from '@/components/PageShell';
import CheckoutClientFeatures from '@/components/checkout/CheckoutClientFeatures';

export const metadata = {
  title: 'Checkout — Bedroom Studios',
  description: 'Clean checkout. No chaos. Mostly.',
};

export default function CheckoutPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <CheckoutClientFeatures />
    </PageShell>
  );
}
