'use client';

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/page-header';
import { Leaf, Users, Hand, Heart, Mountain, Recycle } from 'lucide-react';

const PILLARS = [
  { icon: Recycle, title: 'Eliminating Single-Use Plastic', body: 'Replacing millions of plastic bags with durable, handmade cotton alternatives across the Himalayas.' },
  { icon: Hand, title: 'Jhola Abhiyaan', body: 'The cotton bag movement — a simple, powerful idea: carry change, not plastic.' },
  { icon: Users, title: 'Empowering Rural Women', body: 'Providing steady income, skills, and dignity to 340+ women across 48 villages.' },
  { icon: Leaf, title: 'Supporting Handloom', body: 'Reviving traditional weaving patterns and sustaining the artisans who keep them alive.' },
  { icon: Mountain, title: 'Environmental Awareness', body: 'Campaigns in schools, markets, and on trails — building a culture of care for the Himalayas.' },
  { icon: Heart, title: 'Volunteer Programs', body: 'A growing network of 1,200+ volunteers carrying the movement beyond Uttarakhand.' },
];

const TIMELINE = [
  { year: '2018', title: 'The First Stitch', body: 'Sunita Devi begins sewing cotton bags in Mukteshwar to replace plastic at the local market.' },
  { year: '2020', title: 'Jhola Abhiyaan Born', body: 'The movement formalizes. 12 villages join. The first 10,000 bags are distributed free.' },
  { year: '2022', title: 'Handloom Revival', body: 'Partnership with traditional weavers brings heritage textiles into every Jhola.' },
  { year: '2024', title: 'A Himalayan Network', body: '48 villages, 340 women, 1,200 volunteers. Over 2.4 million plastic bags replaced.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A movement born in"
        highlight="the mountains."
        description="Jhola Abhiyaan is a grassroots movement from Uttarakhand, India — weaving a plastic-free future through cotton, community, and conscience."
      />

      {/* Mission statement */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-copper">Our Mission</p>
            <h2 className="mt-6 font-display text-3xl font-light leading-relaxed text-sand md:text-4xl">
              To eliminate single-use plastic from the Himalayas by reviving the
              <span className="text-gradient-copper"> handmade cotton bag</span> —
              empowering the women who make them, the weavers who supply them, and the
              communities that carry them.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Six pillars */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group rounded-3xl glass p-8 transition-all duration-500 hover:bg-copper/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-copper/10 transition-transform duration-500 group-hover:scale-110">
                  <p.icon className="h-6 w-6 text-copper" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-sand">{p.title}</h3>
                <p className="mt-3 text-muted-foreground">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 text-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-copper">Our Journey</p>
            <h2 className="mt-4 font-display text-4xl font-light text-sand md:text-6xl">
              From one village
              <span className="text-gradient-copper"> to a Himalayan network.</span>
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
    </>
  );
}
