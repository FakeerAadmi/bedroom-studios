import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Commissions',
  description: 'Request custom 3D printing and design commissions.',
  alternates: {
    canonical: '/commissions',
  },
  
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
