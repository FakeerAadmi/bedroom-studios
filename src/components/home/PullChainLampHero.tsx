"use client";

import React, { useEffect, useRef, type MutableRefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';

/* ─────────────────────────── TYPES ─────────────────────────── */

interface PullChainLampHeroProps {
  isLit: boolean;
  setIsLit: React.Dispatch<React.SetStateAction<boolean>>;
  onLitComplete?: () => void;
  activateLampRef?: MutableRefObject<(() => void) | null>;
}

interface ShelfObjectConfig {
  id: string;
  href: string;
  label: string;
  ariaLabel: string;
  imageSrc: string;
  width: number;
  height: number;
  className: string;
  distanceFromLamp: number; // 1 (closest) to 3 (farthest) for realistic light falloff
  mobileVisible: boolean;
}

export default function PullChainLampHero({
  isLit,
  setIsLit,
  onLitComplete,
  activateLampRef,
}: PullChainLampHeroProps) {
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
    if (isLit) return; // Only activate once

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

      // After 2.4s, smoothly scroll down into illuminated content
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

  /* ─── 5 Curated Physical Objects Config ─── */
  const leftShelfObjects: ShelfObjectConfig[] = [
    {
      id: 'framed-art',
      href: '/about',
      label: 'OUR STORY',
      ariaLabel: 'Our Story — Architect relief study',
      imageSrc: '/images/shelf-framed-art.png',
      width: 175,
      height: 158,
      className: 'w-[125px] h-[113px] sm:w-[150px] sm:h-[135px] md:w-[175px] md:h-[158px]',
      distanceFromLamp: 2.2, // farther left
      mobileVisible: false,
    },
    {
      id: 'arch-sculpture',
      href: '/fandoms',
      label: 'BEDROOM LABS',
      ariaLabel: 'Bedroom Labs — Cast brutalist architecture sculpture',
      imageSrc: '/images/shelf-arch-sculpture.png',
      width: 150,
      height: 170,
      className: 'w-[110px] h-[125px] sm:w-[130px] sm:h-[148px] md:w-[150px] md:h-[170px]',
      distanceFromLamp: 1.0, // immediately beside lamp on left
      mobileVisible: true,
    },
  ];

  const rightShelfObjects: ShelfObjectConfig[] = [
    {
      id: 'cement-incense',
      href: '/shop',
      label: 'CEMENTWARE',
      ariaLabel: 'Cementware — Stepped brutalist incense pedestal',
      imageSrc: '/images/shelf-cement-incense.png',
      width: 125,
      height: 160,
      className: 'w-[95px] h-[122px] sm:w-[110px] sm:h-[142px] md:w-[125px] md:h-[160px]',
      distanceFromLamp: 1.0, // immediately beside lamp on right
      mobileVisible: true,
    },
    {
      id: 'organizer-tray',
      href: '/shop',
      label: 'ORGANIZATION',
      ariaLabel: 'Shop Organization — Mineral cast catch-all tray',
      imageSrc: '/images/shelf-organizer-tray.png',
      width: 170,
      height: 103,
      className: 'w-[120px] h-[73px] sm:w-[145px] sm:h-[88px] md:w-[170px] md:h-[103px]',
      distanceFromLamp: 1.8, // mid-right
      mobileVisible: false,
    },
    {
      id: 'commission-model',
      href: '/commissions',
      label: 'COMMISSIONS',
      ariaLabel: 'Commissions — Precision timber and brass joint prototype',
      imageSrc: '/images/shelf-commission-model.png',
      width: 165,
      height: 145,
      className: 'w-[115px] h-[101px] sm:w-[140px] sm:h-[123px] md:w-[165px] md:h-[145px]',
      distanceFromLamp: 2.6, // far right
      mobileVisible: false,
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden select-none bg-[#07080b]">
      
      {/* ═══════════ LAYER 1: ATMOSPHERIC DARK ROOM BACKGROUND ═══════════ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep ambient dark room falloff */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,_rgba(16,15,14,0.85)_0%,_rgba(6,7,10,1)_90%)]" />
        {/* Subtle architectural wall plaster texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
        />
        {/* Upper room shadow */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#030406] to-transparent opacity-95" />
      </div>

      {/* ═══════════ LAYER 2: REALISTIC PHYSICAL LIGHTING (NO POLYGONS) ═══════════ */}
      {/* 
        Physically originates from the bulb inside the lampshade (~44% lamp height).
        Radiates downward onto the shelf and objects with soft, organic Gaussian falloff.
      */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out z-10 ${
          isLit ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* A. Small warm glow immediately inside/underneath the lampshade interior */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[280px] sm:w-[360px] h-[160px] rounded-full blur-2xl opacity-90"
          style={{
            bottom: 'calc(140px + 220px)', // directly aligned under lampshade rim
            background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 235, 170, 0.95) 0%, rgba(255, 185, 75, 0.7) 45%, rgba(230, 120, 30, 0.25) 75%, transparent 90%)',
          }}
        />

        {/* B. Soft downward warm light cone spreading over the shelf (extremely soft blurred falloff) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[600px] sm:w-[820px] md:w-[980px] h-[380px] rounded-b-full blur-3xl opacity-75 transition-all duration-1000"
          style={{
            bottom: '120px',
            background: 'radial-gradient(ellipse 65% 85% at 50% 10%, rgba(255, 220, 140, 0.6) 0%, rgba(255, 175, 70, 0.35) 45%, rgba(210, 120, 35, 0.12) 70%, transparent 85%)',
          }}
        />

        {/* C. Diffuse warm illumination pooling directly on the shelf surface around the lamp base */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[520px] sm:w-[740px] md:w-[860px] h-[90px] rounded-full blur-xl opacity-70"
          style={{
            bottom: '125px', // exactly on the shelf plane
            background: 'radial-gradient(ellipse 70% 100% at 50% 30%, rgba(255, 225, 145, 0.8) 0%, rgba(255, 180, 80, 0.4) 40%, rgba(200, 110, 30, 0.15) 70%, transparent 85%)',
          }}
        />

        {/* D. Ambient gentle fill illuminating the wall behind the shelf */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[700px] sm:w-[960px] h-[480px] rounded-full blur-3xl opacity-40"
          style={{
            bottom: '80px',
            background: 'radial-gradient(ellipse at 50% 40%, rgba(255, 195, 95, 0.3) 0%, rgba(235, 140, 45, 0.12) 50%, transparent 80%)',
          }}
        />
      </div>

      {/* ═══════════ LAYER 3: SHELF SCENE (LAMP + 5 PHOTOGRAPHIC OBJECTS) ═══════════ */}
      <div className="relative z-20 w-full flex flex-col items-center">

        {/* ── All objects and lamp sit on the exact same baseline (shelf top plane) ── */}
        <div className="relative flex items-end justify-center w-full max-w-[1240px] px-3 sm:px-6">

          {/* ── LEFT OBJECTS ── */}
          <div className="flex items-end justify-end gap-4 sm:gap-7 md:gap-9 mr-3 sm:mr-6 md:mr-8 mb-[2px]">
            {leftShelfObjects.map((obj) => {
              // Closer objects receive more light; farther objects remain moodier
              const litBrightness = obj.distanceFromLamp === 1.0 ? 1.05 : 0.82;
              const litContrast = obj.distanceFromLamp === 1.0 ? 1.02 : 1.0;

              return (
                <Link
                  key={obj.id}
                  href={obj.href}
                  aria-label={obj.ariaLabel}
                  tabIndex={isLit ? 0 : -1}
                  className={`group relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 rounded ${
                    obj.mobileVisible ? 'flex' : 'hidden sm:flex'
                  }`}
                >
                  {/* Object container with physical lighting response */}
                  <div
                    className={`relative ${obj.className} transition-all duration-1000 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1`}
                    style={{
                      filter: isLit
                        ? `brightness(${litBrightness}) contrast(${litContrast})`
                        : 'brightness(0.12) contrast(1.15) saturate(0.2)',
                    }}
                  >
                    <Image
                      src={obj.imageSrc}
                      alt={obj.label}
                      fill
                      sizes="(max-width: 640px) 130px, (max-width: 768px) 150px, 180px"
                      className="object-contain object-bottom drop-shadow-md"
                    />

                    {/* Subtle warm bounce light highlight on side facing lamp (active when lit) */}
                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                        isLit ? 'opacity-40 group-hover:opacity-60' : 'opacity-0'
                      }`}
                      style={{
                        background: 'linear-gradient(90deg, transparent 40%, rgba(255, 210, 120, 0.25) 100%)',
                        mixBlendMode: 'color-dodge',
                      }}
                    />
                  </div>

                  {/* Physical contact shadow directly on shelf wood */}
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-[6px] rounded-full pointer-events-none transition-all duration-700 ${
                      isLit ? 'opacity-70' : 'opacity-25'
                    }`}
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 75%)',
                    }}
                  />

                  {/* Understated hover label tooltip */}
                  <div
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none z-30 ${
                      isLit
                        ? 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                        : 'opacity-0'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-200/90 bg-[#120e0a]/85 border border-amber-900/40 backdrop-blur-md px-2.5 py-1 rounded shadow-lg">
                      {obj.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ═══════════ CENTER FOCAL POINT: TIFFANY LAMP ═══════════ */}
          <motion.div
            animate={lampControls}
            className="relative z-30 flex-shrink-0 pointer-events-none mb-[2px]"
          >
            {/* Lamp container: dominant ~40% viewport scale, 638:959 aspect ratio */}
            <div className="relative w-[240px] h-[360px] sm:w-[280px] sm:h-[420px] md:w-[320px] md:h-[480px] pointer-events-auto">

              {/* Internal bulb radiance behind stained glass panels */}
              <div
                className={`absolute top-[12%] left-1/2 -translate-x-1/2 w-[74%] h-[38%] rounded-full pointer-events-none transition-opacity duration-700 blur-xl ${
                  isLit ? 'opacity-85' : 'opacity-0'
                }`}
                style={{
                  background: 'radial-gradient(circle, rgba(255, 230, 140, 0.8) 0%, rgba(255, 150, 45, 0.35) 60%, transparent 85%)',
                }}
              />

              {/* OFF STATE LAMP (authentic isolated transparent PNG, no background) */}
              <div className="absolute inset-0 transition-opacity duration-700">
                <Image
                  src="/images/lamp-isolated-off.png"
                  alt="Handcrafted Tiffany stained glass lamp"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>

              {/* ON STATE LAMP (vibrant glowing stained glass & warm brass reflection) */}
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
                  className="object-contain object-bottom"
                />
              </div>

              {/* ── LAYER 4: INTERACTIVE PHYSICAL PULL CHAIN ── */}
              <div
                className="absolute z-40 cursor-grab active:cursor-grabbing"
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
                  {/* Invisible hit area */}
                  <div className="absolute -inset-x-4 -inset-y-3 cursor-grab active:cursor-grabbing" />

                  {/* Golden beaded chain links */}
                  <div className="flex flex-col items-center gap-[2px]">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full border border-[#2b1807]/80 bg-gradient-to-br from-[#ffe19f] via-[#c68936] to-[#6c4014] shadow-sm transition-transform group-hover:scale-110"
                      />
                    ))}
                  </div>

                  {/* Weighted brass teardrop fob */}
                  <div className="mt-0.5 flex flex-col items-center">
                    <div className="h-6 w-3 sm:h-7 sm:w-3.5 rounded-b-full rounded-t-sm border border-[#231306] bg-gradient-to-b from-[#ffe5a8] via-[#cf903b] to-[#734316] shadow-md group-hover:scale-115 transition-transform" />
                  </div>
                </motion.div>
              </div>

              {/* Lamp contact shadow directly under the brass foot on the shelf */}
              <div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-[70%] h-[7px] rounded-full pointer-events-none transition-opacity duration-700 ${
                  isLit ? 'opacity-85' : 'opacity-40'
                }`}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 75%)',
                }}
              />
            </div>

            {/* Lamp navigation link to Lighting catalog when lit */}
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

            {/* Understated hover label for lamp */}
            <div
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none z-30 ${
                isLit ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
              }`}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-200/90 bg-[#120e0a]/85 border border-amber-900/40 backdrop-blur-md px-2.5 py-1 rounded shadow-lg">
                LIGHTING
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT OBJECTS ── */}
          <div className="flex items-end justify-start gap-4 sm:gap-7 md:gap-9 ml-3 sm:ml-6 md:mr-0 md:ml-8 mb-[2px]">
            {rightShelfObjects.map((obj) => {
              const litBrightness = obj.distanceFromLamp === 1.0 ? 1.05 : obj.distanceFromLamp < 2.0 ? 0.92 : 0.8;
              const litContrast = obj.distanceFromLamp === 1.0 ? 1.02 : 1.0;

              return (
                <Link
                  key={obj.id}
                  href={obj.href}
                  aria-label={obj.ariaLabel}
                  tabIndex={isLit ? 0 : -1}
                  className={`group relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 rounded ${
                    obj.mobileVisible ? 'flex' : 'hidden sm:flex'
                  }`}
                >
                  {/* Object container with physical lighting response */}
                  <div
                    className={`relative ${obj.className} transition-all duration-1000 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1`}
                    style={{
                      filter: isLit
                        ? `brightness(${litBrightness}) contrast(${litContrast})`
                        : 'brightness(0.12) contrast(1.15) saturate(0.2)',
                    }}
                  >
                    <Image
                      src={obj.imageSrc}
                      alt={obj.label}
                      fill
                      sizes="(max-width: 640px) 130px, (max-width: 768px) 150px, 180px"
                      className="object-contain object-bottom drop-shadow-md"
                    />

                    {/* Subtle warm bounce light highlight on side facing lamp (active when lit) */}
                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                        isLit ? 'opacity-40 group-hover:opacity-60' : 'opacity-0'
                      }`}
                      style={{
                        background: 'linear-gradient(270deg, transparent 40%, rgba(255, 210, 120, 0.25) 100%)',
                        mixBlendMode: 'color-dodge',
                      }}
                    />
                  </div>

                  {/* Physical contact shadow directly on shelf wood */}
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-[6px] rounded-full pointer-events-none transition-all duration-700 ${
                      isLit ? 'opacity-70' : 'opacity-25'
                    }`}
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 75%)',
                    }}
                  />

                  {/* Understated hover label tooltip */}
                  <div
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none z-30 ${
                      isLit
                        ? 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
                        : 'opacity-0'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-200/90 bg-[#120e0a]/85 border border-amber-900/40 backdrop-blur-md px-2.5 py-1 rounded shadow-lg">
                      {obj.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>

        {/* ═══════════ REALISTIC PHYSICAL FURNITURE SHELF ═══════════ */}
        {/*
          Constructed with true perspective depth:
          1. Receding top surface plane with dark oiled walnut wood grain & specular light pool
          2. Front beveled edge/lip with golden specular reflection
          3. Solid vertical front apron slab
          4. Deep drop shadow falling down the wall below
        */}
        <div className="relative w-full z-20">
          
          {/* 1. Shelf Top Surface Plane (Receding Depth) */}
          <div
            className={`relative h-[22px] sm:h-[28px] transition-all duration-1000 ${
              isLit ? 'brightness-100' : 'brightness-[0.22]'
            }`}
            style={{
              background: 'linear-gradient(180deg, #3d2c1c 0%, #2e2014 55%, #20150b 100%)',
              borderTop: '1px solid rgba(135, 95, 50, 0.35)',
            }}
          >
            {/* Fine longitudinal wood grain lines */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.06) 12px, rgba(255,255,255,0.06) 14px)',
              }}
            />

            {/* Warm specular light pool directly on wood under lamp when lit */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                isLit ? 'opacity-85' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(ellipse 65% 100% at 50% 0%, rgba(255, 215, 125, 0.55) 0%, rgba(255, 160, 50, 0.2) 45%, transparent 75%)',
              }}
            />
          </div>

          {/* 2. Front Beveled Lip / Chamfer Edge */}
          <div
            className={`relative h-[3px] transition-all duration-1000 ${
              isLit ? 'brightness-100' : 'brightness-[0.3]'
            }`}
            style={{
              background: isLit
                ? 'linear-gradient(90deg, #3a2818 10%, rgba(255, 230, 160, 0.8) 50%, #3a2818 90%)'
                : 'linear-gradient(90deg, #24180d 0%, #3a2818 50%, #24180d 100%)',
            }}
          />

          {/* 3. Solid Front Apron Slab */}
          <div
            className={`relative h-[30px] sm:h-[38px] transition-all duration-1000 ${
              isLit ? 'brightness-90' : 'brightness-[0.18]'
            }`}
            style={{
              background: 'linear-gradient(180deg, #24190f 0%, #1a1108 55%, #100a04 100%)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Subtle vertical grain texture */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.12) 4px, rgba(255,255,255,0.12) 5px)',
              }}
            />

            {/* Soft downward light gradient spilled on front face from lamp */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                isLit ? 'opacity-70' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(ellipse 55% 100% at 50% 0%, rgba(255, 205, 110, 0.3) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* 4. Deep Drop Shadow Cast on Wall Below */}
          <div
            className="h-[65px] sm:h-[85px] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.12) 70%, transparent 100%)',
            }}
          />

        </div>

      </div>

    </div>
  );
}
