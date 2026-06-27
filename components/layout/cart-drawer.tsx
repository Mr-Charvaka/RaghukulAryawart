'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-charcoal/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-charcoal-soft/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-copper" />
                <h2 className="font-display text-xl text-sand">
                  Your Cart ({cartCount})
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full glass transition-colors hover:bg-foreground/10"
              >
                <X className="h-4 w-4 text-sand" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-copper/10">
                    <ShoppingBag className="h-8 w-8 text-copper/50" />
                  </div>
                  <p className="mt-6 font-display text-xl text-sand">Your cart is empty</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Every purchase empowers an artisan and replaces plastic.
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 rounded-full bg-copper px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-copper/80"
                  >
                    Browse the Shop
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-2xl glass p-4"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.image_url || ''}
                        alt={item.product.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-display text-base text-sand">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-copper">₹{item.product.price}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label="Remove item"
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center gap-3">
                          <div className="flex items-center gap-2 rounded-full glass px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-foreground/10"
                            >
                              <Minus className="h-3 w-3 text-sand" />
                            </button>
                            <span className="w-6 text-center text-sm tabular-nums text-sand">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-foreground/10"
                            >
                              <Plus className="h-3 w-3 text-sand" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-display text-2xl text-sand">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full rounded-full bg-copper py-4 text-center text-sm font-medium text-charcoal transition-all hover:bg-copper/80 hover:shadow-lg hover:shadow-copper/30"
                >
                  Checkout →
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
