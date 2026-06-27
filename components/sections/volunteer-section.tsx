'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const TIMELINE = [
  { year: '2018', title: 'The First Stitch', body: 'A handful of women in a single village begin sewing cotton bags to replace plastic at the local market.' },
  { year: '2020', title: 'Jhola Abhiyaan Born', body: 'The movement formalizes. 12 villages join. The first 10,000 bags are distributed free to shopkeepers.' },
  { year: '2022', title: 'Handloom Revival', body: 'Partnership with traditional weavers brings heritage textiles into every Jhola. Income doubles for 80 families.' },
  { year: '2024', title: 'A Himalayan Network', body: '48 villages, 340 women, 1,200 volunteers. Over 2.4 million plastic bags replaced.' },
];

export function VolunteerSection() {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Full-width photography backdrop */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt="Volunteers in the Himalayas"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-copper">Become a Volunteer</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-sand md:text-5xl">
              The Himalayas
              <br />
              <span className="text-gradient-copper">need your hands.</span>
            </h2>
            <p className="mt-4 max-w-md text-base text-sand/70">
              Distribute bags. Document impact. Learn from the women who carry this movement.
              Come for a week, a month, or a season — leave with a story you will carry for life.
            </p>
            <Link
              href="/volunteer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-copper px-8 py-4 text-sm font-medium text-charcoal transition-all hover:bg-copper/80 hover:shadow-2xl hover:shadow-copper/30"
            >
              Become a Volunteer
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          {/* Right: Timeline */}
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-copper/40 via-copper/20 to-transparent" />
            <div className="space-y-8 pl-8">
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
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
