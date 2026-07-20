import { Metadata } from 'next';
import { footerPages } from '@/data/products';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = (footerPages as any)[slug] ?? footerPages.shipping;

  return {
    title: content.title,
    description: content.intro,
    alternates: {
      canonical: `/${slug}`,
    },
  };
}

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
