// @ts-nocheck
/**
 * SERVER COMPONENT
 * Reason: Footer contains purely static layout and links. It does not require any 
 * client-side state, context, hooks, or framer-motion animations.
 */
import Link from 'next/link';

const quickLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/fandoms', label: 'Fandom Lab' },
  { to: '/commissions', label: 'Commissions' },
  { to: '/about', label: 'Our Story' },
  { to: '/track', label: 'Track Build' },
  { to: '/wishlist', label: 'Saved Items' },
];

const policyLinks = [
  { to: '/shipping', label: 'Shipping' },
  { to: '/returns', label: 'Returns' },
  { to: '/faq', label: 'FAQ' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight">Bedroom Studios</span>
              <span className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-ink/45">
                Handmade Indian desk objects
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/55">
              Small-batch, essentially handmade desk objects built in India. Equal parts product
              design, collected chaos, and bedroom panic spiral.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-[#f4f1ea] px-4 py-2 text-xs uppercase tracking-[0.22em] text-ink/55">
              <span className="h-1.5 w-1.5 rounded-full bg-lime"></span>
              Made in India
            </div>
          </div>

          {/* Col 2 — Quick Nav */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-ink/40">Navigate</p>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-sm transition hover:text-ink text-ink/55"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Policy */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-ink/40">Policies</p>
            <ul className="mt-4 space-y-3">
              {policyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-sm text-ink/55 transition hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-ink/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Bedroom Studios. All rights reserved.</p>
          <Link
            href="/about"
            className="transition hover:text-ink/70"
          >
            Made with anxiety and lots of caffeine in India ✦
          </Link>
        </div>
      </div>
    </footer>
  );
}

