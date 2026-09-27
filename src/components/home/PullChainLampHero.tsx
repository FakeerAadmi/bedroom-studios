"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowDown, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface PullChainLampHeroProps {
  onToggleLight?: (isLit: boolean) => void;
  isLit: boolean;
  setIsLit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PullChainLampHero({ isLit, setIsLit, onToggleLight }: PullChainLampHeroProps) {
  const [chainPullY, setChainPullY] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const chainControls = useAnimation();
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mechanical switch audio synthesizer
  const playClickSound = (release = false) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const freq = release ? 1800 : 1200;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  const handleToggle = () => {
    playClickSound(false);
    setTimeout(() => playClickSound(true), 120);

    // Animate chain pull down and snap back
    chainControls.start({
      y: [0, 36, 0],
      rotate: [0, 4, -3, 2, 0],
      transition: { duration: 0.45, ease: 'easeOut' },
    });

    const nextState = !isLit;
    setIsLit(nextState);
    setHasInteracted(true);
    onToggleLight?.(nextState);

    // If turning ON: scroll down after a 2.5 second delay
    if (nextState) {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
      autoScrollTimerRef.current = setTimeout(() => {
        const showcaseEl = document.getElementById('illuminated-content');
        if (showcaseEl) {
          showcaseEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollBy({ top: window.innerHeight * 0.72, behavior: 'smooth' });
        }
      }, 2600);
    } else {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col items-center justify-between overflow-hidden pt-6 pb-12 select-none">
      
      {/* ── TOP SOUND & STATUS BAR ── */}
      <div className="relative z-30 w-full max-w-7xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${isLit ? 'bg-[#ffda79] shadow-[0_0_12px_#ffda79]' : 'bg-white/20'}`} />
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            {isLit ? 'Studio Illumination: Active' : 'Studio Night Mode: Lamp Idle'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-[#ffda79]" /> : <VolumeX className="h-3.5 w-3.5" />}
          <span>{soundEnabled ? 'Click SFX On' : 'SFX Muted'}</span>
        </button>
      </div>

      {/* ── CENTRAL LAMP ARENA ── */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto w-full max-w-4xl px-4">
        
        {/* Subtle Ceiling Suspension Cable / Anchor */}
        <div className="h-10 w-0.5 bg-gradient-to-b from-transparent to-[#b28247]" />

        {/* ── SVG LAMP COMPONENT ── */}
        <div className="relative flex items-center justify-center">

          {/* Glowing Aura Behind Lamp when ON */}
          <div
            className={`absolute top-12 left-1/2 -translate-x-1/2 w-[340px] h-[220px] rounded-full transition-opacity duration-1000 pointer-events-none ${
              isLit
                ? 'opacity-85 bg-[radial-gradient(ellipse_at_center,rgba(255,214,140,0.55)_0%,rgba(240,140,160,0.3)_40%,transparent_75%)] blur-3xl'
                : 'opacity-0'
            }`}
          />

          {/* SVG Artwork: Tiffany Floral Stained-Glass Lamp */}
          <svg
            width="380"
            height="340"
            viewBox="0 0 380 340"
            className="overflow-visible drop-shadow-2xl transition-all duration-700"
          >
            <defs>
              {/* Finial / Brass Gradient */}
              <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3ca7e" />
                <stop offset="50%" stopColor="#ba7c2d" />
                <stop offset="100%" stopColor="#673f11" />
              </linearGradient>

              {/* Lit Shade Warm Background Gradient */}
              <linearGradient id="shadeLitBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3db" />
                <stop offset="50%" stopColor="#fed2aa" />
                <stop offset="100%" stopColor="#fca5a5" />
              </linearGradient>

              {/* Unlit Shade Dim Gradient */}
              <linearGradient id="shadeUnlitBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252433" />
                <stop offset="50%" stopColor="#1a1924" />
                <stop offset="100%" stopColor="#12111a" />
              </linearGradient>

              {/* Floral Petal Pink Lit */}
              <linearGradient id="petalLit" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffa0b4" />
                <stop offset="100%" stopColor="#e84368" />
              </linearGradient>
              <linearGradient id="petalUnlit" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#432833" />
                <stop offset="100%" stopColor="#2d1721" />
              </linearGradient>

              {/* Leaf Jade Lit */}
              <linearGradient id="leafLit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#56e3b8" />
                <stop offset="100%" stopColor="#149474" />
              </linearGradient>
              <linearGradient id="leafUnlit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1b362f" />
                <stop offset="100%" stopColor="#0f221d" />
              </linearGradient>

              {/* Fluted Stem Shade Shadow */}
              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#693d14" />
                <stop offset="35%" stopColor="#b47833" />
                <stop offset="65%" stopColor="#dba155" />
                <stop offset="100%" stopColor="#482508" />
              </linearGradient>
            </defs>

            {/* ── 1. Top Finial & Crown Cap ── */}
            <circle cx="190" cy="18" r="7" fill="url(#brassGrad)" stroke="#1a1107" strokeWidth="2.5" />
            <path
              d="M178 24 C178 20, 202 20, 202 24 L208 42 L172 42 Z"
              fill="url(#brassGrad)"
              stroke="#1a1107"
              strokeWidth="2.5"
            />
            {/* Finial Collar */}
            <ellipse cx="190" cy="42" rx="20" ry="4" fill="url(#brassGrad)" stroke="#1a1107" strokeWidth="2" />

            {/* ── 2. Stained-Glass Shade ── */}
            {/* Outer Dome Envelope */}
            <path
              d="M174 44 C110 52, 60 110, 52 180 L328 180 C320 110, 270 52, 206 44 Z"
              fill={isLit ? 'url(#shadeLitBg)' : 'url(#shadeUnlitBg)'}
              stroke="#1a1107"
              strokeWidth="3.5"
              className="transition-colors duration-700"
            />

            {/* Upper Lead Solder Arch */}
            <path
              d="M176 45 C130 65, 80 120, 70 180 M204 45 C250 65, 300 120, 310 180"
              fill="none"
              stroke="#1a1107"
              strokeWidth="3"
            />

            {/* Stained Glass Lead Ribs */}
            <path
              d="M190 44 L190 180"
              stroke="#1a1107"
              strokeWidth="3.5"
            />
            <path
              d="M130 95 C145 130, 150 160, 150 180"
              fill="none"
              stroke="#1a1107"
              strokeWidth="2.5"
            />
            <path
              d="M250 95 C235 130, 230 160, 230 180"
              fill="none"
              stroke="#1a1107"
              strokeWidth="2.5"
            />

            {/* Decorative Stained-Glass Flowers & Vines */}
            {/* Center Bell Blossom */}
            <path
              d="M166 100 C166 82, 214 82, 214 100 C214 116, 204 126, 190 128 C176 126, 166 116, 166 100 Z"
              fill={isLit ? 'url(#petalLit)' : 'url(#petalUnlit)'}
              stroke="#1a1107"
              strokeWidth="2.5"
              className="transition-colors duration-700"
            />
            {/* Center Bell Flared Petals */}
            <path
              d="M166 100 C174 114, 186 118, 190 128 C194 118, 206 114, 214 100"
              fill="none"
              stroke="#1a1107"
              strokeWidth="2"
            />

            {/* Left Blossom */}
            <path
              d="M102 124 C100 106, 134 108, 142 128 C144 148, 126 158, 114 154 C104 150, 102 136, 102 124 Z"
              fill={isLit ? 'url(#petalLit)' : 'url(#petalUnlit)'}
              stroke="#1a1107"
              strokeWidth="2.5"
              className="transition-colors duration-700"
            />

            {/* Right Blossom */}
            <path
              d="M278 124 C280 106, 246 108, 238 128 C236 148, 254 158, 266 154 C276 150, 278 136, 278 124 Z"
              fill={isLit ? 'url(#petalLit)' : 'url(#petalUnlit)'}
              stroke="#1a1107"
              strokeWidth="2.5"
              className="transition-colors duration-700"
            />

            {/* Stained Glass Leaves */}
            <path
              d="M140 156 C148 150, 162 154, 166 166 C156 168, 144 164, 140 156 Z"
              fill={isLit ? 'url(#leafLit)' : 'url(#leafUnlit)'}
              stroke="#1a1107"
              strokeWidth="2"
            />
            <path
              d="M240 156 C232 150, 218 154, 214 166 C224 168, 236 164, 240 156 Z"
              fill={isLit ? 'url(#leafLit)' : 'url(#leafUnlit)'}
              stroke="#1a1107"
              strokeWidth="2"
            />
            <path
              d="M80 148 C88 140, 100 148, 98 162 C88 160, 80 154, 80 148 Z"
              fill={isLit ? 'url(#leafLit)' : 'url(#leafUnlit)'}
              stroke="#1a1107"
              strokeWidth="2"
            />
            <path
              d="M300 148 C292 140, 280 148, 282 162 C292 160, 300 154, 300 148 Z"
              fill={isLit ? 'url(#leafLit)' : 'url(#leafUnlit)'}
              stroke="#1a1107"
              strokeWidth="2"
            />

            {/* Bottom Trim Mosaic Border (Chevrons / Squares) */}
            <rect x="52" y="174" width="276" height="12" fill="url(#brassGrad)" stroke="#1a1107" strokeWidth="2.5" />
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={i}
                x1={64 + i * 12}
                y1="174"
                x2={64 + i * 12}
                y2="186"
                stroke="#1a1107"
                strokeWidth="1.5"
              />
            ))}

            {/* ── 3. Central Pedestal & Fluted Column ── */}
            {/* Socket housing below shade */}
            <rect x="176" y="186" width="28" height="24" rx="2" fill="url(#brassGrad)" stroke="#1a1107" strokeWidth="2.5" />
            <polygon points="172,210 208,210 216,220 164,220" fill="url(#brassGrad)" stroke="#1a1107" strokeWidth="2" />

            {/* Fluted Column Stem */}
            <path
              d="M172 220 C172 220, 160 250, 160 285 C160 310, 172 328, 172 328 L208 328 C208 328, 220 310, 220 285 C220 250, 208 220, 208 220 Z"
              fill="url(#stemGrad)"
              stroke="#1a1107"
              strokeWidth="3"
            />
            {/* Fluted Vertical Ribs on Base */}
            <line x1="178" y1="224" x2="178" y2="324" stroke="#1a1107" strokeWidth="2" />
            <line x1="186" y1="222" x2="186" y2="326" stroke="#fce4b8" strokeWidth="1.5" opacity="0.6" />
            <line x1="190" y1="222" x2="190" y2="326" stroke="#1a1107" strokeWidth="2.5" />
            <line x1="194" y1="222" x2="194" y2="326" stroke="#fce4b8" strokeWidth="1.5" opacity="0.6" />
            <line x1="202" y1="224" x2="202" y2="324" stroke="#1a1107" strokeWidth="2" />

            {/* Bottom Weighted Pedestal Foot */}
            <rect x="156" y="328" width="68" height="8" rx="2" fill="url(#brassGrad)" stroke="#1a1107" strokeWidth="2.5" />
            <ellipse cx="190" cy="336" rx="42" ry="5" fill="url(#brassGrad)" stroke="#1a1107" strokeWidth="2.5" />
          </svg>

          {/* ── 4. INTERACTIVE BEADED PULL CHAIN (ON THE RIGHT SIDE) ── */}
          <div className="absolute right-[84px] top-[186px] z-30">
            <motion.div
              animate={chainControls}
              drag="y"
              dragConstraints={{ top: 0, bottom: 42 }}
              dragElastic={0.25}
              onDragEnd={(e, info) => {
                if (info.offset.y > 14) {
                  handleToggle();
                }
              }}
              onClick={handleToggle}
              className="cursor-pointer group flex flex-col items-center select-none"
              title="Click or drag pull chain"
            >
              {/* Beaded links */}
              <div className="flex flex-col items-center gap-[3px]">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full border border-[#2b1807] bg-gradient-to-br from-[#ffd587] via-[#b67d30] to-[#5a360f] shadow-sm transition-transform group-hover:scale-110"
                  />
                ))}
              </div>

              {/* Teardrop Brass Fob / Pull Weight */}
              <div className="mt-1 flex flex-col items-center">
                <div className="h-6 w-3.5 rounded-b-full rounded-t-sm border border-[#231306] bg-gradient-to-b from-[#ffd380] via-[#c68936] to-[#6c4014] shadow-md group-hover:scale-115 transition-transform" />
              </div>
            </motion.div>
          </div>

          {/* ── 5. ANIMATED MOTH / BUTTERFLY (Near the light cone just like the photo) ── */}
          <AnimatePresence>
            {isLit && (
              <motion.div
                initial={{ opacity: 0, x: 80, y: 220, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  x: [90, 115, 95, 120, 100],
                  y: [220, 205, 230, 215, 220],
                  rotate: [0, -12, 10, -8, 0],
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute z-20 pointer-events-none"
                style={{ left: 24, top: 12 }}
              >
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  {/* Left Wing */}
                  <path
                    d="M17 17 C10 10, 4 14, 6 22 C8 28, 16 22, 17 17 Z"
                    fill="#ffffff"
                    stroke="#1a1107"
                    strokeWidth="1.5"
                  />
                  <circle cx="10" cy="18" r="1.5" fill="#e84368" />
                  {/* Right Wing */}
                  <path
                    d="M17 17 C24 10, 30 14, 28 22 C26 28, 18 22, 17 17 Z"
                    fill="#ffffff"
                    stroke="#1a1107"
                    strokeWidth="1.5"
                  />
                  {/* Body */}
                  <ellipse cx="17" cy="18" rx="1.5" ry="5" fill="#1a1107" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── INSTRUCTION / CALL TO ACTION PROMPT ── */}
        <div className="mt-8 text-center">
          <AnimatePresence mode="wait">
            {!isLit ? (
              <motion.div
                key="pull-prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3"
              >
                <div
                  onClick={handleToggle}
                  className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#ffda79]/40 bg-[#ffda79]/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#ffda79] shadow-[0_0_20px_rgba(255,218,121,0.2)] transition hover:bg-[#ffda79] hover:text-[#0b0c10] hover:scale-105"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Pull the chain to light up</span>
                  <span className="text-lg leading-none">⇣</span>
                </div>
                <p className="font-mono text-xs text-white/40 tracking-wider">
                  Drag or click the brass chain on the right to illuminate Bedroom Studios
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="lit-prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#ffda79]">
                  ✦ The Studio is Illuminated ✦
                </span>
                <p className="font-mono text-xs text-white/60">
                  Scrolling down into the showcase... (or pull chain to toggle)
                </p>
                <div
                  onClick={() => {
                    const el = document.getElementById('illuminated-content');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-black animate-bounce"
                >
                  <ArrowDown className="h-4 w-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── 6. DRAMATIC DOWNWARD LIGHT CONE (Blankets the lower screen) ── */}
      <div
        className={`absolute top-[280px] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1500px] h-[1200px] pointer-events-none transition-all duration-1000 ${
          isLit
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
        }`}
        style={{
          // Conical / trapezoidal light beam from the lamp aperture down to the website
          clipPath: 'polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(180deg, rgba(255, 230, 185, 0.45) 0%, rgba(255, 210, 140, 0.28) 35%, rgba(250, 249, 245, 0.95) 85%, rgba(250, 249, 245, 1) 100%)',
        }}
      />
    </section>
  );
}
