
import PageShell from '@/components/PageShell';
import { footerPages } from '@/data/products';
import { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(footerPages).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = (footerPages as any)[slug];

  if (!content) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: content.title,
    description: content.intro,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: `${content.title} — Bedroom Studios`,
      description: content.intro,
    },
  };
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = (footerPages as any)[slug] ?? footerPages.shipping;

  return (
    <PageShell className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
      <div className="rounded-[2.5rem] border border-ink bg-paper p-8 shadow-card md:p-10">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          {content.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/70">{content.intro}</p>
        <div className="mt-10 space-y-6">
          {content.sections.map((section: any) => (
            <section key={section.title} className="rounded-[2rem] border border-ink/10 bg-paper p-6 md:p-8">
              <h2 className="font-display text-3xl font-bold leading-tight">{section.title}</h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((p: any, i: number) => (
                  <p key={i} className="text-base leading-relaxed text-ink/70">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {content.note ? (
          <div className="mt-8 rounded-[2rem] border border-ink bg-ink px-6 py-5 text-sm leading-relaxed text-paper/80">
            {content.note}
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
