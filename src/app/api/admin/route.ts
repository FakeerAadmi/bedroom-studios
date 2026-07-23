import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders as ordersTable } from '@/db/schema';
import { sendDiscordAlert, DiscordColors } from '@/lib/discord';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    let dbOrdersList = await db.select().from(ordersTable);
    
    // Quick patch to fix existing seeded order in the DB (will update if it exists)
    try {
      await db.update(ordersTable).set({
        orderNumber: 'BS-1001',
        createdAt: new Date('2026-06-17T12:00:00Z')
      }).where(eq(ordersTable.orderNumber, 'BRD-MANUAL-1001'));
    } catch (e) {
      console.error('Failed to run order patch', e);
    }
    
    // Seed Priyaansh manual order if the database is completely empty
    if (dbOrdersList.length === 0) {
      try {
        await db.insert(ordersTable).values({
          orderNumber: 'BS-1001',
          email: 'priyaansh@example.com',
          shippingAddress: { name: 'Priyaansh H' },
          subtotal: '8000.00',
          shippingFee: '0.00',
          total: '8000.00',
          status: 'shipped', // mapped to stage 5
          createdAt: new Date('2026-06-17T12:00:00Z'),
          comments: [
            { text: 'Printing complete. Moving to quality check.', author: 'Admin', time: '09:00 AM' }
          ]
        });
        dbOrdersList = await db.select().from(ordersTable);
      } catch (seedErr) {
        console.error('Failed to seed manual order:', seedErr);
      }
    }
    
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
        comments: order.comments || [],
        uploadedPhotos: order.uploadedPhotos || {}
      };
    });

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
    
    if (orderId && orderData) {
      // Map Kanban stage back to DB status
      let newStatus = 'pending';
      if (orderData.currentStage === 2) newStatus = 'processing';
      if (orderData.currentStage >= 3 && orderData.currentStage <= 4) newStatus = 'manufacturing';
      if (orderData.currentStage === 5) newStatus = 'shipped';
      if (orderData.currentStage === 6) newStatus = 'delivered';

      await db.update(ordersTable)
        .set({
          status: newStatus as any,
          comments: orderData.comments || [],
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
