'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Shop Handmade', href: '/shop' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
];

const SOCIAL = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-border bg-charcoal">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-copper/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* Newsletter */}
        <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-4xl font-light text-sand md:text-5xl">
              Join the movement.
            </h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              Stories from the Himalayas, artisan spotlights, and ways to act — delivered monthly. No noise.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
            className="flex w-full items-center gap-3 rounded-full glass p-2 pl-6"
          >
            <Mail className="h-5 w-5 shrink-0 text-copper" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={subscribed ? 'Thank you for joining.' : 'Your email address'}
              disabled={subscribed}
              className="w-full bg-transparent text-sand placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-full bg-copper px-5 py-3 text-sm font-medium text-charcoal transition-all hover:bg-copper/80 hover:shadow-lg hover:shadow-copper/30"
            >
              {subscribed ? 'Joined' : 'Subscribe'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Links grid */}
        <div className="grid gap-12 border-t border-border pt-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Link href="/">
                <img src="/images/raghukul-logo.png" alt="Raghukul Aryawart" className="h-14 w-auto object-contain transition-transform duration-500 hover:scale-105" />
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A Himalayan movement weaving a plastic-free future, one cotton bag at a time.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-copper">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-sand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-copper">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper/70" />
                <span>Uttarakhand, Himalayas, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-copper/70" />
                <span>hello@jholaabhiyaan.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-copper/70" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-copper">Follow</h4>
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full glass transition-all duration-300 hover:bg-copper/20 hover:scale-110"
                >
                  <s.icon className="h-4 w-4 text-sand" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Jhola Abhiyaan. Crafted with care in the Himalayas.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-sand">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-sand">Terms</Link>
            <Link href="#" className="transition-colors hover:text-sand">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
