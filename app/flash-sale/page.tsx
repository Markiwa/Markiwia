"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Zap, Heart, MapPin, Clock, Timer, Percent } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

const flashSaleProducts = [
  {
    id: 'f1',
    title: 'Samsung 65" Smart TV',
    originalPrice: 250000,
    price: 185000,
    discount: 26,
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    endsIn: 3600 * 5,
    sold: 45,
    total: 100,
  },
  {
    id: 'f2',
    title: 'iPhone 14 Pro 128GB',
    originalPrice: 380000,
    price: 320000,
    discount: 16,
    location: 'Karachi',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
    endsIn: 3600 * 8,
    sold: 78,
    total: 100,
  },
  {
    id: 'f3',
    title: 'Sony WH-1000XM5 Headphones',
    originalPrice: 85000,
    price: 62000,
    discount: 27,
    location: 'Islamabad',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    endsIn: 3600 * 12,
    sold: 32,
    total: 50,
  },
  {
    id: 'f4',
    title: 'MacBook Air M2',
    originalPrice: 420000,
    price: 365000,
    discount: 13,
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    endsIn: 3600 * 6,
    sold: 15,
    total: 30,
  },
  {
    id: 'f5',
    title: 'Nike Air Max 270',
    originalPrice: 28000,
    price: 18500,
    discount: 34,
    location: 'Rawalpindi',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    endsIn: 3600 * 4,
    sold: 89,
    total: 100,
  },
  {
    id: 'f6',
    title: 'iPad Pro 12.9"',
    originalPrice: 350000,
    price: 295000,
    discount: 16,
    location: 'Faisalabad',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    endsIn: 3600 * 10,
    sold: 22,
    total: 40,
  },
];

function CountdownTimer({ seconds }: { seconds: number }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex items-center gap-1 text-xs font-mono">
      <span className="bg-red-500 text-white px-1.5 py-0.5 rounded">{hours.toString().padStart(2, '0')}</span>
      <span>:</span>
      <span className="bg-red-500 text-white px-1.5 py-0.5 rounded">{minutes.toString().padStart(2, '0')}</span>
      <span>:</span>
      <span className="bg-red-500 text-white px-1.5 py-0.5 rounded">{secs.toString().padStart(2, '0')}</span>
    </div>
  );
}

export default function FlashSalePage() {
  const { addToWishlist, wishlist } = useAppStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWishlist = (product: any) => {
    addToWishlist(product);
    toast.success('Added to wishlist');
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-24 md:pb-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white mb-4"
            >
              <Zap className="w-5 h-5" />
              <span className="font-bold">Flash Sale Live!</span>
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Mega Flash Sale</h1>
            <p className="text-white/90 max-w-2xl mx-auto mb-6">
              Limited time offers with massive discounts. Grab your favorites before they are gone!
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">50+</div>
                <div className="text-white/70 text-sm">Products</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">70%</div>
                <div className="text-white/70 text-sm">Max Discount</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white">24h</div>
                <div className="text-white/70 text-sm">Duration</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {flashSaleProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      <Percent className="w-3 h-3 mr-1" />
                      {product.discount}% OFF
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white ${
                        isInWishlist(product.id) ? 'text-red-500' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlist(product);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                    
                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                      <div className="flex items-center justify-between text-white text-xs mb-1">
                        <span>{product.sold} sold</span>
                        <CountdownTimer seconds={product.endsIn} />
                      </div>
                      <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"
                          style={{ width: `${(product.sold / product.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors text-sm">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold text-red-500">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {product.location}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
