'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ProductCard, ProductCardSkeleton } from '@/components/product/product-card';
import { InstallBanner } from '@/components/pwa/install-banner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore, Product } from '@/lib/store';
import {
  ChevronRight,
  Sparkles,
  Clock,
  Shield,
  Truck,
  CreditCard,
  Award,
  Star,
  Zap,
  Gift,
  Target,
} from 'lucide-react';

const categories = [
  { name: 'Electronics', image: '/categories/electronics.jpg', count: '25K+ Ads', href: '/category/electronics', color: 'from-blue-600 to-cyan-500' },
  { name: 'Vehicles', image: '/categories/vehicles.jpg', count: '15K+ Ads', href: '/category/vehicles', color: 'from-red-600 to-orange-500' },
  { name: 'Property', image: '/categories/property.jpg', count: '10K+ Ads', href: '/category/property', color: 'from-green-600 to-emerald-500' },
  { name: 'Fashion', image: '/categories/fashion.jpg', count: '30K+ Ads', href: '/category/fashion', color: 'from-pink-600 to-rose-500' },
  { name: 'Home & Garden', image: '/categories/home-garden.jpg', count: '8K+ Ads', href: '/category/home-garden', color: 'from-amber-600 to-yellow-500' },
  { name: 'Jobs', image: '/categories/jobs.jpg', count: '5K+ Ads', href: '/category/jobs', color: 'from-indigo-600 to-violet-500' },
  { name: 'Services', image: '/categories/services.jpg', count: '12K+ Ads', href: '/category/services', color: 'from-teal-600 to-cyan-500' },
  { name: 'Kids', image: '/categories/kids.jpg', count: '7K+ Ads', href: '/category/kids', color: 'from-fuchsia-600 to-pink-500' },
];

const features = [
  { icon: Shield, title: 'Secure Trading', description: 'All transactions are protected' },
  { icon: Truck, title: 'Fast Delivery', description: 'Nationwide shipping available' },
  { icon: CreditCard, title: 'Easy Payments', description: 'Multiple payment options' },
  { icon: Award, title: 'Verified Sellers', description: 'Trusted community of sellers' },
];

// Demo products — admin can remove these via Admin Panel
const demoProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB - Brand New',
    description: 'Brand new sealed iPhone 15 Pro Max',
    price: 450000,
    negotiable: true,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'],
    sellerId: 'seller1',
    sellerName: 'Mobile Hub',
    location: 'Lahore',
    city: 'Lahore',
    condition: 'new',
    views: 1250,
    likes: 89,
    featured: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Pickup', 'Delivery'],
    paymentOptions: ['Cash', 'JazzCash'],
  },
  {
    id: '2',
    title: 'Honda Civic 2024 - Top of the Line',
    description: 'Fully loaded Honda Civic 2024',
    price: 8500000,
    negotiable: true,
    category: 'Vehicles',
    images: ['https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500'],
    sellerId: 'seller2',
    sellerName: 'Auto World',
    location: 'Karachi',
    city: 'Karachi',
    condition: 'new',
    views: 3450,
    likes: 234,
    featured: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Pickup'],
    paymentOptions: ['Bank Transfer'],
  },
  {
    id: '3',
    title: 'MacBook Pro M3 14" - Sealed Box',
    description: 'Apple MacBook Pro with M3 chip',
    price: 520000,
    negotiable: false,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    sellerId: 'seller3',
    sellerName: 'Tech Store',
    location: 'Islamabad',
    city: 'Islamabad',
    condition: 'new',
    views: 890,
    likes: 67,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Pickup', 'Delivery'],
    paymentOptions: ['Cash', 'Bank Transfer'],
  },
  {
    id: '4',
    title: '3 Bedroom Apartment - DHA Phase 5',
    description: 'Luxury apartment with modern amenities',
    price: 45000000,
    negotiable: true,
    category: 'Property',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500'],
    sellerId: 'seller4',
    sellerName: 'Prime Properties',
    location: 'Lahore',
    city: 'Lahore',
    condition: 'used',
    views: 2100,
    likes: 156,
    featured: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: [],
    paymentOptions: ['Bank Transfer'],
  },
  {
    id: '5',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Samsung flagship phone',
    price: 380000,
    negotiable: true,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
    sellerId: 'seller5',
    sellerName: 'Galaxy Shop',
    location: 'Peshawar',
    city: 'Peshawar',
    condition: 'new',
    views: 567,
    likes: 45,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Pickup', 'Delivery'],
    paymentOptions: ['Cash', 'JazzCash', 'EasyPaisa'],
  },
  {
    id: '6',
    title: 'Designer Leather Jacket - Premium',
    description: 'Genuine leather jacket',
    price: 15000,
    negotiable: true,
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'],
    sellerId: 'seller6',
    sellerName: 'Fashion Point',
    location: 'Faisalabad',
    city: 'Faisalabad',
    condition: 'new',
    views: 234,
    likes: 28,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Delivery'],
    paymentOptions: ['Cash', 'COD'],
  },
  {
    id: '7',
    title: 'Gaming PC - RTX 4080 Build',
    description: 'High-end gaming PC',
    price: 450000,
    negotiable: true,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500'],
    sellerId: 'seller7',
    sellerName: 'PC Masters',
    location: 'Rawalpindi',
    city: 'Rawalpindi',
    condition: 'new',
    views: 1890,
    likes: 178,
    featured: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Pickup'],
    paymentOptions: ['Cash', 'Bank Transfer'],
  },
  {
    id: '8',
    title: 'Sony PlayStation 5 + Games Bundle',
    description: 'PS5 with 5 games',
    price: 180000,
    negotiable: false,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'],
    sellerId: 'seller8',
    sellerName: 'Game Zone',
    location: 'Multan',
    city: 'Multan',
    condition: 'used',
    views: 456,
    likes: 34,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Pickup', 'Delivery'],
    paymentOptions: ['Cash'],
  },
];

// Animated typing words for hero
const heroWords = ['Everything', 'Electronics', 'Vehicles', 'Property', 'Fashion'];

function AnimatedHeroWord() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const word = heroWords[index];
    if (typing) {
      if (displayed.length < word.length) {
        timeoutRef.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 1400);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setIndex((i) => (i + 1) % heroWords.length);
        setTyping(true);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, typing, index]);

  return (
    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block min-w-[12ch]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { recentlyViewed, removedProductIds, userListings } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter out admin-removed demo products
      const filteredDemo = removedProductIds?.length
        ? demoProducts.filter((p) => !removedProductIds.includes(p.id))
        : demoProducts;
      
      // Get approved user listings
      const approvedUserListings = userListings.filter(
        (p) => p.status === 'approved' || p.status === 'active' || p.status === 'pending'
      );
      
      // Combine demo products with user listings
      setProducts([...approvedUserListings, ...filteredDemo]);
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [removedProductIds, userListings]);

  const featuredProducts = products.filter((p) => p.featured);
  const latestProducts = [...products].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-10 md:py-16 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {"Pakistan's #1 Marketplace"}
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance leading-tight">
                  Buy &amp; Sell
                  <br />
                  <AnimatedHeroWord /> with Ease
                </h1>

                <p className="text-base md:text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                  Join millions of buyers and sellers. Find amazing deals on electronics, vehicles,
                  property, fashion, and more.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/sell">
                    <Button size="lg" className="magnetic bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      <Zap className="mr-2 h-5 w-5" />
                      Start Selling Free
                    </Button>
                  </Link>
                  <Link href="/categories">
                    <Button size="lg" variant="outline" className="magnetic">
                      Browse Categories
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section - canvas style images, no emoji */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Browse Categories</h2>
              <Link href="/categories">
                <Button variant="ghost" className="text-primary">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={cat.href}>
                    <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Canvas-style image */}
                      <div className="relative w-full aspect-square">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                        />
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                        {/* Shine sweep on hover */}
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
                      </div>
                      {/* Text below */}
                      <div className="p-2 text-center bg-background border-t border-border/40">
                        <h3 className="font-semibold text-xs leading-tight">{cat.name}</h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{cat.count}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Featured Ads</h2>
                  <p className="text-sm text-muted-foreground">Handpicked products for you</p>
                </div>
              </div>
              <Link href="/featured">
                <Button variant="ghost" className="text-primary">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {loading
                ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
                : featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} featured />
                  ))}
            </div>
          </div>
        </section>

        {/* Latest Products */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Fresh Ads</h2>
                  <p className="text-sm text-muted-foreground">Just posted</p>
                </div>
              </div>
              <Link href="/new">
                <Button variant="ghost" className="text-primary">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {loading
                ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
                : latestProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
          </div>
        </section>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Recently Viewed</h2>
                    <p className="text-sm text-muted-foreground">Continue where you left off</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {recentlyViewed.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 bg-gradient-to-r from-primary to-accent">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <Gift className="h-12 w-12 mx-auto mb-4 text-primary-foreground" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Start Selling Today
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                List your items for free and reach millions of buyers across Pakistan
              </p>
              <Link href="/sell">
                <Button size="lg" variant="secondary" className="magnetic">
                  Post Free Ad
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
      <InstallBanner />
    </div>
  );
}
