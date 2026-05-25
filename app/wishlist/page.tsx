'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, clearCart } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
                <p className="text-sm text-muted-foreground">
                  {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved
                </p>
              </div>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save items you like by clicking the heart icon
              </p>
              <Link href="/">
                <Button>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
