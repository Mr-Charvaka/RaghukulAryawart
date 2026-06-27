'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    let current = 0;
    const target = 100;
    const start = performance.now();
    const duration = 2200;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      current = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(current * target));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/5 blur-[140px]" />

          <div className="relative flex flex-col items-center">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img 
                src="/images/raghukul-logo.png" 
                alt="Raghukul Logo" 
                className="h-24 w-auto object-contain opacity-90 drop-shadow-xl" 
              />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 font-display text-2xl font-light tracking-wide text-sand"
            >
              Jhola Abhiyaan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              Carry Change, Not Plastic
            </motion.p>

            {/* Progress bar */}
            <div className="mt-10 h-px w-56 overflow-hidden bg-foreground/10">
              <motion.div
                className="h-full bg-gradient-to-r from-copper/40 to-copper"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mt-3 font-body text-xs tabular-nums text-muted-foreground">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
