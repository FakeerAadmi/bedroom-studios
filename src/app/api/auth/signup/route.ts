import { NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { db } from '@/db';
import { profiles } from '@/db/schema';

// This is called by Supabase Auth hook on new user signup 
// OR we call it manually after signup with the data we collected
export async function POST(request: Request) {
  const body = await request.json();
  const { userId, email, fullName, phone } = body;

  if (!userId || !email) {
    return NextResponse.json({ error: 'userId and email are required' }, { status: 400 });
  }

  try {
    await db.insert(profiles).values({
      id: userId,
      email,
      fullName: fullName || null,
      phone: phone || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Profile creation error:', err);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}
