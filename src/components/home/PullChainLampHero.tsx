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
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mechanical lamp pull switch sound synthesizer (Web Audio API)
  const playClickSound = (release = false) => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const freq = release ? 1900 : 1300;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  const handlePullChain = () => {
    // 1. Audio click
    playClickSound(false);
    setTimeout(() => playClickSound(true), 130);

    // 2. Multi-stage spring & pendulum chain physics
    chainControls.start({
      y: [0, 42, -5, 2, 0],
      rotate: [0, 9, -7, 5, -2, 0],
      transition: {
        duration: 0.85,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: 'easeOut',
      },
    });

    // 3. Toggle light state
    const nextState = !isLit;
    setIsLit(nextState);

    // 4. If turning ON: wait 2.5 seconds, then trigger smooth scroll down
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
      }, 2500);
    } else {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none bg-[#090a0f]">
      
      {/* ── 1. LAMP CONTAINER WITH STAINED GLASS IMAGES ── */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[540px] px-4">
        
        {/* Lamp Image Frame (Square 1:1) */}
        <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px]">
          
          {/* OFF STATE IMAGE (Base layer) */}
          <div className="absolute inset-0 transition-opacity duration-700">
            <Image
              src="/images/lamp-stained-off.jpg"
              alt="Stained glass lamp unlit"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* ON STATE IMAGE (Fades in over OFF image when isLit is true) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isLit ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src="/images/lamp-stained-on.jpg"
              alt="Stained glass lamp illuminated"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Ambient Warm Glow Aura surrounding the shade when ON */}
          <div
            className={`absolute top-[6%] left-1/2 -translate-x-1/2 w-[90%] h-[55%] rounded-full pointer-events-none transition-opacity duration-1000 ${
              isLit
                ? 'opacity-85 bg-[radial-gradient(ellipse_at_center,rgba(255,200,100,0.5)_0%,rgba(235,130,80,0.3)_45%,transparent_75%)] blur-3xl'
                : 'opacity-0'
            }`}
          />

          {/* ── 2. INTERACTIVE PHYSICAL PULL CHAIN WITH PENDULUM OSCILLATION ── */}
          {/* Positioned directly over the beaded chain from the generated artwork */}
          <div
            className="absolute z-30 cursor-grab active:cursor-grabbing"
            style={{
              top: '47%',
              right: '37.8%',
            }}
          >
            <motion.div
              animate={chainControls}
              drag="y"
              dragConstraints={{ top: 0, bottom: 46 }}
              dragElastic={0.25}
              whileHover={{ rotate: [0, -3, 3, -1, 0], transition: { duration: 0.4 } }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 12) {
                  handlePullChain();
                } else {
                  chainControls.start({
                    y: 0,
                    rotate: [0, 5, -5, 2, 0],
                    transition: { duration: 0.5, ease: 'easeOut' },
                  });
                }
              }}
              onClick={handlePullChain}
              className="flex flex-col items-center select-none pt-1 group"
              style={{ transformOrigin: 'top center' }}
              title="Pull chain"
            >
              {/* Invisible clickable hit area padding */}
              <div className="absolute -inset-x-3 -inset-y-2" />

              {/* Beaded golden chain links with physics */}
              <div className="flex flex-col items-center gap-[2.5px]">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full border border-[#2b1807] bg-gradient-to-br from-[#ffd98e] via-[#ba7f32] to-[#5a360f] shadow-sm transition-transform group-hover:scale-110"
                  />
                ))}
              </div>

              {/* Weighted Teardrop Brass Fob */}
              <div className="mt-0.5 flex flex-col items-center">
                <div className="h-7 w-3.5 rounded-b-full rounded-t-sm border border-[#231306] bg-gradient-to-b from-[#ffd380] via-[#c68936] to-[#6c4014] shadow-md group-hover:scale-115 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 3. DRAMATIC DOWNWARD LIGHT CONE (EXACTLY MATCHING LAMP SHADE LENGTH) ── */}
      {/* 
        In the generated 1:1 image, the lampshade bottom rim spans horizontally from ~18% to ~82% of the width.
        The light cone starts exactly across that bottom rim length and expands downwards.
      */}
      <div
        className={`absolute bottom-0 left-0 right-0 top-[48vh] sm:top-[47vh] md:top-[46vh] pointer-events-none transition-all duration-1000 ${
          isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
        }`}
        style={{
          // Top edge starts exactly matching the lampshade rim width (~340px centered), and spreads to 100% width at the bottom
          clipPath: 'polygon(calc(50% - 170px) 0%, calc(50% + 170px) 0%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(180deg, rgba(255, 225, 150, 0.6) 0%, rgba(255, 205, 120, 0.4) 30%, rgba(250, 249, 245, 0.95) 85%, rgba(250, 249, 245, 1) 100%)',
        }}
      />
    </div>
  );
}
