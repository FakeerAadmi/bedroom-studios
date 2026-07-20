"use client";

import { motion } from 'framer-motion';

export default function AnimatedCard({ children, delay = 0, xOffset = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
