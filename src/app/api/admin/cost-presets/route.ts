import { NextResponse } from 'next/server';
import { db } from '@/db';
import { costPresets } from '@/db/schema';
import { sendDiscordAlert, DiscordColors } from '@/lib/discord';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const presetsList = await db.select().from(costPresets);
    return NextResponse.json({ presets: presetsList });
  } catch (err: any) {
    console.error('Error fetching cost presets:', err);
    return NextResponse.json({ error: 'Failed to fetch presets' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const newPreset = {
      id: `PRESET-${Date.now()}`,
      name: body.name,
      materialCostPerKg: body.materialCostPerKg || 0,
      printWeight: body.printWeight || 0,
      printTimeHours: body.printTimeHours || 0,
      powerConsumptionKw: body.powerConsumptionKw || 0,
      powerCostPerKwh: body.powerCostPerKwh || 0,
      failureRatePercent: body.failureRatePercent || 0,
      laborTimeHours: body.laborTimeHours || 0,
      laborRatePerHour: body.laborRatePerHour || 0,
      marginPercent: body.targetMargin || 0,
    };
    
    await db.insert(costPresets).values(newPreset);

    // Alert if margin is dangerously thin
    if (newPreset.marginPercent < 20) {
      await sendDiscordAlert(
        '⚠️ Low Margin Preset Saved',
        `Product **${newPreset.name}** saved with only ${newPreset.marginPercent}% margin.`,
        { color: DiscordColors.amber }
      );
    }

    return NextResponse.json({ success: true, preset: newPreset });
  } catch (err: any) {
    console.error('Error saving preset:', err);
    return NextResponse.json({ error: 'Failed to save preset' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    
    await db.delete(costPresets).where(eq(costPresets.id, id));
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error deleting preset:', err);
    return NextResponse.json({ error: 'Failed to delete preset' }, { status: 500 });
  }
}
