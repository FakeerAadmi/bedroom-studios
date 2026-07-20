// @ts-nocheck
/**
 * CLIENT COMPONENT
 * Reason: Uses `framer-motion` for animations, `useState` for mobile menu, `usePathname` for active link state, and `useCart` context.
 */
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

const links = [
  { to: '/', label: 'Home',        num: '01' },
  { to: '/shop', label: 'Shop',    num: '02' },
  { to: '/fandoms', label: 'Fandom Lab', num: '03' },
  { to: '/commissions', label: 'Commissions', num: '04' },
  { to: '/about', label: 'Our Story', num: '05' },
];

// Animated 3-bar → X hamburger using SVG paths
function HamburgerIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      {/* Top bar */}
      <motion.line
        x1="2" y1="4" x2="16" y2="4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { x1: 3, y1: 3, x2: 15, y2: 15 } : { x1: 2, y1: 4, x2: 16, y2: 4 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
      {/* Middle bar */}
      <motion.line
        x1="2" y1="9" x2="16" y2="9"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        style={{ transformOrigin: 'center' }}
      />
      {/* Bottom bar */}
      <motion.line
        x1="2" y1="14" x2="16" y2="14"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { x1: 3, y1: 15, x2: 15, y2: 3 } : { x1: 2, y1: 14, x2: 16, y2: 14 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function Navbar() {
  const { itemCount, setIsCartOpen, wishlistIds } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function closeMobile() { setMobileOpen(false); }

  return (
    <>
      <header id="global-navbar" className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">

          {/* Wordmark */}
          <Link href="/" className="flex flex-col" onClick={closeMobile}>
            <span className="font-display text-lg font-bold tracking-tight leading-[0.9] md:leading-normal">
              Bedroom<br className="md:hidden" />
              <span className="md:ml-1">Studios</span>
            </span>
            <span className="hidden text-[0.65rem] uppercase tracking-[0.28em] text-ink/45 md:block">
              Handmade Indian desk objects
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-[0.2em] transition ${
                    isActive ? 'text-accent' : 'text-ink/60 hover:text-ink'
                  }`
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1.5 text-xs font-bold text-ink">
                {wishlistIds.length}
              </span>
            </Link>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className="relative inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-sm font-medium"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1.5 text-xs font-bold text-paper">
                {itemCount}
              </span>
            </motion.button>

            {/* Animated hamburger */}
            <motion.button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((prev) => !prev)}
              whileTap={{ scale: 0.92 }}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition md:hidden ${
                mobileOpen
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/20 text-ink hover:border-ink'
              }`}
            >
              <HamburgerIcon open={mobileOpen} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
              className="fixed inset-0 z-30 bg-ink/15 backdrop-blur-md md:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[73px] mt-3 z-40 mx-3 overflow-hidden rounded-[2.2rem] border border-white/30 bg-paper/65 shadow-[0_12px_48px_rgba(28,28,26,0.18)] backdrop-blur-2xl md:hidden"
            >
              {/* Nav links */}
              <nav className="px-3 pt-3 pb-1">
                {links.map((link, i) => {
                  const isActive = pathname === link.to;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.055, duration: 0.22, ease: 'easeOut' }}
                    >
                      <Link
                        href={link.to}
                        onClick={closeMobile}
                        className="group relative flex items-center justify-between rounded-[1.4rem] px-4 py-3.5 transition-colors"
                        style={isActive ? { background: 'rgba(28,28,26,1)' } : {}}
                      >
                        {/* Hover bg for non-active */}
                        {!isActive && (
                          <motion.div
                            layoutId="navHover"
                            className="absolute inset-0 rounded-[1.4rem] bg-ink/6 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}

                        <div className="relative flex items-baseline gap-3">
                          {/* Number */}
                          <span className={`font-display text-[0.6rem] font-bold tracking-[0.2em] ${
                            isActive ? 'text-paper/40' : 'text-ink/25'
                          }`}>
                            {link.num}
                          </span>
                          {/* Label */}
                          <span className={`font-display text-2xl font-bold tracking-tight ${
                            isActive ? 'text-paper' : 'text-ink/80 group-hover:text-ink'
                          }`}>
                            {link.label}
                          </span>
                        </div>

                        {/* Arrow icon */}
                        <motion.div
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.055 }}
                          className={`relative rounded-full p-1.5 transition ${
                            isActive
                              ? 'bg-paper/15 text-paper'
                              : 'bg-ink/6 text-ink/40 group-hover:bg-ink/10 group-hover:text-ink/70'
                          }`}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="mx-4 border-t border-ink/8" />

              {/* Quick actions — cart + wishlist */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38 }}
                className="flex items-center gap-3 px-6 py-4"
              >
                <button
                  type="button"
                  onClick={() => { closeMobile(); setIsCartOpen(true); }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[1.2rem] border border-ink/10 bg-ink/5 px-4 py-3 text-sm font-medium text-ink/70 transition hover:bg-ink/10 hover:text-ink"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Cart
                  <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1.5 text-xs font-bold text-paper">
                    {itemCount}
                  </span>
                </button>

                <Link
                  href="/wishlist"
                  onClick={closeMobile}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[1.2rem] border border-ink/10 bg-ink/5 px-4 py-3 text-sm font-medium text-ink/70 transition hover:bg-ink/10 hover:text-ink"
                >
                  <Heart className="h-4 w-4" />
                  Saved
                  <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1.5 text-xs font-bold text-ink">
                    {wishlistIds.length}
                  </span>
                </Link>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.44 }}
                className="border-t border-ink/8 bg-ink/4 px-6 py-3.5"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-ink/30">
                  Bedroom Studios · Made with anxiety in India ✕
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
