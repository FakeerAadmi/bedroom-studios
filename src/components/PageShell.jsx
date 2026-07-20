// @ts-nocheck
"use client";

import { motion } from 'framer-motion';

export default function PageShell({ children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
