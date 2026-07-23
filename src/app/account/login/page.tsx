"use client";
// @ts-nocheck
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

const OAUTH_PROVIDERS = [
  {
    id: 'google',
    label: 'Google',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/>
      </svg>
    ),
  },
  {
    id: 'apple',
    label: 'Apple',
    icon: (
      <svg width="17" height="17" viewBox="0 0 814 1000" fill="currentColor">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 405.8.1 303.5.1 205.6 0 104.3 45.7 55.1 97.2 32.9c47.6-20.4 108.2-32.9 163.7-32.9 59.2 0 112.9 20.6 148.4 20.6 34.2 0 93.4-23.7 163.7-23.7 31 0 138.2 2.6 208.5 97.7zm-135-170.7c30.4-35.4 52.4-84.7 52.4-134s-3.2-10.4-4.5-10.4c-43.3 2.6-94.7 28.9-125.8 64.3-28.2 32.3-55.1 81.6-55.1 132.5 0 5.2.6 10.4 1.3 12.4 3.2.6 7.1 1.3 11 1.3 38.4 0 86.4-25.5 120.7-65.1z"/>
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'discord',
    label: 'Discord',
    icon: (
      <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="#5865F2">
        <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15zM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69z"/>
      </svg>
    ),
  },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState('');
  const [error, setError] = useState('');
  const [magicSent, setMagicSent] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (isMagicLink) {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}${redirect}` }
        });
        if (error) throw error;
        setMagicSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(redirect);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: string) => {
    setOauthLoading(provider);
    await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=${redirect}` }
    });
  };

  if (magicSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-paper">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-3xl">✉️</div>
          <h1 className="font-display text-3xl font-bold">Check your email</h1>
          <p className="mt-3 text-ink/60">We sent a magic link to <strong>{email}</strong>. Click it to log in instantly.</p>
          <button onClick={() => setMagicSent(false)} className="mt-6 text-sm text-ink/50 hover:text-ink underline">Try again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-paper">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block font-display text-lg font-bold mb-8 hover:text-accent transition-colors">
            Bedroom Studios
          </Link>
          <h1 className="font-display text-4xl font-bold">Welcome back.</h1>
          <p className="mt-2 text-ink/55 text-sm">Log in to track your builds and manage your orders.</p>
        </div>

        {/* OAuth providers */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {OAUTH_PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleOAuth(provider.id)}
              disabled={!!oauthLoading}
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium shadow-sm hover:border-ink/30 hover:shadow-md transition disabled:opacity-60"
            >
              {oauthLoading === provider.id
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : provider.icon
              }
              <span>{provider.label}</span>
            </button>
          ))}
        </div>

        <div className="relative mb-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-ink/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-ink/35">or continue with email</span>
          <div className="flex-1 h-px bg-ink/10" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Email</label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30"
            />
          </div>

          {!isMagicLink && (
            <div>
              <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-2 text-right">
                <Link href="/account/reset-password" className="text-xs text-ink/45 hover:text-ink transition">Forgot password?</Link>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading || !!oauthLoading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3.5 text-sm font-bold text-paper transition hover:bg-accent hover:text-ink disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isMagicLink ? 'Send magic link' : 'Log in'}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <button
          onClick={() => { setIsMagicLink((p) => !p); setError(''); }}
          className="mt-4 w-full text-center text-xs text-ink/45 hover:text-ink transition underline"
        >
          {isMagicLink ? '← Log in with password instead' : 'Send me a magic link instead →'}
        </button>

        <p className="mt-8 text-center text-sm text-ink/50">
          Don't have an account?{' '}
          <Link href="/account/signup" className="font-bold text-ink hover:text-accent transition">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
