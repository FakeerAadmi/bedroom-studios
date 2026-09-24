import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth/admin';

export async function GET() {
  const isAuthenticated = await verifyAdminRequest();

  if (isAuthenticated) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
