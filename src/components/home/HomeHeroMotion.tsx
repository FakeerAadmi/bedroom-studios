"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomeHeroMotion() {
  return (
    <motion.div
      initial={{ rotate: -4, opacity: 0, scale: 0.95 }}
      animate={{ rotate: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.45 }}
      className="relative overflow-hidden rounded-[2.5rem] border border-ink/15 bg-[#ece8dd] p-8 shadow-card"
    >
      <div className="absolute right-5 top-5 rounded-full border border-ink/15 bg-paper/80 px-3 py-1 text-xs uppercase tracking-[0.2em]">
        Bedroom made
      </div>
      <div className="flex min-h-[30rem] flex-col justify-between bg-transparent p-6">
        <div className="flex justify-end">
          <div className="relative h-72 w-full max-w-[320px] bg-transparent">
            <Image
              src="/images/lamps/modern-ribbed-led-lamp.png"
              alt="Modern Ribbed LED Lamp"
              fill
              className="object-contain object-right-top mix-blend-multiply"
              priority
            />
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-ink/55">Desk Lighting</p>
          <p className="mt-3 max-w-sm font-editorial text-3xl">
            Modern Ribbed LED Lamp with soothing ambient halo.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
