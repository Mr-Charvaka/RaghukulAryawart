'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const DRONE_IMGS = [
  'https://images.pexels.com/photos/12716153/pexels-photo-12716153.jpeg?auto=compress&cs=tinysrgb&w=2400',
  'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=2400',
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=2400',
];

export function DroneSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Crossfade between drone frames as user scrolls
  const img1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const img2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const img3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const yShift = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  // Message 1: Carry Change (0% -> 20%)
  const msg1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const msg1PointerEvents = useTransform(scrollYProgress, [0, 0.19, 0.2], ['auto', 'auto', 'none']);

  // Message 2: Nature Remembers (40% -> 70%)
  const msg2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);

  // Message 3: The Future (75% -> 100%)
  const msg3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.9, 1], [0, 1, 1, 0]);

  const [showMsg1, setShowMsg1] = useState(true);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showMsg3, setShowMsg3] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowMsg1(latest < 0.25);
    setShowMsg2(latest > 0.35 && latest < 0.8);
    setShowMsg3(latest > 0.7 && latest < 0.95);
  });

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">
        {/* Drone frames crossfading */}
        {[DRONE_IMGS[0], DRONE_IMGS[1], DRONE_IMGS[2]].map((src, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              opacity:
                i === 0 ? img1Opacity : i === 1 ? img2Opacity : img3Opacity,
              scale,
              y: yShift,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Drone flight over Uttarakhand frame ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal" />
        <div className="absolute inset-0 bg-charcoal/20" />
        <div className="pointer-events-none absolute inset-0 grain" />

        {/* Volumetric light rays for first message */}
        {showMsg1 && (
          <motion.div 
            style={{ opacity: msg1Opacity }}
            className="pointer-events-none absolute left-1/4 top-0 h-full w-1/3 -rotate-12 bg-gradient-to-b from-sand/10 via-sand/5 to-transparent blur-2xl" 
          />
        )}

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_200px_80px_rgba(0,0,0,0.6)]" />

        {/* Scroll progress indicator (left edge) */}
        <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
          <span className="text-xs uppercase tracking-[0.3em] text-sand/40 [writing-mode:vertical-rl]">
            RA Vision
          </span>
          <div className="h-32 w-px bg-foreground/10">
            <motion.div
              className="w-full bg-copper"
              style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
        </div>

        {/* Message 1: Carry Change. Not Plastic. */}
        {showMsg1 && (
          <motion.div
            style={{ opacity: msg1Opacity, pointerEvents: msg1PointerEvents as any }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-6 text-xs uppercase tracking-[0.4em] text-sand/70"
            >
              A Himalayan Movement
            </motion.p>

            <h1 className="font-display text-6xl font-light leading-[0.95] tracking-tightest text-sand sm:text-7xl md:text-8xl lg:text-9xl">
              {['Carry', 'Change.'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gradient-copper"
              >
                Not Plastic.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-8 max-w-xl text-base text-sand/70 md:text-lg"
            >
              From the peaks of Uttarakhand, a movement of cotton, conscience, and community —
              stitching a future the Himalayas can carry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row pointer-events-auto"
            >
              <Link
                href="/volunteer"
                className="group relative overflow-hidden rounded-full bg-copper px-8 py-4 text-sm font-medium text-charcoal transition-all duration-500 hover:shadow-2xl hover:shadow-copper/40"
              >
                <span className="relative z-10 block transition-opacity duration-500 group-hover:opacity-0">Join the Movement</span>
                <span className="absolute inset-0 -translate-x-full bg-sand transition-transform duration-500 group-hover:translate-x-0" />
                <span className="absolute inset-0 z-10 flex items-center justify-center text-charcoal opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Join the Movement →
                </span>
              </Link>
              <Link
                href="/shop"
                className="rounded-full glass px-8 py-4 text-sm font-medium text-sand transition-all duration-500 hover:bg-foreground/10"
              >
                Shop Handmade
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* Message 2: Nature Remembers */}
        {showMsg2 && (
          <motion.div
            style={{ opacity: msg2Opacity }}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
          >
            <div className="text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-copper/80">
                The trail remembers
              </p>
              <h2 className="font-display text-4xl font-light leading-tight text-sand md:text-6xl lg:text-7xl">
                Nature remembers
                <br />
                <span className="text-gradient-copper">everything we leave behind.</span>
              </h2>
            </div>
          </motion.div>
        )}

        {/* Message 3: The Future */}
        {showMsg3 && (
          <motion.div
            style={{ opacity: msg3Opacity }}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
          >
            <div className="text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-copper/80">
                A Shared Future
              </p>
              <h2 className="font-display text-4xl font-light leading-tight text-sand md:text-6xl lg:text-7xl">
                Protect the wild.
                <br />
                <span className="text-gradient-copper">Leave only footprints.</span>
              </h2>
            </div>
          </motion.div>
        )}

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
      </div>
    </section>
  );
}
