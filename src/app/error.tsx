'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('App Boundary Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 px-4 text-center">
      <div className="rounded-[2rem] border border-ink/10 bg-paper p-8 shadow-sm max-w-md w-full">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-6">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink mb-2">Something went wrong!</h2>
        <p className="text-sm text-ink/60 mb-8 leading-relaxed">
          The application encountered an unexpected error.
        </p>
        <button
          onClick={() => reset()}
          className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-ink/80 hover:scale-[1.02]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
