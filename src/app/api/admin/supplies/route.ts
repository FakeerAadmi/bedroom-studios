import { NextResponse } from 'next/server';
import { db } from '@/db';
import { workshopSupplies } from '@/db/schema';
import { sendDiscordAlert, DiscordColors } from '@/lib/discord';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const suppliesList = await db.select().from(workshopSupplies);
    return NextResponse.json({ supplies: suppliesList });
  } catch (err: any) {
    console.error('Error fetching supplies:', err);
    return NextResponse.json({ error: 'Failed to fetch supplies' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newSupply = await req.json();
    
    // Auto-generate ID if not provided
    if (!newSupply.id) {
      newSupply.id = `sup_${Date.now()}`;
    }
    
    await db.insert(workshopSupplies).values(newSupply);
    
    return NextResponse.json({ success: true, item: newSupply });
  } catch (err: any) {
    console.error('Error creating supply:', err);
    return NextResponse.json({ error: 'Failed to create supply' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, updates } = await req.json();
    
    const [updatedSupply] = await db.update(workshopSupplies)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(workshopSupplies.id, id))
      .returning();
      
    if (updatedSupply) {
      if (updatedSupply.quantity <= updatedSupply.threshold) {
        await sendDiscordAlert(
          'Low Stock Alert! 🚨',
          `**Item:** ${updatedSupply.name}\n**Remaining:** ${updatedSupply.quantity} ${updatedSupply.unit}\n**Threshold:** ${updatedSupply.threshold} ${updatedSupply.unit}\n\nTime to reorder!`,
          { color: DiscordColors.red }
        );
      }
      return NextResponse.json({ success: true, item: updatedSupply });
    }
    
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  } catch (err: any) {
    console.error('Error updating supply:', err);
    return NextResponse.json({ error: 'Failed to update supply' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    
    await db.delete(workshopSupplies).where(eq(workshopSupplies.id, id));
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error deleting supply:', err);
    return NextResponse.json({ error: 'Failed to delete supply' }, { status: 500 });
  }
}
