import { NextResponse } from 'next/server';
import { sendDiscordAlert, DiscordColors } from '@/lib/discord';

// In-memory store for workshop supplies
// Format: { id, name, category, quantity, unit, threshold, brand, cost, notes, lastRestocked }
const supplies: any[] = [];

export async function GET() {
  return NextResponse.json({ supplies });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = {
      id: `SUP-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      lastRestocked: new Date().toISOString(),
    };
    supplies.unshift(item);

    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add supply' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    const idx = supplies.findIndex((s) => s.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Supply not found' }, { status: 404 });
    }

    const oldQty = supplies[idx].quantity;
    supplies[idx] = { ...supplies[idx], ...updates };

    // Check if it dropped below threshold
    if (oldQty > supplies[idx].threshold && supplies[idx].quantity <= supplies[idx].threshold) {
      await sendDiscordAlert(
        '⚠️ Low Stock Alert (Workshop)',
        `**${supplies[idx].name}** has dropped to ${supplies[idx].quantity} ${supplies[idx].unit} (Threshold: ${supplies[idx].threshold}). Time to restock.`,
        { color: DiscordColors.amber }
      );
    }

    return NextResponse.json({ success: true, item: supplies[idx] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update supply' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const idx = supplies.findIndex((s) => s.id === id);
    if (idx !== -1) supplies.splice(idx, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete supply' }, { status: 500 });
  }
}
