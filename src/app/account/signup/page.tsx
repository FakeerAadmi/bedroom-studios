"use client";
// @ts-nocheck
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!form.phone.trim()) {
      setError('Phone number is required.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Create Supabase Auth user
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.fullName, phone: form.phone }
        }
      });
      if (authError) throw authError;

      // 2. Create profile row in Postgres with full details
      if (data.user) {
        await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data.user.id,
            email: form.email,
            fullName: form.fullName,
            phone: form.phone,
          })
        });
      }

      // If email confirmation is enabled, show success; otherwise redirect
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

  const handleGoogleSignup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=/account` }
    });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-paper">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-3xl">✉️</div>
          <h1 className="font-display text-3xl font-bold">Almost there!</h1>
          <p className="mt-3 text-ink/60">We sent a confirmation email to <strong>{form.email}</strong>. Click the link to activate your account.</p>
          <Link href="/account/login" className="mt-6 inline-block text-sm font-bold text-ink hover:text-accent transition">
            → Back to login
          </Link>
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
          <h1 className="font-display text-4xl font-bold">Create account.</h1>
          <p className="mt-2 text-ink/55 text-sm">Track your builds, save addresses, and shop faster.</p>
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogleSignup}
          className="mb-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-sm font-medium shadow-sm hover:border-ink/30 hover:shadow-md transition"
        >
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/></svg>
          Continue with Google
        </button>

        <div className="relative mb-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-ink/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-ink/35">or</span>
          <div className="flex-1 h-px bg-ink/10" />
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Priyaansh H"
                className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 placeholder:text-ink/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
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
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3.5 text-sm font-bold text-paper transition hover:bg-accent hover:text-ink disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Create account
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="text-center text-[11px] text-ink/35 leading-relaxed">
            By signing up you agree to our Terms of Service. Your phone is used for delivery coordination only.
          </p>
        </form>

        <p className="mt-8 text-center text-sm text-ink/50">
          Already have an account?{' '}
          <Link href="/account/login" className="font-bold text-ink hover:text-accent transition">Log in</Link>
        </p>
      </div>
    </div>
  );
}
