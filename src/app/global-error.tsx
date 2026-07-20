'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#f9f9f7', color: '#1a1a1a', fontFamily: 'sans-serif', margin: 0 }}>
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '40px', textAlign: 'center' }}>
          <div style={{ borderRadius: '32px', border: '1px solid rgba(26,26,26,0.1)', backgroundColor: '#fff', padding: '32px', maxWidth: '448px', width: '100%' }}>
            <div style={{ margin: '0 auto', display: 'flex', height: '48px', width: '48px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', marginBottom: '24px' }}>
              <svg style={{ height: '24px', width: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Critical System Error</h2>
            <p style={{ fontSize: '14px', opacity: 0.6, marginBottom: '32px', lineHeight: 1.5 }}>
              A critical error occurred while rendering the application shell.
            </p>
            <button
              onClick={() => reset()}
              style={{ width: '100%', borderRadius: '9999px', backgroundColor: '#1a1a1a', padding: '12px 20px', fontSize: '14px', fontWeight: 500, color: '#fff', cursor: 'pointer', border: 'none' }}
            >
              Recover Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
