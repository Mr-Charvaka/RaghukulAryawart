'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/types';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error || !data) {
        setLoading(false);
        return;
      }
      setPost(data);
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

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl text-sand">Post not found</h1>
        <Link href="/blog" className="mt-6 rounded-full bg-copper px-6 py-3 text-sm text-charcoal">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="px-6 pt-32">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-sand"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image_url || ''}
          alt={post.title}
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="rounded-full glass px-4 py-1.5 text-xs text-copper">
            {post.category}
          </span>
          <h1 className="mt-6 font-display text-4xl font-light leading-tight text-sand md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {post.author} · {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 space-y-6 text-lg leading-relaxed text-sand/80"
        >
          {post.content?.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>
      </article>
    </>
  );
}
