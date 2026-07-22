import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d0d0d', // dark ink
          color: '#f4f1ea', // paper
          fontSize: 20,
          fontWeight: 'bold',
          borderRadius: '20%',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        BS
      </div>
    ),
    { ...size }
  );
}
