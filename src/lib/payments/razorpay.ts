import Razorpay from 'razorpay';
import crypto from 'crypto';

// Sandbox safe initialization
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'fake_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'fake_key_secret',
});

export class PaymentService {
  /**
   * Create an order on Razorpay servers.
   */
  static async createOrder(amount: number, receiptId: string) {
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.warn('Razorpay missing. Returning mock order.');
      return { id: `order_mock_${Date.now()}`, amount: amount * 100, currency: 'INR' };
    }

    try {
      const options = {
        amount: Math.round(amount * 100), // Razorpay expects paise
        currency: 'INR',
        receipt: receiptId,
      };
      
      const order = await razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error('Razorpay Order Creation Failed:', error);
      throw new Error('Payment initialization failed.');
    }
  }

  /**
   * Verify Razorpay signature received from client or webhook.
   */
  static verifySignature(orderId: string, paymentId: string, signature: string) {
    const secret = process.env.RAZORPAY_KEY_SECRET || 'fake_key_secret';
    const body = orderId + "|" + paymentId;
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');
      
    return expectedSignature === signature;
  }
}
