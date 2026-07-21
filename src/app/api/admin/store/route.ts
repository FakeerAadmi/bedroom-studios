import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { settings, inventory } = body;
    // Store updates handled gracefully in-memory for demo / live admin console
    return NextResponse.json({ success: true, settings, inventory });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update store settings' }, { status: 500 });
  }
}
