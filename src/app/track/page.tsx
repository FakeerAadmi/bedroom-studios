import PageShell from '@/components/PageShell';
import TrackClientFeatures from '@/components/track/TrackClientFeatures';

export const metadata = {
  title: 'Track Build — Bedroom Studios',
  description: 'Enter your credentials to access live manufacturing updates for your custom desk object.',
};

export default function OrderTrackerPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <TrackClientFeatures />
    </PageShell>
  );
}
