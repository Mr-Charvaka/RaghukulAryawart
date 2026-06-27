'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { Recycle, Hand, Users, Leaf, ArrowRight } from 'lucide-react';

const CAMPAIGNS = [
  {
    icon: Recycle,
    title: 'Plastic-Free Himalayas',
    status: 'Ongoing',
    body: 'A village-by-village campaign to replace single-use plastic bags with handmade cotton Jholas. Over 2.4 million bags replaced so far.',
    img: 'https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=1800',
    stats: [{ label: 'Bags replaced', value: '2.4M+' }, { label: 'Villages', value: '48' }],
  },
  {
    icon: Hand,
    title: 'Jhola Abhiyaan',
    status: 'Ongoing',
    body: 'The flagship cotton bag movement — training women to stitch, distributing bags free to shopkeepers, and building a sustainable alternative to plastic.',
    img: 'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1800',
    stats: [{ label: 'Women trained', value: '340' }, { label: 'Bags distributed', value: '500K+' }],
  },
  {
    icon: Users,
    title: 'Women Empowerment Program',
    status: 'Ongoing',
    body: 'Skills training, steady income, and collective ownership for rural women across Uttarakhand. Each artisan earns independently and trains the next.',
    img: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=1800',
    stats: [{ label: 'Women empowered', value: '340' }, { label: 'Collectives', value: '12' }],
  },
  {
    icon: Leaf,
    title: 'Handloom Revival',
    status: 'Ongoing',
    body: 'Partnering with master weavers to recover nearly-lost patterns and bring heritage textiles into every product. Income for weavers, heritage for all.',
    img: 'https://images.pexels.com/photos/704971/pexels-photo-704971.jpeg?auto=compress&cs=tinysrgb&w=1800',
    stats: [{ label: 'Patterns revived', value: '3' }, { label: 'Weavers supported', value: '25' }],
  },
];

export default function CampaignsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Campaigns"
        title="Four campaigns."
        highlight="One Himalaya."
        description="Each campaign addresses a thread in the fabric of the Himalayan ecosystem — plastic, livelihood, heritage, and environment."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-32">
          {CAMPAIGNS.map((c, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={c.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? 'lg:[direction:rtl]' : ''
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[4/3] overflow-hidden rounded-3xl [direction:ltr]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full glass-strong px-4 py-1.5 text-xs text-sand">
                    {c.status}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reverse ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="[direction:ltr]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/10">
                    <c.icon className="h-5 w-5 text-copper" />
                  </div>
                  <h2 className="mt-6 font-display text-4xl font-light text-sand md:text-5xl">
                    {c.title}
                  </h2>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                  <div className="mt-8 flex gap-12">
                    {c.stats.map((s) => (
                      <div key={s.label}>
                        <p className="font-display text-3xl text-copper">{s.value}</p>
                        <p className="text-sm text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/volunteer"
                    className="group mt-8 inline-flex items-center gap-2 text-sm text-copper transition-colors hover:text-sand"
                  >
                    Get involved
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
