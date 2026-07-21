import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders as ordersTable } from '@/db/schema';

// In-memory fallback order store for demo / development when DB is unpopulated
const mockOrders: Record<string, any> = {
  '1001': {
    id: '1001',
    customerName: 'Aarav Sharma',
    email: 'aarav@example.com',
    productName: 'Halo Lamp',
    material: 'Cast cement + PLA+',
    total: 1890,
    date: '2026-07-20',
    currentStage: 3,
    comments: [
      { text: 'Base casting complete. Preparing PLA shade.', author: 'Admin', time: '10:30 AM' }
    ]
  },
  '1002': {
    id: '1002',
    customerName: 'Riya Patel',
    email: 'riya@example.com',
    productName: 'Monolith Catchall',
    material: 'Natural Cement',
    total: 1450,
    date: '2026-07-21',
    currentStage: 1,
    comments: []
  }
};

export async function GET() {
  try {
    let dbOrdersList: any[] = [];
    try {
      dbOrdersList = await db.select().from(ordersTable);
    } catch (e) {
      console.warn('DB not reachable in /api/admin, returning mock orders.', e);
    }

    const formattedOrders = { ...mockOrders };

    if (dbOrdersList && dbOrdersList.length > 0) {
      dbOrdersList.forEach((order: any) => {
        formattedOrders[order.orderNumber || order.id] = {
          id: order.orderNumber || order.id,
          customerName: order.shippingAddress?.name || 'Customer',
          email: order.email,
          productName: 'Desk Drop',
          material: 'Cast Cement / Printed Utility',
          total: Number(order.total) || 0,
          date: new Date(order.createdAt).toISOString().split('T')[0],
          currentStage: order.status === 'delivered' ? 6 : order.status === 'shipped' ? 5 : 2,
          comments: []
        };
      });
    }

    return NextResponse.json({ orders: formattedOrders });
  } catch (error) {
    return NextResponse.json({ orders: mockOrders });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { orderId, orderData } = body;
    if (orderId && orderData) {
      mockOrders[orderId] = orderData;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
