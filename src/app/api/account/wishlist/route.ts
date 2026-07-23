import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { db } from '@/db';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET: returns cloud wishlist
export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [profile] = await db.select().from(profiles).where(eq(profiles.id, user.id));
  const items = (profile as any)?.wishlistItems || [];
  return NextResponse.json({ items });
}

// PUT: merge local + cloud wishlists and persist
export async function PUT(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { items } = body; // array of product IDs from client (already merged)

  await db.update(profiles)
    .set({ updatedAt: new Date(), ...(({ wishlistItems: items } as any)) })
    .where(eq(profiles.id, user.id));

  return NextResponse.json({ success: true });
}
