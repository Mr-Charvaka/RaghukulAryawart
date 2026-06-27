export interface Artisan {
  id: string;
  name: string;
  village: string;
  bio: string | null;
  image_url: string | null;
  specialty: string | null;
  years_experience: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  gallery: string[] | null;
  artisan_id: string | null;
  story: string | null;
  featured: boolean;
  stock: number;
  artisan?: Artisan | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  author: string | null;
  category: string;
  published_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
