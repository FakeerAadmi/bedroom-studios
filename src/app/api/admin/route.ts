import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders as ordersTable } from '@/db/schema';
import { sendDiscordAlert, DiscordColors } from '@/lib/discord';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const dbOrdersList = await db.select().from(ordersTable);
    const formattedOrders: Record<string, any> = {};

    dbOrdersList.forEach((order: any) => {
      // Map DB status to Kanban stage (1-6)
      let stage = 1;
      if (order.status === 'processing') stage = 2;
      if (order.status === 'manufacturing') stage = 3;
      if (order.status === 'manufacturing') stage = 4; // Simplification
      if (order.status === 'shipped') stage = 5; // Re-mapping based on HQ labels
      if (order.status === 'delivered') stage = 6;
      
      formattedOrders[order.id] = {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.shippingAddress?.name || 'Guest Customer',
        email: order.email,
        productName: 'Storefront Order', // This should technically come from orderItems
        material: 'Standard', 
        total: Number(order.total) || 0,
        date: new Date(order.createdAt).toISOString().split('T')[0],
        currentStage: stage,
        comments: order.notes ? [{ text: order.notes, author: 'System', time: 'Auto' }] : [],
        uploadedPhotos: order.uploadedPhotos || {}
      };
    });

    // We'll inject Priyaansh's manual order here just so it's not lost since it wasn't created via checkout
    formattedOrders['manual-1001'] = {
      id: 'manual-1001',
      customerName: 'Priyaansh H',
      email: 'priyaansh@example.com',
      productName: 'Diecast Card Display (5x White, 5x Black)',
      material: 'PLA',
      total: 8000,
      date: '2026-06-30',
      currentStage: 5,
      comments: [
        { text: 'Printing complete. Moving to quality check.', author: 'Admin', time: '09:00 AM' }
      ],
      uploadedPhotos: {}
    };

    return NextResponse.json({ orders: formattedOrders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { orderId, orderData } = body;
    
    if (orderId && orderData && !orderId.startsWith('manual-')) {
      // Map Kanban stage back to DB status
      let newStatus = 'pending';
      if (orderData.currentStage === 2) newStatus = 'processing';
      if (orderData.currentStage >= 3 && orderData.currentStage <= 4) newStatus = 'manufacturing';
      if (orderData.currentStage === 5) newStatus = 'shipped';
      if (orderData.currentStage === 6) newStatus = 'delivered';

      await db.update(ordersTable)
        .set({
          status: newStatus as any,
          uploadedPhotos: orderData.uploadedPhotos || {},
          updatedAt: new Date(),
        })
        .where(eq(ordersTable.id, orderId));
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
