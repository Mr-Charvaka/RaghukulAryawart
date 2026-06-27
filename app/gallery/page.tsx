'use client';

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/page-header';

const GALLERY = [
  { src: 'https://images.pexels.com/photos/12716153/pexels-photo-12716153.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Himalayan mountains', span: 'lg:col-span-2 lg:row-span-2' },
  { src: 'https://images.pexels.com/photos/5704720/pexels-photo-5704720.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Cotton bag', span: '' },
  { src: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Stitching', span: '' },
  { src: 'https://images.pexels.com/photos/704971/pexels-photo-704971.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Handloom', span: '' },
  { src: 'https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Campaign', span: '' },
  { src: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Volunteers', span: 'lg:col-span-2' },
  { src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Mountain trail', span: '' },
  { src: 'https://images.pexels.com/photos/6510865/pexels-photo-6510865.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Embroidery', span: '' },
  { src: 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Village', span: '' },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="The movement,"
        highlight="in frames."
        description="Faces, hands, landscapes, and the quiet labor that stitches a plastic-free Himalayas together."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-[250px] grid-cols-2 gap-4 lg:grid-cols-4">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: (i % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl glass ${img.span}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-4 text-sm text-sand opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
