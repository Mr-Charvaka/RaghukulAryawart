'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';

const PRODUCTS = [
  {
    name: 'Himalayan Jhola',
    artisan: 'Sunita Devi',
    price: 450,
    img: 'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tag: 'Bestseller',
  },
  {
    name: 'Tribal Embroidered Tote',
    artisan: 'Geeta Rana',
    price: 680,
    img: 'https://images.pexels.com/photos/6510865/pexels-photo-6510865.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tag: 'New',
  },
  {
    name: 'Village Market Bag',
    artisan: 'Kamla Bisht',
    price: 380,
    img: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tag: 'Handloom',
  },
  {
    name: 'Pahadi Sling Bag',
    artisan: 'Meera Negi',
    price: 520,
    img: 'https://images.pexels.com/photos/5704719/pexels-photo-5704719.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tag: 'Limited',
  },
];

export function ShopPreview() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-copper">The Shop</p>
            <h2 className="mt-4 font-display text-4xl font-light text-sand md:text-5xl">
              Carry something
              <br />
              <span className="text-gradient-sand">that carries meaning.</span>
            </h2>
          </motion.div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 rounded-full glass px-6 py-3 text-sm text-sand transition-all hover:bg-copper/10"
          >
            View all products
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="perspective-1000">
                <div className="preserve-3d transition-transform duration-700 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl glass">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

                    {/* Tag */}
                    <span className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1 text-xs text-sand">
                      {p.tag}
                    </span>

                    {/* Wishlist */}
                    <button
                      onClick={() =>
                        setWishlist((w) =>
                          w.includes(i) ? w.filter((x) => x !== i) : [...w, i]
                        )
                      }
                      aria-label="Add to wishlist"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass-strong transition-all hover:scale-110"
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          wishlist.includes(i) ? 'fill-copper text-copper' : 'text-sand'
                        }`}
                      />
                    </button>

                    {/* Hover actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-copper py-2.5 text-xs font-medium text-charcoal transition-colors hover:bg-copper/80">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full glass-strong text-sand transition-colors hover:bg-foreground/10">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-4 px-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg text-sand">{p.name}</h3>
                      <span className="font-body text-copper">₹{p.price}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">by {p.artisan}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
