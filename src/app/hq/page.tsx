import HQClientFeatures from '@/components/hq/HQClientFeatures';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin HQ',
  description: 'Workshop personnel only.',
  alternates: {
    canonical: '/hq',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminHQPage() {
  return <HQClientFeatures />;
}
