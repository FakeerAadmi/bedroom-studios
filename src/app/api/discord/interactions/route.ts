import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/db';
import { orders as ordersTable } from '@/db/schema';
import { eq, or, desc } from 'drizzle-orm';
import { DiscordColors } from '@/lib/discord';

/**
 * Discord Interaction Types
 */
const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
};

const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
};

/**
 * Validates Ed25519 cryptographic signature from Discord.
 */
function verifyDiscordSignature(
  rawBody: string,
  signature: string | null,
  timestamp: string | null,
  publicKey: string | null
): boolean {
  if (!signature || !timestamp || !publicKey) return false;

  try {
    const key = crypto.createPublicKey({
      key: Buffer.concat([
        // ASN.1 prefix for Ed25519 public key
        Buffer.from('302a300506032b6570032100', 'hex'),
        Buffer.from(publicKey, 'hex'),
      ]),
      format: 'der',
      type: 'spki',
    });

    return crypto.verify(
      null,
      Buffer.from(timestamp + rawBody),
      key,
      Buffer.from(signature, 'hex')
    );
  } catch (err) {
    console.warn('[Discord Verification] Signature validation failed:', err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-signature-ed25519');
    const timestamp = request.headers.get('x-signature-timestamp');
    const rawBody = await request.text();
    const publicKey = process.env.DISCORD_PUBLIC_KEY || null;

    // Verify signature if public key is configured
    if (publicKey) {
      const isValid = verifyDiscordSignature(rawBody, signature, timestamp, publicKey);
      if (!isValid) {
        return new NextResponse('Invalid request signature', { status: 401 });
      }
    }

    const interaction = JSON.parse(rawBody);

    // 1. Respond to Discord verification PING
    if (interaction.type === InteractionType.PING) {
      return NextResponse.json({ type: InteractionResponseType.PONG });
    }

    // 2. Handle Slash Commands
    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      const { name, options } = interaction.data;

      // ─── COMMAND: /orders ──────────────────────────────────────────────────
      if (name === 'orders') {
        const recentOrders = await db
          .select()
          .from(ordersTable)
          .orderBy(desc(ordersTable.createdAt))
          .limit(5);

        if (!recentOrders || recentOrders.length === 0) {
          return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: '📭 **No orders found in the database yet.**',
            },
          });
        }

        const orderLines = recentOrders.map((ord) => {
          const clientName = (ord.shippingAddress as any)?.name || 'Guest Client';
          const stageIcons: Record<string, string> = {
            pending: '⏳ Pending',
            processing: '📋 Processing',
            manufacturing: '🛠️ Making',
            shipped: '🚀 Shipped',
            delivered: '✨ Delivered',
          };
          const statusStr = stageIcons[ord.status] || ord.status;
          return `• **\`${ord.orderNumber}\`** — ${clientName} · ${statusStr} · ₹${Number(ord.total).toLocaleString('en-IN')}`;
        });

        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                title: '📦 Bedroom Studios — Recent Orders & Sample Requests',
                description: orderLines.join('\n\n'),
                color: DiscordColors.blue,
                footer: { text: 'Type /lookup <code> for full details.' },
                timestamp: new Date().toISOString(),
              },
            ],
          },
        });
      }

      // ─── COMMAND: /lookup ──────────────────────────────────────────────────
      if (name === 'lookup') {
        const codeInput = options?.find((opt: any) => opt.name === 'code')?.value;
        if (!codeInput) {
          return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: '⚠️ Please provide an order code, e.g. `/lookup code:BS-104921`' },
          });
        }

        const cleanCode = String(codeInput).trim().toUpperCase();
        const codeWithoutPrefix = cleanCode.replace(/^BS-/, '');

        const results = await db
          .select()
          .from(ordersTable)
          .where(
            or(
              eq(ordersTable.orderNumber, cleanCode),
              eq(ordersTable.orderNumber, codeWithoutPrefix),
              eq(ordersTable.orderNumber, `BRD-MANUAL-${codeWithoutPrefix}`)
            )
          );

        if (results.length === 0) {
          return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: `❌ Order \`${cleanCode}\` was not found in the database.` },
          });
        }

        const ord = results[0];
        const clientName = (ord.shippingAddress as any)?.name || 'Guest Client';
        const address = ord.shippingAddress as any;
        const addressStr = address ? [address.city, address.state, address.pincode].filter(Boolean).join(', ') : 'Not provided';
        const trackUrl = `https://bedroomstudios.vercel.app/track?code=${ord.orderNumber}`;

        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                title: `🔎 Order Inspection: ${ord.orderNumber}`,
                url: trackUrl,
                color: DiscordColors.lime,
                fields: [
                  { name: '👤 Client', value: `${clientName}\n📧 \`${ord.email}\``, inline: true },
                  { name: '📦 Status', value: `\`${ord.status.toUpperCase()}\``, inline: true },
                  { name: '📍 Destination', value: addressStr || 'Unknown', inline: true },
                  { name: '💰 Total Value', value: `₹${Number(ord.total).toLocaleString('en-IN')}`, inline: true },
                  { name: '📅 Placed On', value: new Date(ord.createdAt).toLocaleDateString('en-IN'), inline: true },
                  { name: '🔗 Tracking Link', value: `[View Live Tracking](${trackUrl})`, inline: false },
                ],
                footer: { text: 'Bedroom Studios Admin Bot' },
                timestamp: new Date().toISOString(),
              },
            ],
          },
        });
      }

      // ─── COMMAND: /status ──────────────────────────────────────────────────
      if (name === 'status') {
        const codeInput = options?.find((opt: any) => opt.name === 'code')?.value;
        const newStage = options?.find((opt: any) => opt.name === 'stage')?.value;

        if (!codeInput || !newStage) {
          return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: '⚠️ Usage: `/status code:BS-104921 stage:manufacturing`' },
          });
        }

        const cleanCode = String(codeInput).trim().toUpperCase();
        const codeWithoutPrefix = cleanCode.replace(/^BS-/, '');

        const results = await db
          .select()
          .from(ordersTable)
          .where(
            or(
              eq(ordersTable.orderNumber, cleanCode),
              eq(ordersTable.orderNumber, codeWithoutPrefix)
            )
          );

        if (results.length === 0) {
          return NextResponse.json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: `❌ Order \`${cleanCode}\` was not found.` },
          });
        }

        const ord = results[0];
        await db
          .update(ordersTable)
          .set({ status: newStage as any, updatedAt: new Date() })
          .where(eq(ordersTable.id, ord.id));

        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `✅ **Order \`${ord.orderNumber}\` updated to \`${newStage.toUpperCase()}\`!**\nCustomer can now see this stage in their tracking dashboard.`,
          },
        });
      }

      // ─── COMMAND: /stats ───────────────────────────────────────────────────
      if (name === 'stats') {
        const allOrders = await db.select().from(ordersTable);
        const pendingCount = allOrders.filter((o) => o.status === 'pending').length;
        const makingCount = allOrders.filter((o) => o.status === 'manufacturing').length;
        const shippedCount = allOrders.filter((o) => o.status === 'shipped').length;
        const totalCount = allOrders.length;

        return NextResponse.json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                title: '📊 Bedroom Studios — Studio Production Overview',
                color: DiscordColors.amber,
                fields: [
                  { name: '📦 Total Orders & Requests', value: `\`${totalCount}\``, inline: true },
                  { name: '⏳ Pending Action', value: `\`${pendingCount}\``, inline: true },
                  { name: '🛠️ In Fabrication', value: `\`${makingCount}\``, inline: true },
                  { name: '🚀 Shipped', value: `\`${shippedCount}\``, inline: true },
                  { name: '🌐 Live Storefront', value: '[bedroomstudios.vercel.app](https://bedroomstudios.vercel.app)', inline: true },
                ],
                footer: { text: 'Bedroom Studios Telemetry' },
                timestamp: new Date().toISOString(),
              },
            ],
          },
        });
      }
    }

    return NextResponse.json({ error: 'Unknown interaction' }, { status: 400 });
  } catch (error) {
    console.error('[Discord Interaction] Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
