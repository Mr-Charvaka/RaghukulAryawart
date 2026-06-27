'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { ProductCard } from '@/components/shared/product-card';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

const CATEGORIES = ['All', 'Bags', 'Accessories'];
const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('products')
        .select('*, artisan(*)')
        .order('created_at');
      if (error) {
        setLoading(false);
        return;
      }
      setProducts(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'featured') result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    return result;
  }, [products, category, sort, search]);

  return (
    <>
      <PageHeader
        eyebrow="The Shop"
        title="Carry something"
        highlight="that carries meaning."
        description="Every purchase directly supports an artisan and replaces plastic in the Himalayas."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Toolbar */}
          <div className="mb-12 flex flex-col gap-6 rounded-3xl glass p-6 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="flex items-center gap-3 rounded-full bg-charcoal/40 px-5 py-3 md:w-72">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sand placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm transition-all ${
                    category === cat
                      ? 'bg-copper text-charcoal'
                      : 'glass text-muted-foreground hover:text-sand'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full glass bg-charcoal/40 px-4 py-2 text-sm text-sand focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-charcoal">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl glass" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-display text-2xl text-sand">No products found</p>
              <p className="mt-2 text-muted-foreground">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
