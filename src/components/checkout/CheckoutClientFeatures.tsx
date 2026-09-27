"use client";

import { useMemo, useState, useEffect } from 'react';
import { LoaderCircle, ShieldCheck, Truck, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { getDeliveryInfoFromPincode } from '@/utils';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  pincode: '',
  state: '',
  orderNotes: '',
};

export default function CheckoutClientFeatures() {
  const { clearCart, items } = useCart();
  const { user, profile } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Auto-fill from account profile + default address
  useEffect(() => {
    if (!profile && !user) return;
    const autofill: any = {};
    if (profile?.fullName) autofill.name = profile.fullName;
    if (profile?.phone) autofill.phone = profile.phone;
    if (user?.email) autofill.email = user.email;
    if (Object.keys(autofill).length > 0) {
      setForm((prev) => ({ ...prev, ...autofill }));
    }
    if (user) {
      fetch('/api/account/addresses')
        .then((r) => r.json())
        .then((data) => {
          const def = (data.addresses || []).find((a: any) => a.isDefault) || data.addresses?.[0];
          if (def) {
            setForm((prev) => ({
              ...prev,
              name: prev.name || def.fullName,
              phone: prev.phone || def.phone,
              address: def.streetAddress,
              pincode: def.pincode,
              state: def.state,
            }));
          }
        })
        .catch(() => {});
    }
  }, [profile, user]);

  const deliveryInfo = useMemo(() => getDeliveryInfoFromPincode(form.pincode), [form.pincode]);
  const totalItemCount = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          pincode: form.pincode,
          state: form.state,
          orderNotes: form.orderNotes,
          cartItems: items,
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setConfirmedOrderId(data.orderCode);
      } else {
        setConfirmedOrderId(`BS-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    } catch (error) {
      console.error("Checkout request failed:", error);
      setConfirmedOrderId(`BS-${Math.floor(100000 + Math.random() * 900000)}`);
    }

    setIsSubmitting(false);
    setIsConfirmed(true);
    clearCart();
  };

  if (isConfirmed) {
    return (
      <div className="w-full rounded-[2.5rem] border border-ink bg-paper p-8 text-center shadow-card md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981]">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50 font-mono">Request Queued</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
          Your order will be confirmed soon.
        </h1>
        <p className="mt-4 text-base text-ink/75 max-w-xl mx-auto">
          Thank you! We received your made-to-order batch request. Your order reference code is:
        </p>
        <div className="mt-3 inline-block rounded-xl border border-ink/20 bg-white/80 px-6 py-2.5 font-mono text-xl font-bold text-ink shadow-sm">
          #{confirmedOrderId}
        </div>

        <div className="mt-8 rounded-2xl border border-ink/10 bg-white/70 p-6 max-w-xl mx-auto text-left space-y-3 shadow-sm">
          <p className="text-sm font-semibold text-ink flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            What happens next?
          </p>
          <ul className="text-sm text-ink/70 space-y-2 list-disc pl-5">
            <li>Our studio team is reviewing your selected pieces and customization options.</li>
            <li>Someone from our workshop will be in touch with you shortly via <strong>WhatsApp</strong> or <strong>Email</strong> to confirm your order details and production timeframe.</li>
            <li>No payment is required right now — payments are arranged directly upon batch confirmation.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex rounded-full bg-ink px-8 py-3.5 font-medium text-white transition hover:bg-accent hover:scale-[1.01]"
          >
            Explore More Studio Pieces
          </Link>
          <Link
            href={`/track?code=${confirmedOrderId}`}
            className="inline-flex rounded-full border border-ink px-7 py-3.5 font-medium text-ink transition hover:border-accent hover:text-accent"
          >
            Track Request Status
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 max-w-3xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
          Made to Order
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Request your studio batch.
        </h1>
        <p className="mt-5 text-lg text-ink/70">
          Every piece is 3D printed and hand-finished in small batches. Submit your request details below — someone from our workshop will get in touch to confirm your order.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.88fr]">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2.5rem] border border-ink p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Your Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} autoComplete="name" />
            <Field label="Mobile / WhatsApp (+91)" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} type="tel" autoComplete="tel" inputMode="tel" />
            <Field label="Email Address" type="email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} autoComplete="email" />
            <Field label="Pincode" value={form.pincode} onChange={(value) => setForm((current) => ({ ...current, pincode: value }))} autoComplete="postal-code" inputMode="numeric" />
          </div>

          {deliveryInfo ? (
            <div className="rounded-[1.8rem] border border-ink bg-[#edf4ff] p-5">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">Estimated Delivery Window</p>
                  <p className="mt-1 text-sm text-ink/65">
                    {deliveryInfo.estimate} for {deliveryInfo.region} once production completes.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <Field
            label="Shipping Address"
            value={form.address}
            onChange={(value) => setForm((current) => ({ ...current, address: value }))}
            multiline
            autoComplete="street-address"
          />

          <Field label="State / Region" value={form.state} onChange={(value) => setForm((current) => ({ ...current, state: value }))} autoComplete="address-level1" />

          <Field
            label="Special Requests / Customization Notes"
            value={form.orderNotes}
            onChange={(value) => setForm((current) => ({ ...current, orderNotes: value }))}
            multiline
            optional
          />

          {/* Made-to-order assurance card */}
          <div className="rounded-[1.8rem] border border-ink/15 bg-[#faf7f2] p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-accent shrink-0" />
              <div>
                <p className="font-medium text-ink">No payment charged right now</p>
                <p className="mt-1 text-sm text-ink/65 leading-relaxed">
                  We craft objects to order. When you submit this request, our team will review the batch specs, verify material inventory, and get in touch with you directly on WhatsApp or Email to confirm.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 font-medium text-paper transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 text-base"
          >
            {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
            {isSubmitting ? 'Sending Request to Studio...' : 'Submit Made-to-Order Request'}
          </button>
        </form>

        <aside className="h-fit rounded-[2.5rem] border border-ink bg-[#f4f1ea] p-6 md:p-8">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl font-bold">Request Summary</p>
            <span className="rounded-full border border-ink/20 bg-white/60 px-3 py-1 text-xs font-mono">
              {totalItemCount} {totalItemCount === 1 ? 'Object' : 'Objects'}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {items.length === 0 ? (
              <p className="rounded-[1.8rem] border border-dashed border-ink/20 bg-paper p-4 text-sm text-ink/60">
                Your request queue is empty. Explore our desk lamps or cementware in the catalog first.
              </p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-ink">{item.name}</p>
                      <p className="text-xs text-ink/60 font-mono mt-0.5">
                        {[item.selectedColor, item.selectedMaterial].filter(Boolean).join(' · ') || item.family || 'Studio Object'}
                      </p>
                    </div>
                    <span className="rounded-full bg-ink/10 px-2.5 py-1 text-xs font-mono font-semibold">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 space-y-3 border-t border-ink/10 pt-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Production Type</span>
              <span className="font-medium">Made to Order</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Estimated Dispatch</span>
              <span className="font-medium">{deliveryInfo?.estimate ?? '3-5 business days'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Payment Due Now</span>
              <span className="font-semibold text-[#10b981]">₹0 (Pay after confirmation)</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  multiline?: boolean;
  optional?: boolean;
  autoComplete?: string;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}) {
  const { label, multiline = false, onChange, optional = false, type = 'text', value, autoComplete, inputMode } = props;
  const commonClassName =
    'w-full rounded-[1.5rem] border border-ink/15 bg-white px-4 py-3 outline-none transition placeholder:text-ink/30 focus:border-accent focus:ring-2 focus:ring-accent/20';

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/70">
        {label}
        {optional ? ' (Optional)' : ''}
      </span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${commonClassName} resize-none`}
          required={!optional}
          autoComplete={autoComplete}
          inputMode={inputMode}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={commonClassName}
          required={!optional}
          autoComplete={autoComplete}
          inputMode={inputMode}
        />
      )}
    </label>
  );
}
