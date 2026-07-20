// @ts-nocheck
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-5 right-5 z-50 max-w-xs rounded-3xl border border-ink bg-paper px-4 py-3 text-sm shadow-card"
        >
          {toast.message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
