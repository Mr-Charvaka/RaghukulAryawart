'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/types';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wished = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="perspective-1000">
        <div className="preserve-3d transition-transform duration-700 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl glass">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image_url || ''}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

            {product.featured && (
              <span className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1 text-xs text-sand">
                Featured
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass-strong transition-all hover:scale-110"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  wished ? 'fill-copper text-copper' : 'text-sand'
                }`}
              />
            </button>

            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <button
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-copper py-2.5 text-xs font-medium text-charcoal transition-colors hover:bg-copper/80"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to Cart
              </button>
              <Link
                href={`/shop/${product.slug}`}
                aria-label="Quick view"
                className="flex h-10 w-10 items-center justify-center rounded-full glass-strong text-sand transition-colors hover:bg-foreground/10"
              >
                <Eye className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-4 px-1">
            <div className="flex items-center justify-between">
              <Link href={`/shop/${product.slug}`}>
                <h3 className="font-display text-lg text-sand transition-colors hover:text-copper">
                  {product.name}
                </h3>
              </Link>
              <span className="font-body text-copper">₹{product.price}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
