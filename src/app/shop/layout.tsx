import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our collection of 3D printed gadgets and cementware.',
  alternates: {
    canonical: '/shop',
  },
  
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
