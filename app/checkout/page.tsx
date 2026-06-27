'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { supabase } from '@/lib/supabase';
import { Check, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    payment: 'upi',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { error } = await supabase.from('orders').insert({
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        shipping_address: form.address,
        total_amount: cartTotal,
        payment_method: form.payment,
        items: items.map((i) => ({
          product_id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
      });
      if (error) throw error;
      setStatus('done');
      clearCart();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-forest/20"
        >
          <Check className="h-12 w-12 text-forest" />
        </motion.div>
        <h1 className="mt-8 font-display text-4xl font-light text-sand md:text-5xl">
          Order confirmed
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Thank you for carrying change. Your order supports an artisan and replaces plastic
          in the Himalayas. A confirmation has been sent to your email.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-copper px-8 py-4 text-sm font-medium text-charcoal transition-all hover:bg-copper/80"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-copper/10">
          <ShoppingBag className="h-8 w-8 text-copper/50" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-sand">Your cart is empty</h1>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-copper px-6 py-3 text-sm text-charcoal"
        >
          Browse the Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pt-32 pb-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 font-display text-4xl font-light text-sand md:text-5xl">Checkout</h1>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="rounded-3xl glass-strong p-8">
              <h2 className="mb-6 font-display text-2xl text-sand">Contact & Shipping</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
                <Input label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
              </div>
            </div>

            <div className="rounded-3xl glass-strong p-8">
              <h2 className="mb-6 font-display text-2xl text-sand">Payment Method</h2>
              <div className="flex gap-3">
                {[
                  { id: 'upi', label: 'UPI' },
                  { id: 'card', label: 'Card' },
                  { id: 'netbanking', label: 'Net Banking' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setForm({ ...form, payment: m.id })}
                    className={`flex-1 rounded-2xl border py-3 text-sm transition-all ${
                      form.payment === m.id
                        ? 'border-copper bg-copper/10 text-copper'
                        : 'border-border text-muted-foreground hover:text-sand'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full bg-copper py-4 text-sm font-medium text-charcoal transition-all hover:bg-copper/80 hover:shadow-lg hover:shadow-copper/30 disabled:opacity-50"
            >
              {status === 'sending' ? 'Processing...' : `Place Order — ₹${cartTotal.toLocaleString('en-IN')}`}
            </button>
            {status === 'error' && (
              <p className="text-center text-sm text-destructive">Something went wrong. Please try again.</p>
            )}
          </motion.form>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-3xl glass-strong p-8 lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="mb-6 font-display text-2xl text-sand">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image_url || ''}
                    alt={item.product.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm text-sand">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm text-copper">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-sand">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-forest">Free</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4">
                <span className="font-display text-lg text-sand">Total</span>
                <span className="font-display text-lg text-copper">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-border bg-charcoal/40 px-4 py-3 text-sand placeholder:text-muted-foreground focus:border-copper/50 focus:outline-none"
      />
    </div>
  );
}
