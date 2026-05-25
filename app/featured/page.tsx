'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ProductCard, ProductCardSkeleton } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

const demoFeatured = [
  { id: 'f1', title: 'iPhone 15 Pro Max 256GB', description: 'Brand new sealed', price: 450000, negotiable: true, category: 'Electronics', images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'], sellerId: 's1', sellerName: 'Mobile Hub', location: 'Lahore', city: 'Lahore', condition: 'new' as const, views: 1250, likes: 89, featured: true, createdAt: new Date(Date.now() - 2 * 3600000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Pickup'], paymentOptions: ['Cash'] },
  { id: 'f2', title: 'Honda Civic 2024', description: 'Top of the line', price: 8500000, negotiable: true, category: 'Vehicles', images: ['https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500'], sellerId: 's2', sellerName: 'Auto World', location: 'Karachi', city: 'Karachi', condition: 'new' as const, views: 3450, likes: 234, featured: true, createdAt: new Date(Date.now() - 5 * 3600000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Pickup'], paymentOptions: ['Bank Transfer'] },
  { id: 'f3', title: 'DHA Phase 5 Apartment', description: 'Luxury 3 bedroom', price: 45000000, negotiable: true, category: 'Property', images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500'], sellerId: 's4', sellerName: 'Prime Properties', location: 'Lahore', city: 'Lahore', condition: 'used' as const, views: 2100, likes: 156, featured: true, createdAt: new Date(Date.now() - 3 * 86400000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: [], paymentOptions: ['Bank Transfer'] },
  { id: 'f4', title: 'Gaming PC - RTX 4080', description: 'High-end build', price: 450000, negotiable: true, category: 'Electronics', images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500'], sellerId: 's7', sellerName: 'PC Masters', location: 'Rawalpindi', city: 'Rawalpindi', condition: 'new' as const, views: 1890, likes: 178, featured: true, createdAt: new Date(Date.now() - 6 * 3600000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Pickup'], paymentOptions: ['Cash'] },
];

export default function FeaturedPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { removedProductIds } = useAppStore();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const products = demoFeatured.filter((p) => !removedProductIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="bg-gradient-to-r from-primary to-accent py-12">
          <div className="container mx-auto px-4">
            <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground/80 mb-4 -ml-2" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Featured Ads</h1>
                <p className="text-white/80">Handpicked premium listings</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="secondary">{products.length} Featured Listings</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />) : products.map((p) => <ProductCard key={p.id} product={p} featured />)}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
