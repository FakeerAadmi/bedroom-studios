"use client";

import React, { useEffect, useRef, type MutableRefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

/* ─────────────────────────── TYPES ─────────────────────────── */

interface PullChainLampHeroProps {
  isLit: boolean;
  setIsLit: React.Dispatch<React.SetStateAction<boolean>>;
  onLitComplete?: () => void;
  activateLampRef?: MutableRefObject<(() => void) | null>;
}

/* ─────────────── SHELF OBJECTS (SVG + Navigation) ─────────── */

interface ShelfObjectProps {
  href: string;
  label: string;
  isLit: boolean;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

function ShelfObject({ href, label, isLit, children, className = '', ariaLabel }: ShelfObjectProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel || label}
      className={`group relative flex flex-col items-center transition-all duration-700 outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10] rounded-sm ${className}`}
      tabIndex={isLit ? 0 : -1}
    >
      {/* Object container with lighting response */}
      <div
        className={`relative transition-all duration-700 ease-out ${
          isLit
            ? 'brightness-100 saturate-100 group-hover:brightness-125 group-hover:scale-[1.06]'
            : 'brightness-[0.18] saturate-0'
        }`}
        style={{
          filter: isLit
            ? undefined
            : 'brightness(0.18) saturate(0)',
        }}
      >
        {children}
      </div>

      {/* Contact shadow */}
      <div
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full pointer-events-none transition-all duration-700 ${
          isLit ? 'opacity-50' : 'opacity-15'
        }`}
        style={{
          width: '80%',
          height: '4px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
        }}
      />

      {/* Hover warm glow */}
      <div
        className={`absolute inset-0 -inset-x-2 -inset-y-1 rounded-lg pointer-events-none transition-opacity duration-300 ${
          isLit ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse, rgba(255,200,100,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Label tooltip on hover */}
      <div
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none ${
          isLit
            ? 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
            : 'opacity-0'
        }`}
      >
        <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-amber-200/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {label}
        </span>
      </div>
    </Link>
  );
}

/* ─────────── INDIVIDUAL OBJECT SVGs ─────────── */

function CementCube() {
  return (
    <svg width="48" height="44" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top face */}
      <polygon points="8,14 24,6 40,14 24,22" fill="#6b6560" />
      {/* Left face */}
      <polygon points="8,14 24,22 24,40 8,32" fill="#4a4540" />
      {/* Right face */}
      <polygon points="40,14 24,22 24,40 40,32" fill="#3a3530" />
      {/* Subtle edge highlight */}
      <line x1="24" y1="6" x2="24" y2="22" stroke="#7a756e" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

function BookStack() {
  return (
    <svg width="42" height="38" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottom book - dark burgundy */}
      <rect x="3" y="24" width="38" height="10" rx="1" fill="#3a2025" />
      <rect x="3" y="24" width="3" height="10" rx="0.5" fill="#4a2830" />
      {/* Middle book - dark navy */}
      <rect x="1" y="14" width="36" height="10" rx="1" fill="#1e2535" />
      <rect x="1" y="14" width="3" height="10" rx="0.5" fill="#283040" />
      {/* Top book - dark sage */}
      <rect x="5" y="4" width="34" height="10" rx="1" fill="#2a3028" />
      <rect x="5" y="4" width="3" height="10" rx="0.5" fill="#354035" />
    </svg>
  );
}

function BrassTray() {
  return (
    <svg width="56" height="18" viewBox="0 0 56 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tray body */}
      <ellipse cx="28" cy="12" rx="26" ry="5" fill="#4a3820" />
      <ellipse cx="28" cy="11" rx="24" ry="4" fill="#5a4828" />
      {/* Inner surface */}
      <ellipse cx="28" cy="10.5" rx="21" ry="3" fill="#3a2c18" />
      {/* Rim highlight */}
      <ellipse cx="28" cy="9" rx="22" ry="2.5" fill="none" stroke="#6a5830" strokeWidth="0.5" opacity="0.6" />
      {/* Small incense stick */}
      <line x1="20" y1="10" x2="38" y2="9" stroke="#5a4530" strokeWidth="1" strokeLinecap="round" />
      {/* Smoke wisp */}
      <path d="M38 9 Q39 6 37.5 3 Q36 0 37 -2" stroke="#8a8580" strokeWidth="0.4" fill="none" opacity="0.3" />
    </svg>
  );
}

function SmallFrame() {
  return (
    <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Frame outer */}
      <rect x="2" y="2" width="28" height="38" rx="1" fill="#3a3020" stroke="#5a4830" strokeWidth="0.8" />
      {/* Mat / inner border */}
      <rect x="5" y="5" width="22" height="32" rx="0.5" fill="#1a1810" />
      {/* Abstract artwork inside - simple mountain/landscape */}
      <path d="M5 30 L12 18 L16 22 L22 12 L27 20 L27 37 L5 37 Z" fill="#252018" />
      <circle cx="22" cy="10" r="2" fill="#302818" />
    </svg>
  );
}

function GeometricBrass() {
  return (
    <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tetrahedron / obelisk shape */}
      {/* Left face */}
      <polygon points="18,2 4,44 18,38" fill="#4a3820" />
      {/* Right face */}
      <polygon points="18,2 32,44 18,38" fill="#5a4828" />
      {/* Base face */}
      <polygon points="4,44 32,44 18,38" fill="#3a2c18" />
      {/* Edge highlights */}
      <line x1="18" y1="2" x2="4" y2="44" stroke="#6a5830" strokeWidth="0.4" opacity="0.5" />
      <line x1="18" y1="2" x2="32" y2="44" stroke="#7a6838" strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

export default function PullChainLampHero({ isLit, setIsLit, onLitComplete, activateLampRef }: PullChainLampHeroProps) {
  const chainControls = useAnimation();
  const lampControls = useAnimation();
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mechanical switch audio synthesizer (Web Audio API)
  const playClickSound = (release = false) => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const freq = release ? 1850 : 1250;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const handlePullChain = () => {
    if (isLit) return; // Only activate, never toggle off

    // 1. Mechanical switch click sound
    playClickSound(false);
    setTimeout(() => playClickSound(true), 120);

    // 2. Physical beaded chain spring & pendulum animation
    chainControls.start({
      y: [0, 44, -6, 2, 0],
      rotate: [0, 10, -7, 4, -2, 0],
      transition: {
        duration: 0.85,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: 'easeOut',
      },
    });

    // 3. Subtle physical recoil on the lamp from the chain pull
    lampControls.start({
      rotate: [0, 0.5, -0.3, 0.1, 0],
      y: [0, 2, -1, 0],
      transition: {
        duration: 0.65,
        ease: 'easeOut',
      },
    });

    // 4. Brief delay before switch contacts close and bulb ignites
    setTimeout(() => {
      setIsLit(true);

      // After 2.4s, trigger smooth scroll into illuminated content
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = setTimeout(() => {
        onLitComplete?.();
        const el = document.getElementById('illuminated-content');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
        }
      }, 2400);
    }, 120);
  };

  // Expose activation function to parent for inactivity auto-switch
  useEffect(() => {
    if (activateLampRef) {
      activateLampRef.current = handlePullChain;
    }
  });

  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    };
  }, []);

  /* ─── Shelf Navigation Objects ─── */
  const shelfObjects = [
    { id: 'books',     href: '/about',       label: 'OUR STORY',    component: <BookStack />,      ariaLabel: 'Our Story',    mobile: true },
    { id: 'tray',      href: '/shop',        label: 'SHOP',         component: <BrassTray />,      ariaLabel: 'Shop All',     mobile: false },
    // Lamp is center — not in this array
    { id: 'frame',     href: '/commissions', label: 'COMMISSIONS',  component: <SmallFrame />,     ariaLabel: 'Commissions',  mobile: true },
    { id: 'geometric', href: '/fandoms',     label: 'BEDROOM LABS', component: <GeometricBrass />, ariaLabel: 'Bedroom Labs', mobile: false },
  ];

  const leftObjects = shelfObjects.slice(0, 2);
  const rightObjects = shelfObjects.slice(2);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-end justify-center overflow-hidden select-none bg-[#08090d] pb-[8vh]">

      {/* ═══════════ LAYER 1: ATMOSPHERIC DARK ROOM BACKGROUND ═══════════ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep room atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_rgba(18,16,14,0.7)_0%,_rgba(8,9,13,1)_85%)]" />
        {/* Ceiling shadow */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#040506] to-transparent opacity-90" />
        {/* Subtle wall texture — dark plaster grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>

      {/* ═══════════ LAYER 2: PROJECTED LIGHT ═══════════ */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out z-10 ${
          isLit ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Downward Expanding Conical Light Beam */}
        <div
          className="absolute inset-x-0 bottom-0 transition-all duration-1000 ease-out"
          style={{
            top: 'calc(50% - 6vh)',
            transformOrigin: 'top center',
            transform: isLit ? 'scaleY(1)' : 'scaleY(0.7)',
            clipPath: 'polygon(calc(50% - 180px) 0%, calc(50% + 180px) 0%, 100% 100%, 0% 100%)',
            background: 'linear-gradient(180deg, rgba(255, 228, 150, 0.65) 0%, rgba(255, 190, 85, 0.4) 20%, rgba(255, 160, 50, 0.2) 50%, rgba(250, 246, 238, 0.8) 88%, rgba(250, 246, 238, 1) 100%)',
          }}
        />

        {/* Soft Ambient Glow at the light source */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[420px] sm:w-[540px] h-[280px] rounded-full pointer-events-none blur-3xl opacity-70"
          style={{
            top: 'calc(50% - 8vh)',
            background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 215, 120, 0.55) 0%, rgba(255, 170, 60, 0.2) 50%, transparent 80%)',
          }}
        />

        {/* Warm light pooling on the shelf surface */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[80px] rounded-full pointer-events-none blur-xl opacity-50"
          style={{
            bottom: 'calc(8vh + 50px)',
            background: 'radial-gradient(ellipse, rgba(255, 210, 130, 0.5) 0%, rgba(255, 170, 60, 0.15) 60%, transparent 85%)',
          }}
        />
      </div>

      {/* ═══════════ LAYER 2.5: SHELF ENVIRONMENT ═══════════ */}
      {/* The physical shelf surface extends full-width behind the lamp */}
      <div className="relative z-[12] w-full flex flex-col items-center">

        {/* ── Scene Container: Lamp + Objects on Shelf ── */}
        <div className="relative flex items-end justify-center w-full max-w-[900px] px-4">

          {/* Left shelf objects */}
          <div className="hidden sm:flex items-end gap-6 sm:gap-8 mb-1 mr-4 sm:mr-8">
            {leftObjects.map((obj) => (
              <ShelfObject
                key={obj.id}
                href={obj.href}
                label={obj.label}
                isLit={isLit}
                ariaLabel={obj.ariaLabel}
              >
                {obj.component}
              </ShelfObject>
            ))}
          </div>

          {/* ═══════════ LAYER 3: ISOLATED PHYSICAL LAMP ═══════════ */}
          <motion.div
            animate={lampControls}
            className="relative z-20 flex-shrink-0 pointer-events-none"
          >
            {/* Lamp Frame — 638:959 aspect ratio */}
            <div className="relative w-[220px] h-[330px] sm:w-[280px] sm:h-[420px] md:w-[320px] md:h-[480px] pointer-events-auto">

              {/* Internal bulb glow behind glass (only when lit) */}
              <div
                className={`absolute top-[12%] left-1/2 -translate-x-1/2 w-[72%] h-[38%] rounded-full pointer-events-none transition-opacity duration-700 blur-xl ${
                  isLit ? 'opacity-80' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(circle, rgba(255, 220, 130, 0.7) 0%, rgba(255, 140, 40, 0.3) 60%, transparent 85%)',
                }}
              />

              {/* OFF STATE LAMP (transparent PNG) */}
              <div className="absolute inset-0 transition-opacity duration-700">
                <Image
                  src="/images/lamp-isolated-off.png"
                  alt="Handcrafted Tiffany stained glass lamp"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* ON STATE LAMP (transparent PNG) */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isLit ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src="/images/lamp-isolated-on.png"
                  alt="Tiffany stained glass lamp illuminated"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* ═══════════ LAYER 4: INTERACTIVE PULL CHAIN ═══════════ */}
              <div
                className="absolute z-30 cursor-grab active:cursor-grabbing"
                style={{ top: '43.2%', left: '66.8%' }}
              >
                <motion.div
                  animate={chainControls}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 46 }}
                  dragElastic={0.25}
                  whileHover={{ rotate: [0, -3, 3, -1, 0], transition: { duration: 0.4 } }}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 10) {
                      handlePullChain();
                    } else {
                      chainControls.start({
                        y: 0,
                        rotate: [0, 5, -5, 2, 0],
                        transition: { duration: 0.45, ease: 'easeOut' },
                      });
                    }
                  }}
                  onClick={handlePullChain}
                  className="flex flex-col items-center select-none group"
                  style={{ transformOrigin: 'top center' }}
                  title="Pull chain to illuminate"
                >
                  {/* Hit area */}
                  <div className="absolute -inset-x-4 -inset-y-3 cursor-grab active:cursor-grabbing" />

                  {/* Beaded chain links */}
                  <div className="flex flex-col items-center gap-[2px]">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full border border-[#2b1807]/80 bg-gradient-to-br from-[#ffe19f] via-[#c68936] to-[#6c4014] shadow-sm transition-transform group-hover:scale-110"
                      />
                    ))}
                  </div>

                  {/* Weighted brass fob */}
                  <div className="mt-0.5 flex flex-col items-center">
                    <div className="h-6 w-3 sm:h-7 sm:w-3.5 rounded-b-full rounded-t-sm border border-[#231306] bg-gradient-to-b from-[#ffe5a8] via-[#cf903b] to-[#734316] shadow-md group-hover:scale-115 transition-transform" />
                  </div>
                </motion.div>
              </div>

              {/* Lamp contact shadow on the shelf */}
              <div
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-[6px] rounded-full pointer-events-none transition-opacity duration-700 ${
                  isLit ? 'opacity-60' : 'opacity-30'
                }`}
                style={{
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* Lamp → Lighting shop link (active when lit) */}
            {isLit && (
              <Link
                href="/shop"
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label="Shop Lighting"
                tabIndex={0}
              >
                <span className="sr-only">Shop Lighting</span>
              </Link>
            )}

            {/* Lamp hover label */}
            <div
              className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none z-30 ${
                isLit ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
              }`}
            >
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-amber-200/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                LIGHTING
              </span>
            </div>
          </motion.div>

          {/* Right shelf objects */}
          <div className="hidden sm:flex items-end gap-6 sm:gap-8 mb-1 ml-4 sm:ml-8">
            {rightObjects.map((obj) => (
              <ShelfObject
                key={obj.id}
                href={obj.href}
                label={obj.label}
                isLit={isLit}
                ariaLabel={obj.ariaLabel}
              >
                {obj.component}
              </ShelfObject>
            ))}
          </div>
        </div>

        {/* Mobile shelf objects (shown below the lamp on small screens) */}
        <div className="flex sm:hidden items-end justify-center gap-6 mt-2 mb-1">
          {shelfObjects
            .filter((obj) => obj.mobile)
            .map((obj) => (
              <ShelfObject
                key={obj.id}
                href={obj.href}
                label={obj.label}
                isLit={isLit}
                ariaLabel={obj.ariaLabel}
              >
                {obj.component}
              </ShelfObject>
            ))}
        </div>

        {/* ── SHELF SURFACE ── */}
        <div className="relative w-full">
          {/* Shelf top surface — warm dark walnut */}
          <div
            className={`relative h-[10px] sm:h-[14px] transition-all duration-700 ${
              isLit ? 'brightness-100' : 'brightness-[0.3]'
            }`}
            style={{
              background: 'linear-gradient(180deg, #4a3822 0%, #3a2c1a 40%, #2e2214 100%)',
              borderTop: '1px solid rgba(120, 90, 50, 0.25)',
            }}
          />

          {/* Shelf front face / edge — darker with wood grain depth */}
          <div
            className={`relative h-[18px] sm:h-[24px] transition-all duration-700 ${
              isLit ? 'brightness-90' : 'brightness-[0.2]'
            }`}
            style={{
              background: 'linear-gradient(180deg, #2e2214 0%, #221a0e 50%, #1a1208 100%)',
              borderTop: '1px solid rgba(80, 60, 30, 0.15)',
            }}
          >
            {/* Subtle wood grain lines */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 4px)',
            }} />
          </div>

          {/* Shadow cast beneath the shelf */}
          <div className="h-[40px] sm:h-[60px]" style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 40%, transparent 100%)',
          }} />
        </div>

        {/* Wall behind shelf — subtle dark wainscoting panel */}
        <div
          className={`absolute top-0 inset-x-0 -z-10 h-full pointer-events-none transition-all duration-700 ${
            isLit ? 'opacity-30' : 'opacity-10'
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(25,20,15,0) 0%, rgba(25,20,15,0.4) 70%, rgba(25,20,15,0.6) 100%)',
          }}
        />
      </div>
    </div>
  );
}
