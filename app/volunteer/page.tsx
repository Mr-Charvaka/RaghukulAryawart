'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/page-header';
import { supabase } from '@/lib/supabase';
import { Send, Check } from 'lucide-react';

const TIMELINE = [
  { year: '2018', title: 'The First Stitch', body: 'A handful of women in a single village begin sewing cotton bags.' },
  { year: '2020', title: 'Jhola Abhiyaan Born', body: '12 villages join. The first 10,000 bags are distributed free.' },
  { year: '2022', title: 'Handloom Revival', body: 'Partnership with traditional weavers brings heritage textiles in.' },
  { year: '2024', title: 'A Himalayan Network', body: '48 villages, 340 women, 1,200 volunteers. 2.4M bags replaced.' },
];

const ROLES = [
  { title: 'Field Volunteer', duration: '1-4 weeks', body: 'Distribute bags, run awareness drives, and work alongside artisans in the villages.' },
  { title: 'Trek Trail Cleanup', duration: '3-7 days', body: 'Join plastic cleanup expeditions along popular Himalayan trekking routes.' },
  { title: 'Remote Support', duration: 'Flexible', body: 'Help with content, design, translation, or fundraising from wherever you are.' },
];

export default function VolunteerPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', availability: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { error } = await supabase.from('volunteer_signups').insert(form);
      if (error) throw error;
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', city: '', availability: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Volunteer"
        title="The Himalayas"
        highlight="need your hands."
        description="Distribute bags. Document impact. Learn from the women who carry this movement. Come for a week or a season — leave with a story."
      />

      {/* Roles */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {ROLES.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="rounded-3xl glass p-8 transition-all hover:bg-copper/5"
              >
                <h3 className="font-display text-2xl text-sand">{r.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-widest text-copper">{r.duration}</p>
                <p className="mt-4 text-muted-foreground">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 text-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-copper">The Journey</p>
            <h2 className="mt-4 font-display text-4xl font-light text-sand md:text-6xl">
              Six years of
              <span className="text-gradient-copper"> quiet revolution.</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-copper/40 via-copper/20 to-transparent" />
            <div className="space-y-12 pl-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full border-2 border-copper bg-charcoal" />
                  <p className="font-display text-2xl text-copper">{item.year}</p>
                  <h3 className="mt-1 font-display text-xl text-sand">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="rounded-3xl glass-strong p-8 md:p-12"
          >
            <h2 className="font-display text-3xl font-light text-sand md:text-4xl">
              Sign up to volunteer
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us a little about yourself and we will reach out with opportunities that fit.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
              </div>
              <Input label="Availability (e.g. 2 weeks in July)" value={form.availability} onChange={(v) => setForm({ ...form, availability: v })} />
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-border bg-charcoal/40 px-4 py-3 text-sand placeholder:text-muted-foreground focus:border-copper/50 focus:outline-none"
                  placeholder="Why do you want to join the movement?"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-copper py-4 text-sm font-medium text-charcoal transition-all hover:bg-copper/80 hover:shadow-lg hover:shadow-copper/30 disabled:opacity-50"
              >
                {status === 'sent' ? (
                  <><Check className="h-4 w-4" /> Application Received</>
                ) : status === 'sending' ? 'Sending...' : (
                  <>Submit Application <Send className="h-4 w-4" /></>
                )}
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
