"use client";

import { useMemo, useState, useEffect } from 'react';
import { LoaderCircle, ShieldCheck, TicketPercent, Truck, User } from 'lucide-react';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { applyCoupon, formatPrice, getDeliveryInfoFromPincode } from '@/utils';

const paymentMethods = [
  {
    id: 'upi',
    title: 'UPI (GPay, PhonePe, Paytm)',
    note: 'Fastest, cleanest, emotionally stable option.',
    recommended: true,
    extra: 0,
  },
  {
    id: 'cards',
    title: 'Cards / Netbanking',
    note: 'Classic checkout behavior. No notes.',
    recommended: false,
    extra: 0,
  },
  {
    id: 'cod',
    title: 'Cash on Delivery (₹50 extra)',
    note: 'For people who need one last trust exercise.',
    recommended: false,
    extra: 50,
  },
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  pincode: '',
  state: '',
  coupon: '',
  orderNotes: '',
};

export default function CheckoutClientFeatures() {
  const { clearCart, items, subtotal } = useCart();
  const { user, profile } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

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
    // Also try to fetch default address
    if (user) {
      fetch('/api/account/addresses').then((r) => r.json()).then((data) => {
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
      }).catch(() => {});
    }
  }, [profile, user]);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState({ valid: false, discount: 0, message: '' });

  const paymentMeta = useMemo(
    () => paymentMethods.find((method) => method.id === selectedPayment),
    [selectedPayment],
  );
  const deliveryInfo = useMemo(() => getDeliveryInfoFromPincode(form.pincode), [form.pincode]);
  const shippingFee = deliveryInfo?.shippingFee ?? 0;
  const discount = appliedCoupon.valid ? appliedCoupon.discount : 0;
  const total = subtotal + (paymentMeta?.extra ?? 0) + shippingFee - discount;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          cartItems: items,
          total: total
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setConfirmedOrderId(data.orderCode);
      } else {
        setConfirmedOrderId('ORD-ERROR');
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      setConfirmedOrderId('ORD-LOCAL-FALLBACK');
    }

    setIsSubmitting(false);
    setIsConfirmed(true);
    clearCart();
  };

  if (isConfirmed) {
    return (
      <div className="w-full rounded-[2.5rem] border border-ink bg-paper p-8 text-center shadow-card md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-ink/50">Order confirmed</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Your desk is about to peak.
        </h1>
        <p className="mt-5 text-lg text-ink/70">
          Payment successful. Real excitement pending. Your tracking code is
          {' '}
          <span className="font-semibold text-ink">#{confirmedOrderId}</span>
          . Use this in the tracker to see your build.
        </p>
        <p className="mt-3 text-sm text-ink/55">
          Estimated delivery:
          {' '}
          {deliveryInfo?.estimate ?? '3-6 business days'}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:scale-[1.01]"
        >
          Drift back home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 max-w-3xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
          Checkout safely
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Clean checkout. No chaos. Mostly.
        </h1>
        <p className="mt-5 text-lg text-ink/70">
          Transparent pricing, Indian payment options, realistic shipping math, and just enough reassurance to keep the tab open.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.88fr]">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2.5rem] border border-ink p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} autoComplete="name" />
            <Field label="Mobile Number (+91)" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} type="tel" autoComplete="tel" inputMode="tel" />
            <Field label="Email" type="email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} autoComplete="email" />
            <Field label="Pincode" value={form.pincode} onChange={(value) => setForm((current) => ({ ...current, pincode: value }))} autoComplete="postal-code" inputMode="numeric" />
          </div>

          {deliveryInfo ? (
            <div className="rounded-[1.8rem] border border-ink bg-[#edf4ff] p-5">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">Delivery estimate</p>
                  <p className="mt-1 text-sm text-ink/65">
                    {deliveryInfo.estimate}
                    {' '}
                    for
                    {' '}
                    {deliveryInfo.region}
                    . Shipping fee:
                    {' '}
                    {formatPrice(deliveryInfo.shippingFee)}.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <Field
            label="Delivery Address"
            value={form.address}
            onChange={(value) => setForm((current) => ({ ...current, address: value }))}
            multiline
            autoComplete="street-address"
          />

          <Field label="State" value={form.state} onChange={(value) => setForm((current) => ({ ...current, state: value }))} autoComplete="address-level1" />

          <Field
            label="Order Notes"
            value={form.orderNotes}
            onChange={(value) => setForm((current) => ({ ...current, orderNotes: value }))}
            multiline
            optional
          />

          <div className="rounded-[2rem] border border-ink/10 bg-[#f4f1ea] p-5">
            <div className="flex items-center gap-3">
              <TicketPercent className="h-5 w-5" />
              <p className="font-medium">Coupon</p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
              <input
                value={form.coupon}
                onChange={(event) => setForm((current) => ({ ...current, coupon: event.target.value }))}
                placeholder="Try DESK10 or FIRSTDROP"
                className="w-full rounded-full border border-ink/15 bg-white px-4 py-3 outline-none transition focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setAppliedCoupon(applyCoupon(form.coupon, subtotal))}
                className="rounded-full border border-ink px-5 py-3 font-medium transition hover:border-accent hover:text-accent"
              >
                Apply
              </button>
            </div>
            {appliedCoupon.message ? (
              <p className={`mt-3 text-sm ${appliedCoupon.valid ? 'text-[#0d7a2c]' : 'text-[#a1421a]'}`}>
                {appliedCoupon.message}
              </p>
            ) : null}
          </div>

          <div>
            <p className="font-display text-2xl font-bold">Choose payment</p>
            <div className="mt-4 space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-start justify-between gap-4 rounded-[1.8rem] border p-4 transition ${
                    selectedPayment === method.id
                      ? 'border-accent bg-accent/5'
                      : 'border-ink/15 hover:border-ink'
                  }`}
                >
                  <div className="flex gap-3">
                    <input
                      type="radio"
                      className="mt-1"
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                    />
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-medium">{method.title}</p>
                        {method.recommended ? (
                          <span className="rounded-full bg-[#d6f7dd] px-3 py-1 text-xs font-semibold text-[#0d7a2c]">
                            Recommended
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-ink/60">{method.note}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-ink/10 bg-white/70 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5" />
              <p className="text-sm text-ink/65">
                This is still a mock checkout, but the structure is ready for real shipping calculators, payment gateway wiring, and coupon validation later.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 font-medium text-paper transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
            {isSubmitting ? 'Talking to fake Razorpay...' : 'Pay Now'}
          </button>
        </form>

        <aside className="h-fit rounded-[2.5rem] border border-ink bg-[#f4f1ea] p-6 md:p-8">
          <p className="font-display text-2xl font-bold">Order summary</p>
          <div className="mt-6 space-y-4">
            {items.length === 0 ? (
              <p className="rounded-[1.8rem] border border-dashed border-ink/20 bg-paper p-4 text-sm text-ink/60">
                Your cart is empty. Add something from the shop before trying to financially commit.
              </p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-ink/60">Qty {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 space-y-3 border-t border-ink/10 pt-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Shipping</span>
              <span>{formatPrice(shippingFee)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Payment fee</span>
              <span>{formatPrice(paymentMeta?.extra ?? 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink/60">Coupon</span>
              <span>- {formatPrice(discount)}</span>
            </div>
            <div className="flex items-center justify-between font-display text-2xl font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function Field(props) {
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
          rows={4}
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
