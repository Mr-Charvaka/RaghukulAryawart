import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/lib/cart-context';
import { CartDrawer } from '@/components/layout/cart-drawer';

const cormorant = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://raghukularyawart.org'),
  title: 'Jhola Abhiyaan — Carry Change, Not Plastic',
  description:
    'A cinematic journey through the Himalayan movement eliminating single-use plastic, empowering rural women, and reviving Indian handloom. Based in Uttarakhand, India.',
  keywords: [
    'Jhola Abhiyaan',
    'Uttarakhand NGO',
    'cotton bag movement',
    'eliminate single-use plastic',
    'rural women empowerment',
    'Indian handloom',
    'sustainable shopping',
  ],
  openGraph: {
    title: 'Jhola Abhiyaan — Carry Change, Not Plastic',
    description:
      'A Himalayan movement for a plastic-free future, handmade cotton, and empowered communities.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jhola Abhiyaan — Carry Change, Not Plastic',
    description:
      'A Himalayan movement for a plastic-free future, handmade cotton, and empowered communities.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <SmoothScrollProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
