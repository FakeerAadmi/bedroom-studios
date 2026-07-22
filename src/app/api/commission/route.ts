import { NextResponse } from 'next/server';
import { sendDiscordAlert, DiscordColors } from '@/lib/discord';

// In-memory store — persists for the lifetime of the serverless instance
// In production with a DB, swap this for a DB insert
const commissionRequests: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, details, fandom, budget, size, useCase } = body;

    const entry = {
      id: `CR-${Date.now()}`,
      name,
      email,
      fandom: fandom || (details?.match(/Fandom: ([^\n]*)/)?.[1] ?? ''),
      budget: budget || (details?.match(/Budget: ([^\n]*)/)?.[1] ?? ''),
      size: size || (details?.match(/Size: ([^\n]*)/)?.[1] ?? ''),
      useCase: useCase || (details?.match(/Use Case: ([^\n]*)/)?.[1] ?? ''),
      status: 'new',
      adminNotes: '',
      createdAt: new Date().toISOString(),
    };

    commissionRequests.unshift(entry);

    // Fire Discord notification
    await sendDiscordAlert(
      '🎨 New Commission Brief',
      `**${name}** submitted a commission request.`,
      {
        color: DiscordColors.purple,
        fields: [
          { name: 'Theme / Fandom', value: entry.fandom || 'Not specified', inline: true },
          { name: 'Budget', value: entry.budget || 'Not specified', inline: true },
          { name: 'Size', value: entry.size || 'Not specified', inline: true },
          { name: 'Use Case', value: entry.useCase || 'Not specified', inline: false },
          { name: 'Email', value: email, inline: true },
        ],
      }
    );

    return NextResponse.json({ success: true, id: entry.id });
  } catch (error) {
    console.error('Commission POST error:', error);
    return NextResponse.json({ error: 'Failed to submit commission' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ commissions: commissionRequests });
}
