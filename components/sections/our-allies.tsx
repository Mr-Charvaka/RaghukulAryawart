'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ALLIES = [
  {
    isCover: true,
    name: 'Raghukul Aryawart',
    role: '',
    quote: '',
    img: '/images/raghukul-logo.png',
  },
  {
    name: 'Mr. Ramesh Menon',
    role: 'Entrepreneur',
    quote: "The concept of using cloth Jholas is so very Indian and logical. Its reusable, it's practical, it's attractive. Raghukul Aryawart seems to have hit the right button in promoting the Cloth Bag with its committed dedicated group of young volunteers",
    img: '/images/ramesh mennon.png',
  },
  {
    name: 'Mrs. Shanker',
    role: 'Entrepreneur (Education & Social Initiatives)',
    quote: "She is Administrator and Coordinator of Surya Academy Senior Secondary Public School, Sultanpur (UP), committed for environment protection she is highly determine to connect Jhola-Abhiyan in her school, parents and locality.",
    img: '/images/Mrs. Shanker.png',
  },
  {
    name: 'Mrinalini Gupta',
    role: 'Entrepreneur (Social & Environmental Initiatives)',
    quote: "Lady with full on Jhose and Junoon, she is executive member and heading many groups, societies and committees that work for many social causes. She has not only approached us first also gave so many ideas to make this project…",
    img: '/images/Mrilani Gupta.png',
  },
  {
    name: 'Rachna Tiwary',
    role: 'Educationist & Environmental Advocate',
    quote: "An educationist, trainer, Writer, Editor, Gold medalist, Member of Appellate Authority, DDA, Joint secretary and executive member of Lady Irwin College Alumni Association, executive member of Efforts Group…",
    img: '/images/rachna tiwari.png',
  },
  {
    name: 'Pankaj Aggarwal',
    role: 'Chartered Accountant & Social Activist',
    quote: "Renowned CA by profession, have been associated with many environmental and social causes; he ordered 100 Jholas from us and promised us to promote it as much as he can…",
    img: '/images/pankaj aggarwal.png',
  },
];

export function OurAllies() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < ALLIES.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // Auto-flip every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev === ALLIES.length - 1 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-charcoal overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-copper/10 via-charcoal to-charcoal" />
      <div className="pointer-events-none absolute inset-0 grain opacity-50" />

      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-copper">Together</p>
          <h2 className="mt-4 font-display text-4xl font-light text-sand md:text-5xl">
            Our Allies.
          </h2>
        </div>

        {/* 3D Book Container */}
        <div 
          className={`relative w-full max-w-4xl mx-auto h-[700px] md:h-[500px] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${currentPage === 0 ? 'md:-translate-x-1/4' : 'translate-x-0'}`}
          style={{ perspective: '2500px' }}
        >
          <div className="w-full h-full relative flex justify-center" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* Static Left Page (for Desktop spread) */}
            <div 
              className={`hidden md:block absolute w-1/2 h-full left-0 bg-[#ebe7df] rounded-l-3xl shadow-xl overflow-hidden border-r border-black/5 p-12 transition-opacity duration-500 ${currentPage === 0 ? 'opacity-0' : 'opacity-100'}`}
              style={{ boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.05)' }}
            >
               <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <Image src="/images/raghukul-logo.png" alt="Raghukul Logo" width={150} height={150} className="mb-8" />
                  <h3 className="font-display text-2xl text-charcoal">The Movement</h3>
                  <p className="mt-4 text-charcoal/60 max-w-sm">
                    Voices and forces combining to protect the Himalayas.
                  </p>
               </div>
            </div>

            {/* The Flipping Pages */}
            <AnimatePresence mode="popLayout">
              {ALLIES.map((ally, index) => {
                const isActive = index === currentPage;
                const isPast = index < currentPage;
                
                return (
                  <motion.div
                    key={ally.name}
                    initial={false}
                    animate={{
                      rotateY: isPast ? -180 : 0,
                      zIndex: isActive ? 10 : ALLIES.length - index,
                      opacity: isActive || isPast ? 1 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 45,
                      damping: 12,
                    }}
                    className="absolute w-full md:w-1/2 h-full left-0 md:left-1/2 origin-left rounded-3xl md:rounded-l-none md:rounded-r-3xl overflow-hidden shadow-2xl"
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.1), 10px 10px 40px rgba(0,0,0,0.3)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Front of the page (Ally Info or Cover) */}
                    <div 
                      className="absolute inset-0 flex flex-col h-full bg-sand text-charcoal" 
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        backgroundColor: '#f5f3ed'
                      }}
                    >
                      {ally.isCover ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full border-8 border-copper/10 m-4 rounded-xl">
                          <Image src={ally.img} alt="Raghukul Aryawart Logo" width={250} height={250} className="mb-12" />
                          <h1 className="font-display text-4xl text-copper">Our Allies</h1>
                          <p className="uppercase tracking-[0.3em] text-charcoal/40 text-xs mt-6">Open to read</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 md:p-12">
                            <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden shadow-xl mb-6 border-4 border-copper/20 shrink-0">
                              <Image src={ally.img} alt={ally.name} fill className="object-cover" />
                            </div>
                            <h3 className="font-display text-2xl font-medium">{ally.name}</h3>
                            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-copper/80 mt-2 mb-4 md:mb-6 px-4">
                              {ally.role}
                            </p>
                            <p className="text-sm md:text-base italic leading-relaxed text-charcoal/70 relative px-6 md:px-8">
                              <span className="text-4xl text-copper/20 absolute -top-2 left-0 md:-left-2">"</span>
                              {ally.quote.replace(/"/g, '')}
                              <span className="text-4xl text-copper/20 absolute -bottom-6 right-0 md:-right-2">"</span>
                            </p>
                          </div>
                          <div className="text-center text-xs md:text-sm font-medium text-charcoal/40 pb-4 border-t border-charcoal/10 shrink-0">
                            Page {String(index).padStart(2, '0')} of {String(ALLIES.length - 1).padStart(2, '0')}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Back of the page (When flipped) */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center p-8"
                      style={{
                        backgroundColor: '#ebe7df',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.05)'
                      }}
                    >
                      <div className="opacity-10 pointer-events-none">
                        <Image src="/images/raghukul-logo.png" alt="Logo watermark" width={150} height={150} className="grayscale" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 mt-16 z-20 relative">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className="w-14 h-14 rounded-full border-2 border-copper/30 flex items-center justify-center text-sand hover:bg-copper hover:text-charcoal hover:border-copper transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-sand disabled:hover:border-copper/30 shadow-lg"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sand/50 text-xs font-semibold tracking-[0.3em] uppercase">
            Turn Page
          </span>
          <button 
            onClick={nextPage}
            disabled={currentPage === ALLIES.length - 1}
            className="w-14 h-14 rounded-full border-2 border-copper/30 flex items-center justify-center text-sand hover:bg-copper hover:text-charcoal hover:border-copper transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-sand disabled:hover:border-copper/30 shadow-lg"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}
