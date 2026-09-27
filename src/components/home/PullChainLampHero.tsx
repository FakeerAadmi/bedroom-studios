"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

interface PullChainLampHeroProps {
  isLit: boolean;
  setIsLit: React.Dispatch<React.SetStateAction<boolean>>;
  onLitComplete?: () => void;
}

export default function PullChainLampHero({ isLit, setIsLit, onLitComplete }: PullChainLampHeroProps) {
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

    // 3. Subtle physical recoil on the lamp itself from the chain pull
    lampControls.start({
      rotate: [0, 0.5, -0.3, 0.1, 0],
      y: [0, 2, -1, 0],
      transition: {
        duration: 0.65,
        ease: 'easeOut',
      },
    });

    // 4. Brief transition before switch contacts close and bulb ignites
    setTimeout(() => {
      const nextState = !isLit;
      setIsLit(nextState);

      // If turning ON: wait 2.4s, then smoothly auto-scroll into illuminated content
      if (nextState) {
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
      } else {
        if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
      }
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none bg-[#08090d]">
      
      {/* ── LAYER 1: ATMOSPHERIC DARK ROOM BACKGROUND ── */}
      {/* Subtle architectural room ambience without any rectangular artifacts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(18,20,28,0.6)_0%,_rgba(8,9,13,1)_85%)]" />
        {/* Subtle architectural ceiling horizon */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#050608] to-transparent opacity-80" />
      </div>

      {/* ── LAYER 2: SEPARATE PROJECTED LIGHT LAYER (CSS/SVG BEAM & GLOW) ── */}
      {/* 
        Originates directly from the underside of the lampshade (~44% lamp height) 
        Spreads downward in a realistic, soft-edged warm amber illumination pool onto the website
      */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out z-10 ${
          isLit ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* 1. Downward Expanding Conical Light Beam (feathered with radial falloff) */}
        <div
          className="absolute inset-x-0 bottom-0 top-[48vh] sm:top-[46vh] transition-transform duration-1000 ease-out"
          style={{
            transformOrigin: 'top center',
            transform: isLit ? 'scaleY(1)' : 'scaleY(0.7)',
            // Top width matches lampshade rim (~360px centered), expanding to 100% width at bottom
            clipPath: 'polygon(calc(50% - 180px) 0%, calc(50% + 180px) 0%, 100% 100%, 0% 100%)',
            background: 'linear-gradient(180deg, rgba(255, 228, 150, 0.72) 0%, rgba(255, 190, 85, 0.45) 25%, rgba(255, 160, 50, 0.22) 55%, rgba(250, 246, 238, 0.85) 90%, rgba(250, 246, 238, 1) 100%)',
          }}
        />

        {/* 2. Soft-Edged Ambient Glow Envelope around the light source */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[46vh] sm:top-[44vh] w-[460px] sm:w-[580px] h-[320px] rounded-full pointer-events-none blur-3xl opacity-75"
          style={{
            background: 'radial-gradient(ellipse at 50% 15%, rgba(255, 215, 120, 0.6) 0%, rgba(255, 170, 60, 0.25) 50%, transparent 80%)',
          }}
        />

        {/* 3. Surface Light Pool (Illuminating the desk/content plane underneath) */}
        <div
          className="absolute bottom-0 inset-x-0 h-64 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 65% 100% at 50% 100%, rgba(255, 230, 160, 0.5) 0%, rgba(255, 190, 90, 0.2) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* ── LAYER 3: ISOLATED PHYSICAL LAMP OBJECT (TRANSPARENT PNG, NO BACKGROUND) ── */}
      {/* Sits at z-20 above the projected light layer */}
      <motion.div
        animate={lampControls}
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-[500px] px-4 pointer-events-none"
      >
        {/* Lamp Frame with authentic 638:959 aspect ratio */}
        <div className="relative w-[280px] h-[420px] sm:w-[340px] sm:h-[510px] md:w-[380px] md:h-[570px] pointer-events-auto">
          
          {/* Internal bulb radiance glow behind stained glass (active only when lit) */}
          <div
            className={`absolute top-[12%] left-1/2 -translate-x-1/2 w-[72%] h-[38%] rounded-full pointer-events-none transition-opacity duration-700 blur-xl ${
              isLit ? 'opacity-85' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(circle, rgba(255, 220, 130, 0.75) 0%, rgba(255, 140, 40, 0.35) 60%, transparent 85%)',
            }}
          />

          {/* OFF STATE LAMP (Clean isolated PNG with transparent alpha, no photographic rectangle) */}
          <div className="absolute inset-0 transition-opacity duration-700">
            <Image
              src="/images/lamp-isolated-off.png"
              alt="Handcrafted Tiffany stained glass lamp"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* ON STATE LAMP (Illuminated stained glass panels & warm brass reflection) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isLit ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src="/images/lamp-isolated-on.png"
              alt="Handcrafted Tiffany stained glass lamp illuminated"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* ── LAYER 4: INTERACTIVE PHYSICAL PULL CHAIN ── */}
          {/* Attached directly beneath the lampshade rim on the right socket (top ~43.5%, left ~66.8%) */}
          <div
            className="absolute z-30 cursor-grab active:cursor-grabbing"
            style={{
              top: '43.2%',
              left: '66.8%',
            }}
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
              {/* Generous hit area for easy grabbing on mobile & desktop */}
              <div className="absolute -inset-x-4 -inset-y-3 cursor-grab active:cursor-grabbing" />

              {/* Beaded golden chain links */}
              <div className="flex flex-col items-center gap-[2px]">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[7px] w-[7px] rounded-full border border-[#2b1807]/80 bg-gradient-to-br from-[#ffe19f] via-[#c68936] to-[#6c4014] shadow-sm transition-transform group-hover:scale-110"
                  />
                ))}
              </div>

              {/* Weighted Teardrop Brass Fob */}
              <div className="mt-0.5 flex flex-col items-center">
                <div className="h-7 w-3.5 rounded-b-full rounded-t-sm border border-[#231306] bg-gradient-to-b from-[#ffe5a8] via-[#cf903b] to-[#734316] shadow-md group-hover:scale-115 transition-transform" />
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
