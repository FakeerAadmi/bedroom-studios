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
      <div className="flex min-h-[32rem] flex-col justify-between bg-[linear-gradient(160deg,rgba(255,255,255,0.55),rgba(0,87,255,0.1))] p-6">
        <div className="flex justify-end">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72 overflow-hidden rounded-[2.2rem] border border-ink/15 bg-paper/70 shadow-sm">
            <Image
              src="/images/brutalist-cement-desk-lamp.png"
              alt="Brutalist Cement Desk Lamp"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-ink/55">Flagship weirdness</p>
          <p className="mt-3 max-w-sm font-editorial text-3xl">
            The lamp that says, &quot;Yes, I do own a mood board.&quot;
          </p>
        </div>
      </div>
    </motion.div>
  );
}
