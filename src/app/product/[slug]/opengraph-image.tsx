import { ImageResponse } from 'next/og';
import { getProductBySlug } from '@/data/products';

export const runtime = 'edge';

// Image metadata
export const alt = 'Bedroom Studios Product';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            background: '#f9f9f7',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 64, color: '#1a1a1a' }}>Product Not Found</div>
        </div>
      ),
      { ...size }
    );
  }

  // Extract solid colors for a gradient background if available
  // e.g., 'from-[#d4ff00] via-[#f4ffb8] to-[#ffffff]'
  let bgFrom = '#f9f9f7';
  let bgTo = '#ffffff';

  if (product.color) {
    const matches = product.color.match(/#([0-9a-fA-F]{6})/g);
    if (matches && matches.length >= 2) {
      bgFrom = matches[0];
      bgTo = matches[matches.length - 1];
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(140deg, ${bgFrom}, ${bgTo})`,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          fontFamily: 'sans-serif',
          color: '#1a1a1a',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>Bedroom Studios</span>
            <span style={{ fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6, marginTop: 8 }}>
              Handmade Desk Objects
            </span>
          </div>
          <div
            style={{
              padding: '12px 24px',
              border: '2px solid rgba(26, 26, 26, 0.15)',
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            ₹{product.price}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '80%' }}>
          <div
            style={{
              fontSize: 24,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 700,
              opacity: 0.5,
              marginBottom: 16,
            }}
          >
            {product.categoryName || product.label}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontSize: 32,
              opacity: 0.7,
              lineHeight: 1.4,
              maxWidth: '90%',
            }}
          >
            {product.description}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
