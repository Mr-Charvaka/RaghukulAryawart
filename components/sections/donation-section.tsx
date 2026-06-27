'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Leaf, Users } from 'lucide-react';

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

export function DonationSection() {
  const [amount, setAmount] = useState<number>(1000);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState('upi');

  const finalAmount = custom ? parseInt(custom) || 0 : amount;

  return (
    <section className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-copper/5 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-copper">The Donation</p>
          <h2 className="mt-4 font-display text-4xl font-light text-sand md:text-5xl">
            Fuel the movement.
            <br />
            <span className="text-gradient-copper">Carry it forward.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Every rupee buys cotton, pays an artisan, and replaces plastic in a Himalayan village.
            No middlemen. No overhead. Just impact.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 overflow-hidden rounded-3xl glass-strong"
        >
          <div className="grid lg:grid-cols-2">
            {/* Amount selection */}
            <div className="p-10">
              <h3 className="mb-6 font-display text-2xl text-sand">Choose your contribution</h3>
              <div className="grid grid-cols-3 gap-3">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt);
                      setCustom('');
                    }}
                    className={`relative overflow-hidden rounded-2xl border py-5 text-center transition-all duration-300 ${
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

              {/* Payment method */}
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

            {/* Summary */}
            <div className="flex flex-col justify-between border-t border-border bg-charcoal/30 p-10 lg:border-l lg:border-t-0">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  You are donating
                </p>
                <p className="mt-2 font-display text-5xl font-light text-gradient-copper">
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
              </div>

              <button className="group mt-8 w-full overflow-hidden rounded-full bg-copper py-4 text-sm font-medium text-charcoal transition-all hover:shadow-2xl hover:shadow-copper/30">
                <span className="relative z-10">Donate ₹{finalAmount.toLocaleString('en-IN')} →</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
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
  );
}
