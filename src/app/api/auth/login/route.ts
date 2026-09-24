import { NextResponse } from 'next/server';
import { generateAdminSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const envUser = process.env.ADMIN_USERNAME || process.env.ADMIN_USER || process.env.HQ_USERNAME || process.env.HQ_USER;
    const envPass = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || process.env.HQ_PASSWORD || process.env.HQ_PASS;

    const inputUser = (username || '').toLowerCase().trim();
    const inputPass = (password || '').trim();

    let isMatch = false;

    // 1. Check against environment variables if configured
    if (envPass) {
      const isUserMatch = !envUser || inputUser === envUser.toLowerCase().trim() || inputUser === 'admin';
      const isPassMatch = inputPass === envPass.trim();
      if (isUserMatch && isPassMatch) {
        isMatch = true;
      }
    } else {
      // 2. Fallback check for local development / demo only when no env pass is set
      const validUsernames = ['admin', 'workshop', 'bedroom'];
      const validPasswords = ['bedroom123', 'admin', 'studio'];
      
      const isUserValid = !inputUser || validUsernames.includes(inputUser);
      const isPassValid = validPasswords.includes(inputPass);
      
      if (isUserValid && isPassValid) {
        isMatch = true;
      }
    }

    if (isMatch) {
      const sessionToken = generateAdminSessionToken();
      const response = NextResponse.json({ success: true });
      response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
