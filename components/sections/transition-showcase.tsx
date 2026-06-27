'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export function TransitionShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Cloud → cotton fiber morph text
  const cloudOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 0.8, 0]);
  const fiberOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.6], [0, 1, 0.6]);
  
  const cardOpacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
  const cardY = useTransform(scrollYProgress, [0.7, 0.8], [40, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-30%']);

  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: photoScroll } = useScroll({
    target: photoRef,
    offset: ['start start', 'end end'],
  });

  const f1Op = useTransform(photoScroll, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const f2Op = useTransform(photoScroll, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const f3Op = useTransform(photoScroll, [0.65, 0.75, 0.9, 1], [0, 1, 1, 0]);

  return (
    <>
      <section ref={ref} className="relative min-h-[250vh]">
      {/* Transition text layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">
        {/* Clouds */}
        <motion.div
          style={{ opacity: cloudOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute left-1/4 top-1/3 h-64 w-96 rounded-full bg-sand/10 blur-[80px]" />
          <div className="absolute right-1/4 top-1/2 h-72 w-80 rounded-full bg-sand/8 blur-[100px]" />
          <div className="absolute left-1/2 top-1/4 h-56 w-72 rounded-full bg-sand/5 blur-[90px]" />
        </motion.div>

        {/* Cotton fibers */}
        <motion.div
          style={{ opacity: fiberOpacity }}
          className="absolute inset-0"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-16 bg-sand/30"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                transform: `rotate(${(i * 23) % 180}deg)`,
              }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 3, delay: i * 0.05, repeat: Infinity }}
            />
          ))}
        </motion.div>

        {/* Transition copy */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
        >
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], [0, 1, 1, 0]) }}
            className="absolute font-display text-3xl font-light text-sand/80 md:text-5xl"
          >
            Clouds become fibers.
          </motion.p>
          <motion.p
            style={{ opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]) }}
            className="absolute font-display text-3xl font-light text-sand/80 md:text-5xl"
          >
            Fibers weave together.
          </motion.p>
        </motion.div>



        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/60" />

        {/* Product details card */}
        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none"
        >
          <div className="pointer-events-auto max-w-2xl w-full rounded-3xl glass-strong p-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-copper">The Jhola</p>
            <h3 className="mt-4 font-display text-4xl font-light text-sand md:text-5xl">
              Handwoven. Hand-stitched.
              <br />
              <span className="text-gradient-copper">Handed with hope.</span>
            </h3>
            <p className="mt-6 text-muted-foreground">
              Each cotton Jhola begins as a cloud of raw fiber — carded, spun, and woven on
              traditional looms by the women of Uttarakhand. No plastic. No shortcuts. Just
              hands, heritage, and a future worth carrying.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <div>
                <p className="font-display text-3xl text-copper">100%</p>
                <p className="text-muted-foreground">Cotton</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-display text-3xl text-copper">0</p>
                <p className="text-muted-foreground">Plastic</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-display text-3xl text-copper">14</p>
                <p className="text-muted-foreground">Artisans per bag</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>

      {/* Photos Section */}
      <section ref={photoRef} className="relative min-h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">
          
          <div className="absolute top-20 md:top-24 left-0 right-0 z-50 text-center pointer-events-none">
            <h2 className="font-display text-4xl font-light text-gradient-copper md:text-6xl pb-2 md:pb-4">
              A Jhola is born.
            </h2>
          </div>

          {/* Frame 1: Image S1 Left, Quote Right */}
          <motion.div style={{ opacity: f1Op }} className="absolute inset-x-0 bottom-0 top-32 md:top-40 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-24">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/S1.jpeg" alt="Jhola Artisan" fill className="object-cover" />
            </div>
            <div className="max-w-md text-center md:text-left">
              <p className="font-display text-3xl font-light text-sand md:text-5xl leading-tight">
                "Woven with purpose."
              </p>
            </div>
          </motion.div>

          {/* Frame 2: Quote Left, Image S3 Right */}
          <motion.div style={{ opacity: f2Op }} className="absolute inset-x-0 bottom-0 top-32 md:top-40 flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-24">
            <div className="max-w-md text-center md:text-right">
              <p className="font-display text-3xl font-light text-sand md:text-5xl leading-tight">
                "A voice for the mountains."
              </p>
            </div>
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/S3.jpeg" alt="Jhola Community" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Frame 3: Image S2 Left, Quote Right */}
          <motion.div style={{ opacity: f3Op }} className="absolute inset-x-0 bottom-0 top-32 md:top-40 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 md:px-24">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/S2.jpeg" alt="Jhola Heritage" fill className="object-cover" />
            </div>
            <div className="max-w-md text-center md:text-left">
              <p className="font-display text-3xl font-light text-sand md:text-5xl leading-tight">
                "Carrying change, one Jhola at a time."
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
