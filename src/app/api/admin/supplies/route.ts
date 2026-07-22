import { NextResponse } from 'next/server';
import { sendDiscordAlert, DiscordColors } from '@/lib/discord';

// In-memory store for workshop supplies
// Format: { id, name, category, quantity, unit, threshold, brand, cost, notes, lastRestocked }
let supplies: any[] = [
  { id: 'SUP-01', name: 'White PLA Filament', category: 'Filament', brand: 'Sovol', quantity: 0.25, unit: 'kg', threshold: 0.3, cost: 900, notes: 'Cardboard spool. Approximately 25% remaining.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-02', name: 'Pink PETG-HS Filament', category: 'Filament', brand: 'Numakers', quantity: 0.85, unit: 'kg', threshold: 0.3, cost: 1300, notes: 'High-Speed PETG. Nearly full spool.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-03', name: 'White PETG Filament', category: 'Filament', brand: 'eSUN', quantity: 0.90, unit: 'kg', threshold: 0.3, cost: 1250, notes: 'Nearly full spool.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-04', name: 'Translucent Orange PETG-HS', category: 'Filament', brand: 'Numakers', quantity: 0.90, unit: 'kg', threshold: 0.3, cost: 1300, notes: 'High-Speed PETG. Labelled Translucent Orange.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-05', name: 'Transparent White PETG', category: 'Filament', brand: 'OVERTURE', quantity: 0.90, unit: 'kg', threshold: 0.3, cost: 1450, notes: 'Transparent PETG. Nearly full.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-06', name: 'Black PETG (Smoke)', category: 'Filament', brand: 'Generic', quantity: 0.80, unit: 'kg', threshold: 0.3, cost: 1200, notes: 'Brand not visible. Appears to be PETG.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-07', name: 'Black PLA (Premium)', category: 'Filament', brand: 'Bambu Lab', quantity: 0.80, unit: 'kg', threshold: 0.3, cost: 2300, notes: 'Transferred to a generic spool. Approximately 80% remaining. Premium PLA.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-08', name: 'Isopropyl Alcohol (99.9%)', category: 'Other', brand: 'Thomso', quantity: 300, unit: 'ml', threshold: 100, cost: 220, notes: '400 ml bottle. Approximately 75% remaining. Used for print bed cleaning.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-09', name: 'Liquid Silicone RTV2 30A (Part A)', category: 'Other', brand: 'SiliconeX', quantity: 250, unit: 'g', threshold: 100, cost: 700, notes: 'One 250 g bottle. Platinum-cure RTV silicone.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-10', name: 'Liquid Silicone RTV2 30A (Part B)', category: 'Other', brand: 'SiliconeX', quantity: 250, unit: 'g', threshold: 100, cost: 700, notes: 'Second 250 g bottle completing the RTV silicone kit.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-11', name: 'Crystal Clear Art Resin (Part A)', category: 'Resin', brand: 'MBEPOXY', quantity: 1000, unit: 'g', threshold: 250, cost: 900, notes: '1 kg resin bottle. Appears mostly full.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-12', name: 'Crystal Clear Art Resin Hardener (Part B)', category: 'Resin', brand: 'MBEPOXY', quantity: 500, unit: 'g', threshold: 125, cost: 600, notes: '500 g hardener bottle. Appears mostly full.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-13', name: 'Waterproof Sandpaper Pack', category: 'Other', brand: 'AIPL/BBB', quantity: 9, unit: 'pieces', threshold: 3, cost: 250, notes: 'One sealed pack. Mixed grit assortment likely.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-14', name: 'Digital Vernier Caliper', category: 'Tool', brand: 'Generic', quantity: 1, unit: 'pieces', threshold: 1, cost: 700, notes: 'Essential measuring tool. Appears functional.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-15', name: 'Wood Handle Chisel / Scraper', category: 'Tool', brand: 'Generic', quantity: 1, unit: 'pieces', threshold: 1, cost: 300, notes: 'Used for removing prints and cleanup.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-16', name: 'Needle File Set', category: 'Tool', brand: 'Generic', quantity: 10, unit: 'pieces', threshold: 1, cost: 350, notes: 'Assorted precision files in storage tube.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-17', name: 'Allen Key (Hex Key)', category: 'Tool', brand: 'Generic', quantity: 1, unit: 'pieces', threshold: 1, cost: 20, notes: 'Single loose hex key visible.', lastRestocked: new Date().toISOString() },
  { id: 'SUP-18', name: 'Filament Dry Box', category: 'Other', brand: 'Generic', quantity: 1, unit: 'pieces', threshold: 1, cost: 1500, notes: 'Used for moisture-sensitive filament storage.', lastRestocked: new Date().toISOString() },
];

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
