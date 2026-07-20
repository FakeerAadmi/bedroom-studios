import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Build',
  description: 'Track the status of your order.',
  alternates: {
    canonical: '/track',
  },
  
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
