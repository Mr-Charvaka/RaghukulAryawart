'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CHAPTERS = [
  {
    num: '01',
    title: 'Women Stitching',
    subtitle: 'The hands behind the movement',
    body: 'In village courtyards across Uttarakhand, women gather with needle and thread — turning raw cotton into durable Jholas. Each stitch is income, independence, and dignity.',
    img: '/images/chapters/Women%20Stitching.png',
  },
  {
    num: '02',
    title: 'Handloom Weaving',
    subtitle: 'Threads of heritage',
    body: 'On wooden looms older than memory, weavers interlace warp and weft in rhythms passed through generations. The loom does not rush. Neither do we.',
    img: '/images/chapters/Handloom%20weaving.png',
  },
  {
    num: '03',
    title: 'Village Life',
    subtitle: 'Where the movement breathes',
    body: 'The Himalayan village is not a backdrop — it is the protagonist. Terraced fields, shared meals, and collective labor form the soil from which the Jhola grows.',
    img: '/images/chapters/village.jpeg',
  },
  {
    num: '04',
    title: 'Environmental Campaigns',
    subtitle: 'Plastic-free by conviction',
    body: 'From school yards to market squares, volunteers map plastic waste, run awareness drives, and replace single-use bags with cotton — one household at a time.',
    img: '/images/chapters/Environment.jpeg',
  },
  {
    num: '05',
    title: 'Volunteer Activities',
    subtitle: 'Many hands, one Himalaya',
    body: 'Students, trekkers, and travelers arrive to carry the movement forward — distributing bags, documenting impact, and learning that change is carried, not delivered.',
    img: '/images/chapters/Volunteer.jpeg',
  },
];

export function StoryChapters() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-copper">The Story</p>
          <h2 className="mt-4 font-display text-4xl font-light text-sand md:text-5xl">
            Five chapters.
            <br />
            <span className="text-gradient-sand">One movement.</span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {CHAPTERS.map((ch, i) => (
            <Chapter key={ch.num} chapter={ch} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  index,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const reverse = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
        reverse ? 'lg:[direction:rtl]' : ''
      }`}
    >
      {/* Image with mask reveal */}
      <motion.div
        style={{ y }}
        className="relative aspect-[4/5] overflow-hidden rounded-3xl [direction:ltr]"
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale: imgScale }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chapter.img}
            alt={chapter.title}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 font-display text-6xl font-light text-sand/30">
          {chapter.num}
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="[direction:ltr]"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-copper">{chapter.subtitle}</p>
        <h3 className="mt-4 font-display text-3xl font-light text-sand md:text-4xl">
          {chapter.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          {chapter.body}
        </p>
        <div className="mt-8 h-px w-24 bg-gradient-to-r from-copper to-transparent" />
      </motion.div>
    </div>
  );
}
