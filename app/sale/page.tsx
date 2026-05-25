'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ProductCard, ProductCardSkeleton } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

const demoSale = [
  { id: 's1', title: 'PS5 Bundle - 30% Off!', description: 'Limited time offer', price: 130000, negotiable: false, category: 'Electronics', images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'], sellerId: 's8', sellerName: 'Game Zone', location: 'Multan', city: 'Multan', condition: 'used' as const, views: 1456, likes: 134, featured: true, createdAt: new Date(Date.now() - 86400000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Pickup', 'Delivery'], paymentOptions: ['Cash'] },
  { id: 's2', title: 'Leather Jacket - Flash Sale', description: 'Today only price', price: 9000, negotiable: false, category: 'Fashion', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'], sellerId: 's6', sellerName: 'Fashion Point', location: 'Faisalabad', city: 'Faisalabad', condition: 'new' as const, views: 534, likes: 78, featured: false, createdAt: new Date(Date.now() - 2 * 86400000), updatedAt: new Date(), status: 'approved' as const, deliveryOptions: ['Delivery'], paymentOptions: ['COD'] },
];

export default function SalePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { removedProductIds } = useAppStore();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const products = demoSale.filter((p) => !removedProductIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 py-12">
          <div className="container mx-auto px-4">
            <Button variant="ghost" className="text-white hover:text-white/80 mb-4 -ml-2" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Flash Sale</h1>
                <p className="text-white/80">Limited time deals — grab them fast!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <Badge className="mb-6 bg-red-500 text-white border-0">{products.length} Sale Items</Badge>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />) : products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
