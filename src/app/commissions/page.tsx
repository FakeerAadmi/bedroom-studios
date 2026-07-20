// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from 'react';

import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import PageShell from '@/components/PageShell';

const initialForm = {
  name: '',
  email: '',
  fandom: '',
  budget: '5000-10000',
  size: 'desk',
  useCase: '',
};

export default function CommissionPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const formRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          details: `Fandom: ${form.fandom}\nBudget: ${form.budget}\nSize: ${form.size}\nUse Case: ${form.useCase}`
        })
      });

      if (!response.ok) throw new Error('Failed to send commission');

      setStatus('sent');
      setForm(initialForm);
    } catch (error) {
      console.error('Commission error:', error);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <PageShell className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-10 md:px-8">
        <div className="w-full rounded-[2.5rem] border border-ink/15 bg-white/50 p-10 shadow-card md:p-14 text-center flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#edf4ff]">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <p className="mt-6 font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
            Commission request sent
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            You brought the lore. We'll handle the rest.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/70">
            Your brief landed in the inbox. We'll review it and come back within 2–3 days with
            a rough scope and a realistic number.
          </p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <>

        <title>Custom Commissions — Bedroom Studios</title>
        <meta name="description" content="Commission a custom desk object, fandom prop, diorama, or collectible display. We build to your brief — small-batch, made in India." />
        <meta property="og:title" content="Custom Commissions — Bedroom Studios" />
        <meta property="og:description" content="Commission a custom desk object, fandom prop, diorama, or collectible display. We build to your brief." />
      
      </>
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
            Commission desk
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Custom builds for fandom people, gift givers, and tasteful obsessives.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            If the catalog gets close but not quite there, this is where custom desk objects,
            themed props, collectible displays, and dioramas begin.
          </p>

          <div className="mt-8 grid gap-4">
            <InfoBlock title="Budget realism" body="Tell us the range early. It saves everyone from a beautiful but impossible idea." />
            <InfoBlock title="Fandom context" body="Name the world, character, scene, map, or reference energy you want us to interpret." />
            <InfoBlock title="Use case" body="Display piece, desk prop, event gift, content shoot, shelf collectible, or something stranger." />
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[2.5rem] border border-ink bg-white/70 p-6 shadow-card md:p-8"
        >
          <Field label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
          <Field label="Email" type="email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
          <Field label="Fandom / theme" value={form.fandom} onChange={(value) => setForm((current) => ({ ...current, fandom: value }))} />

          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              label="Budget"
              value={form.budget}
              onChange={(value) => setForm((current) => ({ ...current, budget: value }))}
              options={['Under 5k', '5000-10000', '10000-20000', '20000+']}
            />
            <SelectField
              label="Size"
              value={form.size}
              onChange={(value) => setForm((current) => ({ ...current, size: value }))}
              options={['desk', 'shelf', 'diorama', 'gift-box']}
            />
          </div>

          <Field
            label="Use case"
            multiline
            value={form.useCase}
            onChange={(value) => setForm((current) => ({ ...current, useCase: value }))}
          />

          {status === 'error' && (
            <div className="flex items-start gap-3 rounded-[1.5rem] border border-[#db2a63]/30 bg-[#fff0f5] px-4 py-3 text-sm text-[#db2a63]">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>Something went wrong sending your brief. Please try again or email us directly.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-medium text-paper transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-80"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              'Send commission brief'
            )}
          </button>
        </form>
      </section>
    </PageShell>
  );
}

function Field({ label, multiline = false, onChange, type = 'text', value }) {
  const className =
    'w-full rounded-[1.5rem] border border-ink/15 bg-paper px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20';

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/70">{label}</span>
      {multiline ? (
        <textarea rows={5} value={value} onChange={(event) => onChange(event.target.value)} className={`${className} resize-none`} required />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className={className} required />
      )}
    </label>
  );
}

function SelectField({ label, onChange, options, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/70">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-[1.5rem] border border-ink/15 bg-paper px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InfoBlock({ body, title }) {
  return (
    <div className="rounded-[1.8rem] border border-ink/10 bg-[#f4f1ea] p-5">
      <p className="text-sm uppercase tracking-[0.25em] text-ink/45">{title}</p>
      <p className="mt-3 text-ink/70">{body}</p>
    </div>
  );
}
