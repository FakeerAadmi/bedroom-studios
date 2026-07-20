import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fandom Lab',
  description: 'Props and totems inspired by the games you love.',
  alternates: {
    canonical: '/fandoms',
  },
  
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
