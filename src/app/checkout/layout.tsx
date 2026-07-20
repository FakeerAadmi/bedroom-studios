import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase securely.',
  alternates: {
    canonical: '/checkout',
  },
  
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
