import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { db } from '@/db';
import { addresses } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await db.select().from(addresses).where(eq(addresses.profileId, user.id));
  return NextResponse.json({ addresses: rows });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { fullName, phone, streetAddress, city, state, pincode, isDefault } = body;

  // If setting as default, unset all others first
  if (isDefault) {
    await db.update(addresses).set({ isDefault: false }).where(eq(addresses.profileId, user.id));
  }

  const [newAddress] = await db.insert(addresses).values({
    id: uuidv4(),
    profileId: user.id,
    fullName,
    phone,
    streetAddress,
    city,
    state,
    pincode,
    isDefault: isDefault ?? false,
  }).returning();

  return NextResponse.json({ address: newAddress });
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, fullName, phone, streetAddress, city, state, pincode, isDefault } = body;

  if (isDefault) {
    await db.update(addresses).set({ isDefault: false }).where(eq(addresses.profileId, user.id));
  }

  await db.update(addresses).set({
    fullName, phone, streetAddress, city, state, pincode, isDefault: isDefault ?? false,
    updatedAt: new Date(),
  }).where(and(eq(addresses.id, id), eq(addresses.profileId, user.id)));

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await request.json();
  await db.delete(addresses).where(and(eq(addresses.id, id), eq(addresses.profileId, user.id)));
  return NextResponse.json({ success: true });
}
