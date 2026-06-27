'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Shop', href: '/shop' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Donate', href: '/donate' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 translate-y-0 opacity-100"
      >
        <nav
          className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full glass-strong px-6 py-3 shadow-2xl shadow-black/40 transition-all duration-500"
        >
          <Link href="/" className="group flex items-center gap-2.5">
            <img 
              src="/images/raghukul-logo.png" 
              alt="Raghukul Aryawart" 
              className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-3.5 py-2 text-sm font-body text-muted-foreground transition-colors hover:text-sand"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-copper transition-all duration-300 group-hover:w-1/2" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full glass transition-all hover:bg-foreground/10"
            >
              <ShoppingBag className="h-4 w-4 text-sand" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-copper text-[10px] font-medium text-charcoal">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              href="/donate"
              className="hidden rounded-full bg-copper px-5 py-2 text-sm font-medium text-charcoal transition-all duration-300 hover:bg-copper/80 hover:shadow-lg hover:shadow-copper/30 sm:block"
            >
              Donate
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full glass lg:hidden"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    'h-px w-5 bg-sand transition-all duration-300',
                    menuOpen && 'translate-y-[7px] rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'h-px w-5 bg-sand transition-all duration-300',
                    menuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'h-px w-5 bg-sand transition-all duration-300',
                    menuOpen && '-translate-y-[7px] -rotate-45'
                  )}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 transition-all duration-500 lg:hidden',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div
          className="absolute inset-0 bg-charcoal/80 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-72 flex-col gap-2 bg-charcoal-soft/95 p-8 pt-24 transition-transform duration-500',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl text-sand transition-colors hover:text-copper"
              style={{
                transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
