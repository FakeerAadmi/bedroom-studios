"use client";
// @ts-nocheck
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const supabase = createClient();

  // Detect if this is a reset flow (has recovery token in URL) or forgot-password flow
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes('type=recovery') && !hash.includes('access_token')) {
      setIsForgot(true);
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => router.push('/account'), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account/reset-password`,
      });
      if (error) throw error;
      setEmailSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-paper">
        <div className="max-w-md text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-3xl">✉️</div>
          <h1 className="font-display text-3xl font-bold">Check your email</h1>
          <p className="mt-2 text-ink/60">We sent a password reset link to <strong>{email}</strong>.</p>
          <Link href="/account/login" className="mt-6 inline-block text-sm font-bold hover:text-accent transition">← Back to login</Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-paper">
        <div className="max-w-md text-center">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
          <h1 className="font-display text-3xl font-bold">Password updated!</h1>
          <p className="mt-2 text-ink/60">Redirecting you to your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-paper">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block font-display text-lg font-bold mb-8 hover:text-accent transition-colors">Bedroom Studios</Link>
          <h1 className="font-display text-4xl font-bold">{isForgot ? 'Forgot password?' : 'Set new password'}</h1>
          <p className="mt-2 text-ink/55 text-sm">{isForgot ? "Enter your email and we'll send a reset link." : 'Enter your new password below.'}</p>
        </div>

        <form onSubmit={isForgot ? handleForgot : handleReset} className="space-y-4">
          {isForgot ? (
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition placeholder:text-ink/30" />
            </div>
          ) : (
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">New Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="w-full rounded-2xl border border-ink/15 bg-white/60 px-4 py-3.5 pr-12 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition placeholder:text-ink/30" />
                <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {error && <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}

          <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3.5 text-sm font-bold text-paper hover:bg-accent hover:text-ink disabled:opacity-50 transition">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isForgot ? 'Send reset link' : 'Update password'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/50">
          <Link href="/account/login" className="hover:text-ink transition">← Back to login</Link>
        </p>
      </div>
    </div>
  );
}
