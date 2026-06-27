'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/page-header';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      if (error) {
        setLoading(false);
        return;
      }
      setPosts(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Stories from"
        highlight="the mountains."
        description="Dispatches from the field — artisan profiles, campaign updates, and the quiet revolutions of the Himalayas."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-3xl glass" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl glass">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image_url || ''}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                      <div className="absolute bottom-0 p-6">
                        <span className="rounded-full glass-strong px-3 py-1 text-xs text-copper">
                          {post.category}
                        </span>
                        <h2 className="mt-4 font-display text-2xl font-light leading-tight text-sand transition-colors group-hover:text-copper">
                          {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <p className="mt-3 text-xs text-muted-foreground">
                          {post.author} · {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
