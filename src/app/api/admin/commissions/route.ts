import { NextResponse } from 'next/server';

// Shared store — same instance as /api/commission in dev, separate in prod serverless
// This is acceptable for MVP; swap for DB query in future
let commissionStore: any[] = [];

export async function GET() {
  // Try fetching from the live commission route store
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/commission`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ commissions: data.commissions || [] });
    }
  } catch {}
  return NextResponse.json({ commissions: commissionStore });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, adminNotes } = body;

    // Update in our local store
    commissionStore = commissionStore.map((c: any) =>
      c.id === id ? { ...c, status, adminNotes: adminNotes ?? c.adminNotes } : c
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update commission' }, { status: 500 });
  }
}
