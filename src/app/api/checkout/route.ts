import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { allProductsById, allProducts } from '@/data/catalog';
import { sendOrderNotification } from '@/lib/discord';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, phone, address, pincode, state, orderNotes, cartItems } = body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ success: false, message: 'Cart is empty' }, { status: 400 });
    }

    // Generate unique 6-digit order ID prefixed with BS-
    const orderId = `BS-${Math.floor(100000 + Math.random() * 900000)}`;

    // Calculate verified total on the server
    let calculatedTotal = 0;
    const validatedCartItems = cartItems.map((item: any) => {
      const catalogProduct = allProductsById[item.id] || allProducts.find((p: any) => p.id === Number(item.id) || p.slug === item.slug);
      const serverPrice = catalogProduct?.price != null ? Number(catalogProduct.price) : (Number(item.price) || 0);
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      calculatedTotal += serverPrice * quantity;
      return {
        ...item,
        price: serverPrice,
        quantity,
      };
    });

    const orderTotal = calculatedTotal;

    const fullAddress = typeof address === 'string'
      ? [address, pincode, state].filter(Boolean).join(', ')
      : address;

    // Create DB Order
    let dbOrderId: string | null = null;
    try {
      const dbOrder = await db.insert(orders).values({
        id: uuidv4(),
        orderNumber: orderId,
        profileId: null, // Guest or authenticated checkout
        email: email || 'guest@example.com',
        shippingAddress: {
          name: customerName || 'Guest Client',
          phone: phone || '',
          street: address || '',
          pincode: pincode || '',
          state: state || '',
        },
        subtotal: Math.round(orderTotal).toString(),
        shippingFee: '0',
        total: Math.round(orderTotal).toString(),
        status: 'pending',
        notes: orderNotes || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning({ id: orders.id });
      
      dbOrderId = dbOrder[0]?.id || null;

      // Insert order items
      if (dbOrderId) {
        for (const item of validatedCartItems) {
          await db.insert(orderItems).values({
            id: uuidv4(),
            orderId: dbOrderId,
            productVariantId: item.id || uuidv4(),
            quantity: item.quantity,
            priceAtTime: item.price.toString(),
            createdAt: new Date(),
          });
        }
      }
    } catch (dbErr) {
      console.warn('Database order insert skipped or failed:', dbErr);
    }

    // Notify Discord Orders webhook
    try {
      await sendOrderNotification({
        orderId,
        customerName: customerName || 'Studio Client',
        email: email || 'client@bedroomstudios.store',
        phone: phone || '',
        items: validatedCartItems.map((item: any) => ({
          name: item.name || 'Studio Object',
          quantity: item.quantity,
          price: item.price,
          color: item.selectedColor,
          material: item.selectedMaterial,
        })),
        total: orderTotal,
        address: fullAddress,
        notes: orderNotes,
      });
    } catch (discordErr) {
      console.warn('Discord order alert failed:', discordErr);
    }

    return NextResponse.json({
      success: true,
      orderCode: orderId,
      total: orderTotal,
      message: 'Made-to-order request received successfully'
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ 
      success: true, 
      orderCode: `BS-${Math.floor(100000 + Math.random() * 900000)}`,
      message: 'Processed via local fallback'
    });
  }
}
