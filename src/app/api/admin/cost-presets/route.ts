import { NextResponse } from 'next/server';
import { sendDiscordAlert, DiscordColors } from '@/lib/discord';

// Cost presets in-memory store
const costPresets: any[] = [];

export async function GET() {
  return NextResponse.json({ presets: costPresets });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const preset = {
      id: `PRESET-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    costPresets.unshift(preset);

    // Alert if margin is dangerously thin
    if (body.targetMargin < 20) {
      await sendDiscordAlert(
        '⚠️ Low Margin Preset Saved',
        `Product **${body.name}** saved with only ${body.targetMargin}% margin.`,
        { color: DiscordColors.amber }
      );
    }

    return NextResponse.json({ success: true, preset });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save preset' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const idx = costPresets.findIndex((p: any) => p.id === id);
    if (idx !== -1) costPresets.splice(idx, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete preset' }, { status: 500 });
  }
}
