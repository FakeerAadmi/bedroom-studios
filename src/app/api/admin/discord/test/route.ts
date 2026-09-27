import { NextResponse } from 'next/server';
import { sendOrderNotification, sendVisitorTelemetry, sendDiscordAlert, DiscordColors } from '@/lib/discord';
import { verifyAdminRequest } from '@/lib/auth/admin';

export async function GET(request: Request) {
  const isAdmin = await verifyAdminRequest();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'all';

  const configStatus = {
    DISCORD_WEBHOOK_URL: Boolean(process.env.DISCORD_WEBHOOK_URL),
    DISCORD_ORDERS_WEBHOOK_URL: Boolean(process.env.DISCORD_ORDERS_WEBHOOK_URL),
    DISCORD_VISITORS_WEBHOOK_URL: Boolean(process.env.DISCORD_VISITORS_WEBHOOK_URL),
    DISCORD_COMMISSIONS_WEBHOOK_URL: Boolean(process.env.DISCORD_COMMISSIONS_WEBHOOK_URL),
    DISCORD_PUBLIC_KEY: Boolean(process.env.DISCORD_PUBLIC_KEY),
    DISCORD_BOT_TOKEN: Boolean(process.env.DISCORD_BOT_TOKEN),
    DISCORD_CLIENT_ID: Boolean(process.env.DISCORD_CLIENT_ID),
  };

  const results: Record<string, string> = {};

  try {
    if (type === 'order' || type === 'all') {
      await sendOrderNotification({
        orderId: `BS-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: 'Shreyas (Test Run)',
        email: 'shreyas@bedroomstudios.store',
        phone: '+91 98765 43210',
        items: [
          { name: 'Modern Ribbed LED Lamp', quantity: 1, color: 'Translucent Amber', material: 'Diffusion PLA' },
          { name: 'Cement Catchall Tray', quantity: 2, color: 'Raw Grey', material: 'Hand-Cast Portland Cement' },
        ],
        total: 3999,
        address: { city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
        notes: 'This is a test notification verifying your Discord bot setup.',
      });
      results.orderTest = 'Dispatched order notification to Discord';
    }

    if (type === 'visitor' || type === 'all') {
      await sendVisitorTelemetry({
        path: '/product/modern-shoji-lamp',
        title: 'Modern Shoji Lamp | Bedroom Studios',
        referrer: 'https://twitter.com',
        city: 'Mumbai',
        country: 'IN',
        region: 'MH',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        intentAction: 'request_sample_intent',
        productName: 'Modern Shoji Lamp',
      });
      results.visitorTest = 'Dispatched visitor telemetry ping to Discord';
    }

    return NextResponse.json({
      success: true,
      configStatus,
      results,
      message: 'Test alerts dispatched. Check your Discord channels!',
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      configStatus,
      error: err.message,
    }, { status: 500 });
  }
}
