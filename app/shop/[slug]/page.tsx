'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Minus, Plus, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/lib/cart-context';
import type { Product, Artisan } from '@/lib/types';

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('products')
        .select('*, artisan(*)')
        .eq('slug', slug)
        .maybeSingle();
      if (error || !data) {
        setLoading(false);
        return;
      }
      setProduct(data);
      setArtisan(data.artisan || null);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-pulse rounded-full bg-copper/10 blur-xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl text-sand">Product not found</h1>
        <Link href="/shop" className="mt-6 rounded-full bg-copper px-6 py-3 text-sm text-charcoal">
          Back to Shop
        </Link>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image_url || ''];
  const wished = isInWishlist(product.id);

  return (
    <>
      {/* Back link */}
      <div className="px-6 pt-32">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-sand"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Shop
        </Link>
      </div>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl glass">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative h-20 w-20 overflow-hidden rounded-xl transition-all ${
                      activeImg === i ? 'ring-2 ring-copper' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-copper">{product.category}</p>
            <h1 className="mt-4 font-display text-4xl font-light text-sand md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-3xl text-copper">₹{product.price}</p>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Story */}
            {product.story && (
              <div className="mt-8 rounded-2xl glass p-6">
                <p className="text-xs uppercase tracking-widest text-copper">The Story</p>
                <p className="mt-3 leading-relaxed text-sand/80">{product.story}</p>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full glass px-3 py-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/10"
                >
                  <Minus className="h-4 w-4 text-sand" />
                </button>
                <span className="w-8 text-center tabular-nums text-sand">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/10"
                >
                  <Plus className="h-4 w-4 text-sand" />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-copper py-4 text-sm font-medium text-charcoal transition-all hover:bg-copper/80 hover:shadow-lg hover:shadow-copper/30"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className="flex h-12 w-12 items-center justify-center rounded-full glass transition-all hover:scale-110"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    wished ? 'fill-copper text-copper' : 'text-sand'
                  }`}
                />
              </button>
            </div>

            {/* Artisan profile */}
            {artisan && (
              <div className="mt-10 rounded-3xl glass p-6">
                <p className="text-xs uppercase tracking-widest text-copper">The Artisan</p>
                <div className="mt-4 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artisan.image_url || ''}
                    alt={artisan.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-display text-xl text-sand">{artisan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {artisan.village} · {artisan.specialty}
                    </p>
                  </div>
                </div>
                {artisan.bio && (
                  <p className="mt-4 leading-relaxed text-sand/70">{artisan.bio}</p>
                )}
                <p className="mt-3 text-sm text-copper">
                  {artisan.years_experience} years of craft
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
