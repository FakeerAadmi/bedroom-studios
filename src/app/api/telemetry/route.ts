import { NextResponse } from 'next/server';
import { sendVisitorTelemetry } from '@/lib/discord';

// In-memory rate-limiter: records last alert timestamp per IP/Session to avoid spamming Discord
const visitorThrottleMap = new Map<string, number>();
const THROTTLE_WINDOW_MS = 1000 * 60 * 15; // 15 minutes between basic 'visit' pings per visitor

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, title, referrer, intentAction, productName, sessionId } = body;

    // Extract headers (Vercel automatic geolocation & client info)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const city = request.headers.get('x-vercel-ip-city') || undefined;
    const country = request.headers.get('x-vercel-ip-country') || undefined;
    const region = request.headers.get('x-vercel-ip-country-region') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    // Deduplication check: High-intent events always fire; general pageviews are throttled per visitor
    const visitorKey = `${ip}:${sessionId || 'anon'}`;
    const now = Date.now();
    const lastSeen = visitorThrottleMap.get(visitorKey);

    const isHighIntent = Boolean(intentAction && intentAction !== 'visit');

    if (!isHighIntent && lastSeen && now - lastSeen < THROTTLE_WINDOW_MS) {
      // Skip redundant notification within the same 15-minute window
      return NextResponse.json({ success: true, throttled: true });
    }

    // Update timestamp
    visitorThrottleMap.set(visitorKey, now);

    // Clean up memory cache periodically
    if (visitorThrottleMap.size > 2000) {
      const expirationCutoff = now - THROTTLE_WINDOW_MS;
      for (const [key, timestamp] of visitorThrottleMap.entries()) {
        if (timestamp < expirationCutoff) visitorThrottleMap.delete(key);
      }
    }

    // Asynchronously dispatch to Discord
    sendVisitorTelemetry({
      path: path || '/',
      title,
      referrer,
      city,
      country,
      region,
      userAgent,
      ip,
      intentAction,
      productName,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.warn('[Telemetry API] Error processing beacon:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
