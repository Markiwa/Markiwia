'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ProductCard, ProductCardSkeleton } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

const demoNew = [
  { id: 'n1', title: 'Samsung Galaxy S24 Ultra', description: 'Brand new flagship', price: 380000, negotiable: true, category: 'Electronics', images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'], sellerId: 's5', sellerName: 'Galaxy Shop', location: 'Peshawar', city: 'Peshawar', condition: 'new' as const, views: 567, likes: 45, featured: false, createdAt: new Date(Date.now() - 1 * 3600000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Delivery'], paymentOptions: ['Cash'] },
  { id: 'n2', title: 'Designer Leather Jacket', description: 'Premium genuine leather', price: 15000, negotiable: true, category: 'Fashion', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'], sellerId: 's6', sellerName: 'Fashion Point', location: 'Faisalabad', city: 'Faisalabad', condition: 'new' as const, views: 234, likes: 28, featured: false, createdAt: new Date(Date.now() - 2 * 3600000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Delivery'], paymentOptions: ['COD'] },
  { id: 'n3', title: 'MacBook Pro M3 14"', description: 'Sealed box Apple laptop', price: 520000, negotiable: false, category: 'Electronics', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'], sellerId: 's3', sellerName: 'Tech Store', location: 'Islamabad', city: 'Islamabad', condition: 'new' as const, views: 890, likes: 67, featured: false, createdAt: new Date(Date.now() - 3 * 3600000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Pickup'], paymentOptions: ['Bank Transfer'] },
  { id: 'n4', title: 'PS5 + Games Bundle', description: '5 games included', price: 180000, negotiable: false, category: 'Electronics', images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'], sellerId: 's8', sellerName: 'Game Zone', location: 'Multan', city: 'Multan', condition: 'used' as const, views: 456, likes: 34, featured: false, createdAt: new Date(Date.now() - 4 * 3600000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Pickup', 'Delivery'], paymentOptions: ['Cash'] },
];

export default function NewPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { removedProductIds } = useAppStore();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const products = demoNew.filter((p) => !removedProductIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="bg-muted/50 py-10 border-b border-border">
          <div className="container mx-auto px-4">
            <Button variant="ghost" className="mb-4 -ml-2" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">New Arrivals</h1>
                <p className="text-muted-foreground">Latest listings just posted</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <Badge variant="secondary" className="mb-6">{products.length} New Listings</Badge>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />) : products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
