import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'bedroom-studios-secure-session-salt-2026';
const SESSION_COOKIE_NAME = 'hq_auth_token';
const MAX_SESSION_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Generate a cryptographically signed session token.
 * Format: <timestamp>.<signature>
 */
export function generateAdminSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(timestamp)
    .digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Validates a signed session token.
 */
export function isValidAdminSessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestampStr, providedSignature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiration
  if (Date.now() - timestamp > MAX_SESSION_AGE_MS) return false;
  // Token cannot be in the future beyond clock drift (e.g. 1 min)
  if (timestamp > Date.now() + 60 * 1000) return false;

  const expectedSignature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(timestampStr)
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(providedSignature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
}

/**
 * Verifies admin authentication from cookies in Server Components or Route Handlers.
 */
export async function verifyAdminRequest(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return isValidAdminSessionToken(token);
  } catch {
    return false;
  }
}

export { SESSION_COOKIE_NAME };
