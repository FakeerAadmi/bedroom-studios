/**
 * CLIENT COMPONENT
 * Reason: Uses `useEffect` and `usePathname` to manipulate the DOM (`window.scrollTo`) on route changes.
 */
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Silently resets scroll position to the top on every route change.
 * Renders nothing — drop anywhere inside a Router context.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
