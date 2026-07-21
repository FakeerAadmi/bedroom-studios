import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const envUser = process.env.ADMIN_USERNAME || process.env.ADMIN_USER || process.env.HQ_USERNAME || process.env.HQ_USER;
    const envPass = process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || process.env.HQ_PASSWORD || process.env.HQ_PASS;

    const inputUser = (username || '').toLowerCase().trim();
    const inputPass = (password || '').trim();

    // Check against Vercel environment variables first
    let isMatch = false;

    if (envPass) {
      const isUserMatch = !envUser || inputUser === envUser.toLowerCase().trim() || inputUser === 'admin';
      const isPassMatch = inputPass === envPass.trim();
      if (isUserMatch && isPassMatch) {
        isMatch = true;
      }
    }

    // Fallback checks for local development or default access
    if (!isMatch) {
      const validUsernames = ['admin', 'workshop', 'bedroom'];
      const validPasswords = ['bedroom', 'bedroom123', 'admin', 'studio'];
      
      const isUserValid = !inputUser || validUsernames.includes(inputUser);
      const isPassValid = validPasswords.includes(inputPass);
      
      if (isUserValid && isPassValid) {
        isMatch = true;
      }
    }

    if (isMatch) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('hq_auth_token', 'authenticated', {
        httpOnly: false,
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
