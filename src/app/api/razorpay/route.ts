import { NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, payments } from '@/db/schema';
import { PaymentService } from '@/lib/payments/razorpay';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order_id) {
      return NextResponse.json({ success: false, message: 'Missing parameters' }, { status: 400 });
    }

    const isValid = PaymentService.verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isValid) {
      // Update payment status
      await db.update(payments)
        .set({ 
          status: 'captured',
          razorpayPaymentId: razorpay_payment_id,
          updatedAt: new Date()
        })
        .where(eq(payments.razorpayOrderId, razorpay_order_id));
        
      // Also update order status to processing
      await db.update(orders)
        .set({ status: 'processing' })
        .where(eq(orders.id, order_id));
        
      return NextResponse.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Razorpay verification error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
