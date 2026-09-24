import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth/admin';

export async function PUT(request: Request) {
  if (!await verifyAdminRequest()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { settings, inventory } = body;
    return NextResponse.json({ success: true, settings, inventory });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update store settings' }, { status: 500 });
  }
}
