import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const validUsernames = ['admin', 'workshop', 'bedroom'];
    const validPasswords = [
      process.env.ADMIN_PASSWORD,
      'bedroom',
      'bedroom123',
      'admin',
      'studio',
    ].filter(Boolean);

    const isUsernameValid = !username || validUsernames.includes(username.toLowerCase().trim());
    const isPasswordValid = validPasswords.includes(password?.trim());

    if (isUsernameValid && isPasswordValid) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('hq_auth_token', 'authenticated', {
        httpOnly: false, // Accessible by client JS as well for cookie checks
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
