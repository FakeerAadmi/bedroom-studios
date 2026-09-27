"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorRadar() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double-firing on same path in strict mode
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Establish persistent session ID in sessionStorage
    let sessionId = '';
    try {
      sessionId = sessionStorage.getItem('bs_vid') || '';
      if (!sessionId) {
        sessionId = `s_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
        sessionStorage.setItem('bs_vid', sessionId);
      }
    } catch {
      sessionId = 'session_unsupported';
    }

    const payload = {
      path: pathname,
      title: typeof document !== 'undefined' ? document.title : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      sessionId,
      intentAction: pathname.startsWith('/product/')
        ? 'product_view'
        : pathname.startsWith('/commissions')
        ? 'commission_intent'
        : 'visit',
      productName: pathname.startsWith('/product/')
        ? pathname.replace('/product/', '').replace(/-/g, ' ')
        : undefined,
    };

    // Use sendBeacon if available for non-blocking telemetry, fallback to fetch
    try {
      const dataBlob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/telemetry', dataBlob);
      } else {
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Telemetry should never affect user experience
    }
  }, [pathname]);

  return null;
}
