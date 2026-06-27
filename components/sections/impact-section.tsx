'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 2400000, suffix: '+', label: 'Plastic Bags Reduced', sub: 'replaced by cotton' },
  { value: 340, suffix: '', label: 'Women Empowered', sub: 'with steady income' },
  { value: 48, suffix: '', label: 'Villages Reached', sub: 'across Uttarakhand' },
  { value: 1200, suffix: '+', label: 'Volunteers', sub: 'carrying the movement' },
  { value: 18500, suffix: '+', label: 'Products Sold', sub: 'each one handmade' },
];

function Counter({
  value,
  suffix,
  duration = 2000,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = display >= 1000 ? display.toLocaleString('en-IN') : display;

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Ambient background animation */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-forest/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-copper/8 blur-[120px]" />
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-sand/20"
            style={{
              left: `${(i * 67) % 100}%`,
              top: `${(i * 41) % 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 6 + (i % 4), delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-copper">The Impact</p>
          <h2 className="mt-4 font-display text-4xl font-light text-sand md:text-5xl">
            Measured in
            <br />
            <span className="text-gradient-copper">mountains moved.</span>
          </h2>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-3xl glass sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative p-8 text-center transition-colors hover:bg-copper/5"
            >
              <div className="font-display text-3xl font-light text-copper md:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-sm font-medium text-sand">{stat.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
              <div className="mx-auto mt-4 h-px w-0 bg-copper transition-all duration-500 group-hover:w-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
