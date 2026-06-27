'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}

export function PageHeader({
  eyebrow,
  title,
  highlight,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 pt-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/5 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-xs uppercase tracking-[0.4em] text-copper"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display text-5xl font-light leading-[0.95] tracking-tightest text-sand sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-gradient-copper">{highlight}</span>
            </>
          )}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
