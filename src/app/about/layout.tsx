import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'The story behind Bedroom Studios.',
  alternates: {
    canonical: '/about',
  },
  
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
