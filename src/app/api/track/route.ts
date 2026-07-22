import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders as ordersTable } from '@/db/schema';
import { eq, or } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { orderCode, firstName } = body;

    if (!orderCode) {
      return NextResponse.json({ success: false, error: 'Order code is required' }, { status: 400 });
    }

    // Clean up order code (handle if they typed "BS-BS-123456")
    orderCode = orderCode.trim().toUpperCase();
    if (orderCode.startsWith('BS-BS-')) {
      orderCode = orderCode.substring(3); // Turn BS-BS-123456 into BS-123456
    }
    
    // Some manual orders might not have the BS prefix
    let cleanCode = orderCode;
    if (cleanCode.startsWith('BS-')) {
      cleanCode = cleanCode.substring(3);
    }

    // Query DB for this order
    const orderResults = await db.select().from(ordersTable).where(
      or(
        eq(ordersTable.orderNumber, orderCode),
        eq(ordersTable.orderNumber, cleanCode),
        eq(ordersTable.orderNumber, `BRD-MANUAL-${cleanCode}`)
      )
    );

    if (orderResults.length === 0) {
      return NextResponse.json({ success: false, error: 'Order not found.' }, { status: 404 });
    }

    const order = orderResults[0];

    // Optional: verify name matches loosely if provided
    if (firstName) {
      const dbName = (order.shippingAddress as any)?.name?.toLowerCase() || '';
      const inputName = firstName.toLowerCase();
      // Only check if it's not a generic guest name
      if (dbName && dbName !== 'guest' && dbName !== 'guest customer') {
        if (!dbName.includes(inputName) && !inputName.includes(dbName)) {
          // Name doesn't match
          return NextResponse.json({ success: false, error: 'Name does not match order records.' }, { status: 401 });
        }
      }
    }

    // Map DB status to Kanban stage
    let stage = 1;
    if (order.status === 'processing') stage = 2;
    if (order.status === 'manufacturing') stage = 3;
    if (order.status === 'shipped') stage = 5;
    if (order.status === 'delivered') stage = 6;

    const formattedOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: (order.shippingAddress as any)?.name || 'Customer',
      email: order.email,
      productName: 'Storefront Order',
      material: 'Standard', 
      total: Number(order.total) || 0,
      date: new Date(order.createdAt).toISOString().split('T')[0],
      currentStage: stage,
      comments: order.comments || [],
      uploadedPhotos: order.uploadedPhotos || {}
    };

    return NextResponse.json({ success: true, data: formattedOrder });

  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
