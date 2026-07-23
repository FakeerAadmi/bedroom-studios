import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Fetch orders by both profile_id and email (covers guest orders placed before signup)
  const dbOrders = await db.select().from(orders).where(eq(orders.email, user.email!));

  const formatted = dbOrders.map((order: any) => {
    let stage = 1;
    if (order.status === 'processing') stage = 2;
    if (order.status === 'manufacturing') stage = 3;
    if (order.status === 'shipped') stage = 5;
    if (order.status === 'delivered') stage = 6;

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: (order.shippingAddress as any)?.name || 'Customer',
      email: order.email,
      productName: 'Storefront Order',
      total: Number(order.total) || 0,
      date: new Date(order.createdAt).toISOString().split('T')[0],
      currentStage: stage,
      comments: order.comments || [],
      uploadedPhotos: order.uploadedPhotos || {},
    };
  });

  return NextResponse.json({ orders: formatted });
}
