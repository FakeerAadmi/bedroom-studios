import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HQ',
  description: 'Admin dashboard.',
  alternates: {
    canonical: '/hq',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
