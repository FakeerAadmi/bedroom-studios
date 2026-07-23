"use client";
// @ts-nocheck
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const supabase = createClient();
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!form.phone.trim()) {
      setError('Phone number is required for delivery coordination.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName, phone: form.phone } }
      });
      if (authError) throw authError;

      if (data.user) {
        await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.user.id, email: form.email, fullName: form.fullName, phone: form.phone })
        });
      }

      if (data.session) {
        router.push('/account');
        router.refresh();
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: string) => {
    setOauthLoading(provider);
    await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=/account` }
    });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-paper">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-3xl">✉️</div>
          <h1 className="font-display text-3xl font-bold">Almost there!</h1>
          <p className="mt-3 text-ink/60">We sent a confirmation to <strong>{form.email}</strong>. Click the link to activate your account.</p>
          <Link href="/account/login" className="mt-6 inline-block text-sm font-bold text-ink hover:text-accent transition">→ Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-paper">

      {/* ── LEFT PANEL — GIF / VISUAL ───────────────────────────────── */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col items-center justify-end overflow-hidden bg-ink">
        {/* Drop your gif/video here — replace the src with your file path */}
        <video
          id="auth-left-video-signup"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        >
          {/* Replace this src with your gif or video file */}
          <source src="/auth-bg.mp4" type="video/mp4" />
        </video>

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />

        {/* Bottom caption */}
        <div className="relative z-10 p-10 text-paper">
          <p className="font-display text-3xl font-bold leading-tight">
            Built in a bedroom.<br />Shipped with intent.
          </p>
          <p className="mt-3 text-sm text-paper/60 max-w-xs">
            Small-batch desk objects handmade in India. Your build is tracked every step of the way.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — FORM ──────────────────────────────────────── */}
      <div className="flex w-full lg:w-1/2 xl:w-[45%] flex-col items-center justify-center px-8 py-16 overflow-y-auto">
        <div className="w-full max-w-sm">

          {/* Brand */}
          <Link href="/" className="inline-block font-display text-base font-bold mb-10 hover:text-accent transition-colors">
            ← Bedroom Studios
          </Link>

          <h1 className="font-display text-4xl font-bold">Create account.</h1>
          <p className="mt-2 mb-8 text-ink/50 text-sm">Track your builds, save addresses, shop faster.</p>

          {/* OAuth providers */}
          <div className="flex flex-col gap-3 mb-6">
            {OAUTH_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                id={`signup-oauth-${provider.id}`}
                onClick={() => handleOAuth(provider.id)}
                disabled={!!oauthLoading}
                className="flex items-center justify-center gap-3 rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium shadow-sm hover:border-ink/25 hover:shadow-md transition disabled:opacity-60"
              >
                {oauthLoading === provider.id
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : provider.icon
                }
                <span>Continue with {provider.label}</span>
              </button>
            ))}
          </div>

          <div className="relative my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-ink/10" />
            <span className="text-xs uppercase tracking-[0.2em] text-ink/35">or</span>
            <div className="flex-1 h-px bg-ink/10" />
          </div>

          {/* Email form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Full Name</label>
                <input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={handleChange} placeholder="Priyaansh H" className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">
                  Phone <span className="text-red-400 font-normal normal-case tracking-normal text-[10px]">req.</span>
                </label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+91 98765" className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30" />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Email</label>
              <input id="signup-email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30" />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Password</label>
              <div className="relative">
                <input id="signup-password" name="password" type={showPassword ? 'text' : 'password'} required minLength={8} value={form.password} onChange={handleChange} placeholder="At least 8 characters" className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30" />
                <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}

            <button type="submit" disabled={isLoading || !!oauthLoading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3.5 text-sm font-bold text-paper transition hover:bg-accent hover:text-ink disabled:opacity-50">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Create account
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>

            <p className="text-center text-[10px] text-ink/30 leading-relaxed">
              Phone is used for delivery only — never shared.
            </p>
          </form>

          <p className="mt-8 text-center text-sm text-ink/50">
            Already have an account?{' '}
            <Link href="/account/login" className="font-bold text-ink hover:text-accent transition">Log in</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
