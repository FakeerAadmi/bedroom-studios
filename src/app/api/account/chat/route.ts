import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { db } from '@/db';
import { orders as ordersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sendDiscordAlert } from '@/lib/discord';

// POST: customer sends a message on their order (two-way workshop chat)
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { orderId, message } = body;

  if (!orderId || !message?.trim()) {
    return NextResponse.json({ error: 'orderId and message are required' }, { status: 400 });
  }

  // Verify this order belongs to this user
  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId));
  if (!order || order.email !== user.email) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const customerName = (order.shippingAddress as any)?.name || user.email;
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const newComment = { text: message.trim(), author: customerName, time };
  const updatedComments = [...((order.comments as any[]) || []), newComment];

  await db.update(ordersTable)
    .set({ comments: updatedComments, updatedAt: new Date() })
    .where(eq(ordersTable.id, orderId));

  // Notify admin via Discord
  try {
    await sendDiscordAlert(
      `💬 Customer Message — ${order.orderNumber}`,
      `**${customerName}** sent a message:\n\n> ${message.trim()}`,
      {
        color: 0x3b82f6,
        fields: [
          { name: 'Order', value: order.orderNumber, inline: true },
          { name: 'Customer', value: customerName, inline: true },
        ]
      }
    );
  } catch (discordErr) {
    console.error('Discord notification failed:', discordErr);
  }

  return NextResponse.json({ success: true, comment: newComment });
}
