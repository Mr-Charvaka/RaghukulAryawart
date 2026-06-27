'use client';

import { motion } from 'framer-motion';

export function RaghukulHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/realistic_himalayan_valley.png"
          alt="Realistic Himalayan Valley"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-charcoal" />
        <div className="pointer-events-none absolute inset-0 grain" />

        {/* Glow effect behind text */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/raghukul-logo.png"
            alt="Raghukul Logo"
            className="h-32 w-auto object-contain opacity-90 drop-shadow-2xl"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-copper"
        >
          Welcome to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-light text-sand sm:text-7xl md:text-8xl"
        >
          Raghukul Aryawart
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto mt-8 max-w-4xl space-y-4 text-base leading-relaxed text-sand/80 md:text-lg"
        >
          <p>
            Raghukul Aryawart is a decade old NGO (Non-Government Organization) working for the various aspects of social life and wellbeing of society. It is being run by experienced as well as young enthusiasts<br></br> <br></br>It works on unique model of self-sustainability that we don’t take any kind of funding and sponsorship from outside.
          </p>

        </motion.div>
      </div>

      {/* Scroll indicator pointing to next section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-sand/50">Our Campaigns</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-12 w-px bg-gradient-to-b from-copper/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
