/**
 * CLIENT COMPONENT
 * Reason: Uses `useState`, `useEffect`, and `framer-motion` to control the initial application loading sequence.
 */
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress bar from 0 → 85% quickly, then wait for window.load to finish it
    let raf;
    let current = 0;
    const target = 85;
    const step = () => {
      current = Math.min(current + Math.random() * 3.5, target);
      setProgress(current);
      if (current < target) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const finish = () => {
      cancelAnimationFrame(raf);
      setProgress(100);
      // Small delay so the 100% state is visible before exit animation
      setTimeout(() => setVisible(false), 420);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
      // Fallback: never show for more than 3.5 seconds
      const fallback = setTimeout(finish, 3500);
      return () => {
        clearTimeout(fallback);
        window.removeEventListener('load', finish);
        cancelAnimationFrame(raf);
      };
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper"
          style={{ background: '#f9f9f7' }}
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-2"
          >
            <p className="font-display text-4xl font-bold tracking-tight text-ink">
              Bedroom Studios
            </p>
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-ink/40">
              Handmade Indian desk objects
            </p>
          </motion.div>

          {/* Animated divider */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="mt-8 text-lg text-ink/30"
          >
            ✦
          </motion.p>

          {/* Progress bar */}
          <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-ink/10">
            <motion.div
              className="h-full rounded-full bg-ink"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
