import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Items',
  description: 'View your saved items.',
  alternates: {
    canonical: '/wishlist',
  },
  
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
