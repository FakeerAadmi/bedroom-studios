"use client";

import { useEffect, useState } from 'react';
import { getCountdownParts } from '@/utils';

export default function DropCountdown({ releaseDate }) {
  const [countdown, setCountdown] = useState(() => getCountdownParts(releaseDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(releaseDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [releaseDate]);

  return (
    <p className="mt-2 font-display text-3xl font-bold">
      {countdown.isLive
        ? 'Live now'
        : `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`}
    </p>
  );
}
