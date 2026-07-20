import PageShell from '@/components/PageShell';
import CommissionClientFeatures from '@/components/commissions/CommissionClientFeatures';

export const metadata = {
  title: 'Custom Commissions — Bedroom Studios',
  description: 'Commission a custom desk object, fandom prop, diorama, or collectible display. We build to your brief — small-batch, made in India.',
};

function InfoBlock({ body, title }) {
  return (
    <div className="rounded-[1.8rem] border border-ink/10 bg-[#f4f1ea] p-5">
      <p className="text-sm uppercase tracking-[0.25em] text-ink/45">{title}</p>
      <p className="mt-3 text-ink/70">{body}</p>
    </div>
  );
}

export default function CommissionPage() {
  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
            Commission desk
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Custom builds for fandom people, gift givers, and tasteful obsessives.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            If the catalog gets close but not quite there, this is where custom desk objects,
            themed props, collectible displays, and dioramas begin.
          </p>

          <div className="mt-8 grid gap-4">
            <InfoBlock title="Budget realism" body="Tell us the range early. It saves everyone from a beautiful but impossible idea." />
            <InfoBlock title="Fandom context" body="Name the world, character, scene, map, or reference energy you want us to interpret." />
            <InfoBlock title="Use case" body="Display piece, desk prop, event gift, content shoot, shelf collectible, or something stranger." />
          </div>
        </div>

        <CommissionClientFeatures />
      </section>
    </PageShell>
  );
}
