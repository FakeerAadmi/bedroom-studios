import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(':5432/', ':6543/');

import { db } from './src/db';
import { orders } from './src/db/schema';
import { eq } from 'drizzle-orm';

async function updatePriyaanshOrder() {
  try {
    await db.update(orders).set({
      orderNumber: 'BS-1001',
      createdAt: new Date('2026-06-17T00:00:00.000Z')
    }).where(eq(orders.orderNumber, 'BRD-MANUAL-1001'));
    console.log('Successfully updated order');
    process.exit(0);
  } catch (err) {
    console.error('Error updating order:', err);
    process.exit(1);
  }
}
updatePriyaanshOrder();
