import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/account';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    // Auto-create profile if new Google user
    if (data?.user && !error) {
      await fetch(`${requestUrl.origin}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name || data.user.user_metadata?.name || null,
          phone: data.user.user_metadata?.phone || null,
        })
      });
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
