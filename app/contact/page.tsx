'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { error } = await supabase.from('volunteer_signups').insert({
        name: form.name,
        email: form.email,
        message: `${form.subject}: ${form.message}`,
      });
      if (error) throw error;
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach the"
        highlight="movement."
        description="Questions, partnerships, press, or just a hello — we read every message from the mountains."
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-display text-3xl font-light text-sand md:text-4xl">
              Get in touch
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Whether you want to volunteer, partner, stock our bags, or simply learn more
              about the movement — we would love to hear from you.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: MapPin, label: 'Visit', value: 'Uttarakhand, Himalayas, India' },
                { icon: Mail, label: 'Email', value: 'hello@jholaabhiyaan.org' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-copper/10">
                    <item.icon className="h-5 w-5 text-copper" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sand">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="rounded-3xl glass-strong p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
              </div>
              <Field
                label="Subject"
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
                required
              />
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="mt-2 w-full rounded-2xl border border-border bg-charcoal/40 px-4 py-3 text-sand placeholder:text-muted-foreground focus:border-copper/50 focus:outline-none"
                  placeholder="Tell us how you would like to be part of the movement..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-copper py-4 text-sm font-medium text-charcoal transition-all hover:bg-copper/80 hover:shadow-lg hover:shadow-copper/30 disabled:opacity-50"
              >
                {status === 'sent' ? 'Message Sent' : status === 'sending' ? 'Sending...' : 'Send Message'}
                {status !== 'sending' && status !== 'sent' && <Send className="h-4 w-4" />}
              </button>
              {status === 'sent' && (
                <p className="text-center text-sm text-forest">Thank you. We will be in touch soon.</p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-destructive">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({
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
      <label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
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
