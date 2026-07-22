import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
// Force IPv4 pooler port if needed for this local script
process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(':5432/', ':6543/');

import { db } from './src/db';
import { orders } from './src/db/schema';

async function seedManualOrder() {
  console.log('Seeding Priyaansh manual order using DB URL:', process.env.DATABASE_URL);
  try {
    await db.insert(orders).values({
      orderNumber: 'BRD-MANUAL-1001',
      email: 'priyaansh@example.com',
      shippingAddress: { name: 'Priyaansh H' },
      subtotal: '8000.00',
      shippingFee: '0.00',
      total: '8000.00',
      status: 'shipped', // mapped to stage 5 (Quality Check/Shipped)
      comments: [
        { text: 'Printing complete. Moving to quality check.', author: 'Admin', time: '09:00 AM' }
      ]
    });
    console.log('Success! Order inserted.');
    process.exit(0);
  } catch (err: any) {
    if (err.code === '23505') {
      console.log('Order already exists, skipping.');
      process.exit(0);
    }
    console.error('Error inserting order:', err);
    process.exit(1);
  }
}

seedManualOrder();
