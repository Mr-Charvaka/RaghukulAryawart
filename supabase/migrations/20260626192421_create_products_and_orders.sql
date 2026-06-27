/*
# Create products, artisans, orders, and blog tables

1. New Tables
- `artisans` — profiles of the women/weavers who make products
  - id (uuid PK), name, village, bio, image_url, specialty, years_experience, created_at
- `products` — handmade cotton bags and goods for the shop
  - id (uuid PK), name, slug (unique), description, price (integer paise-free, rupees), category, image_url, gallery (text[]), artisan_id (FK), story, featured (bool), stock (int), created_at
- `orders` — checkout orders (no auth, single-tenant public)
  - id (uuid PK), customer_name, customer_email, customer_phone, shipping_address, total_amount (rupees), payment_method, status, items (jsonb), created_at
- `blog_posts` — editorial content
  - id (uuid PK), title, slug (unique), excerpt, content, image_url, author, category, published_at, created_at
- `volunteer_signups` — volunteer registration submissions
  - id (uuid PK), name, email, phone, city, availability, message, created_at
- `donations` — donation records
  - id (uuid PK), donor_name, email, amount (rupees), payment_method, message, created_at
- `newsletter_subscribers` — email captures
  - id (uuid PK), email (unique), created_at

2. Security
- All tables are single-tenant (no sign-in screen). RLS enabled on every table.
- Products, artisans, blog_posts: public read (anon + authenticated), no public write.
- Orders, volunteer_signups, donations, newsletter: public insert (anon + authenticated), no public read (submissions are private to the org).
*/

CREATE TABLE IF NOT EXISTS artisans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  village text NOT NULL,
  bio text,
  image_url text,
  specialty text,
  years_experience integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price integer NOT NULL,
  category text NOT NULL DEFAULT 'Bags',
  image_url text,
  gallery text[],
  artisan_id uuid REFERENCES artisans(id) ON DELETE SET NULL,
  story text,
  featured boolean DEFAULT false,
  stock integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  shipping_address text,
  total_amount integer NOT NULL,
  payment_method text DEFAULT 'upi',
  status text DEFAULT 'pending',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  image_url text,
  author text,
  category text DEFAULT 'Stories',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteer_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  availability text,
  message text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  email text NOT NULL,
  amount integer NOT NULL,
  payment_method text DEFAULT 'upi',
  message text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read for catalog/content tables
DROP POLICY IF EXISTS "public_read_artisans" ON artisans;
CREATE POLICY "public_read_artisans" ON artisans FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_blog" ON blog_posts;
CREATE POLICY "public_read_blog" ON blog_posts FOR SELECT
  TO anon, authenticated USING (true);

-- Public insert for submission tables (no public read — private to org)
DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_volunteer" ON volunteer_signups;
CREATE POLICY "public_insert_volunteer" ON volunteer_signups FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_donations" ON donations;
CREATE POLICY "public_insert_donations" ON donations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
