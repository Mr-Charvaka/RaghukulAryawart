'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/page-header';
import { supabase } from '@/lib/supabase';
import { Shield, Heart, Leaf, Users, Check } from 'lucide-react';

const AMOUNTS = [500, 1000, 2500, 5000, 10000];
const METHODS = [
  { id: 'upi', label: 'UPI' },
  { id: 'card', label: 'Cards' },
  { id: 'netbanking', label: 'Net Banking' },
];
const TRUST = [
  { icon: Shield, label: '80G Tax Exempt' },
  { icon: Heart, label: '100% to the field' },
  { icon: Leaf, label: 'Transparent impact' },
  { icon: Users, label: '12,000+ donors' },
];

export default function DonatePage() {
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState('upi');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const finalAmount = custom ? parseInt(custom) || 0 : amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { error } = await supabase.from('donations').insert({
        donor_name: name,
        email,
        amount: finalAmount,
        payment_method: method,
      });
      if (error) throw error;
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Fuel the movement."
        highlight="Carry it forward."
        description="Every rupee buys cotton, pays an artisan, and replaces plastic in a Himalayan village. No middlemen. Just impact."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1 }}
            className="overflow-hidden rounded-3xl glass-strong"
          >
            <div className="grid lg:grid-cols-2">
              {/* Amount + method */}
              <div className="p-10">
                <h2 className="mb-6 font-display text-2xl text-sand">Choose your contribution</h2>
                <div className="grid grid-cols-3 gap-3">
                  {AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => { setAmount(amt); setCustom(''); }}
                      className={`relative rounded-2xl border py-5 text-center transition-all ${
                        amount === amt && !custom
                          ? 'border-copper bg-copper/10 text-copper'
                          : 'border-border text-muted-foreground hover:border-copper/40 hover:text-sand'
                      }`}
                    >
                      <span className="font-display text-xl">₹{amt.toLocaleString('en-IN')}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Or enter custom amount
                  </label>
                  <div className="mt-2 flex items-center rounded-2xl border border-border bg-charcoal/40 px-4 focus-within:border-copper/50">
                    <span className="text-copper">₹</span>
                    <input
                      type="number"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      placeholder="0"
                      className="w-full bg-transparent px-2 py-4 text-sand focus:outline-none"
                    />
                  </div>
                </div>

                <h3 className="mb-4 mt-8 font-display text-2xl text-sand">Payment method</h3>
                <div className="flex gap-3">
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`flex-1 rounded-2xl border py-3 text-sm transition-all ${
                        method === m.id
                          ? 'border-copper bg-copper/10 text-copper'
                          : 'border-border text-muted-foreground hover:text-sand'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary + donor info */}
              <div className="flex flex-col justify-between border-t border-border bg-charcoal/30 p-10 lg:border-l lg:border-t-0">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">You are donating</p>
                  <p className="mt-2 font-display text-6xl font-light text-gradient-copper">
                    ₹{finalAmount.toLocaleString('en-IN')}
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Cotton bags produced</span>
                      <span className="text-sand">{Math.round(finalAmount / 45)} bags</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plastic bags replaced</span>
                      <span className="text-sand">{Math.round(finalAmount / 9)} bags</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Artisan days supported</span>
                      <span className="text-sand">{Math.round(finalAmount / 250)} days</span>
                    </div>
                  </div>

                  {status !== 'sent' && (
                    <div className="mt-6 space-y-3">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-border bg-charcoal/40 px-4 py-3 text-sand placeholder:text-muted-foreground focus:border-copper/50 focus:outline-none"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email for receipt"
                        className="w-full rounded-2xl border border-border bg-charcoal/40 px-4 py-3 text-sand placeholder:text-muted-foreground focus:border-copper/50 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {status === 'sent' ? (
                  <div className="mt-8 flex items-center justify-center gap-2 rounded-full bg-forest/20 py-4 text-forest">
                    <Check className="h-5 w-5" /> Thank you for your donation
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    className="mt-8 w-full rounded-full bg-copper py-4 text-sm font-medium text-charcoal transition-all hover:bg-copper/80 hover:shadow-2xl hover:shadow-copper/30 disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Processing...' : `Donate ₹${finalAmount.toLocaleString('en-IN')} →`}
                  </button>
                )}
                {status === 'error' && (
                  <p className="mt-3 text-center text-sm text-destructive">Something went wrong. Please try again.</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Trust */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {TRUST.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-center gap-3 rounded-2xl glass p-4"
              >
                <t.icon className="h-5 w-5 shrink-0 text-copper" />
                <span className="text-sm text-sand">{t.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
