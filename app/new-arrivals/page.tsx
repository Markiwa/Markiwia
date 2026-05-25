"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Heart, MapPin, Clock, Star } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

const newArrivals = [
  {
    id: 'n1',
    title: 'iPhone 16 Pro Max 256GB',
    price: 620000,
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    time: '2 hours ago',
    isNew: true,
  },
  {
    id: 'n2',
    title: 'Tesla Model 3 2024',
    price: 18500000,
    location: 'Karachi',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
    time: '4 hours ago',
    isNew: true,
  },
  {
    id: 'n3',
    title: 'MacBook Pro M4 14"',
    price: 750000,
    location: 'Islamabad',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    time: '6 hours ago',
    isNew: true,
  },
  {
    id: 'n4',
    title: 'Samsung Galaxy Z Fold 6',
    price: 520000,
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    time: '8 hours ago',
    isNew: true,
  },
  {
    id: 'n5',
    title: 'Sony PlayStation 5 Pro',
    price: 195000,
    location: 'Rawalpindi',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
    time: '10 hours ago',
    isNew: true,
  },
  {
    id: 'n6',
    title: 'DJI Mavic 4 Pro',
    price: 450000,
    location: 'Faisalabad',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400',
    time: '12 hours ago',
    isNew: true,
  },
  {
    id: 'n7',
    title: 'Apple Vision Pro',
    price: 1250000,
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?w=400',
    time: '14 hours ago',
    isNew: true,
  },
  {
    id: 'n8',
    title: 'Mercedes-Benz S-Class 2024',
    price: 85000000,
    location: 'Islamabad',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
    time: '16 hours ago',
    isNew: true,
  },
  {
    id: 'n9',
    title: 'Rolex Submariner',
    price: 3500000,
    location: 'Karachi',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    time: '18 hours ago',
    isNew: true,
  },
  {
    id: 'n10',
    title: 'Herman Miller Aeron Chair',
    price: 350000,
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
    time: '20 hours ago',
    isNew: true,
  },
  {
    id: 'n11',
    title: 'LG OLED 77" 4K TV',
    price: 650000,
    location: 'Multan',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    time: '22 hours ago',
    isNew: true,
  },
  {
    id: 'n12',
    title: 'Dyson V15 Detect Vacuum',
    price: 145000,
    location: 'Peshawar',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
    time: '1 day ago',
    isNew: false,
  },
];

export default function NewArrivalsPage() {
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
        <div className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 py-12 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white mb-4"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Fresh Listings</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              New Arrivals
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 max-w-2xl mx-auto"
            >
              Discover the latest products just added to Markiwia. Be the first to grab these fresh listings!
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Time Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="default" size="sm">All New</Button>
            <Button variant="outline" size="sm">Last 24 Hours</Button>
            <Button variant="outline" size="sm">Last 7 Days</Button>
            <Button variant="outline" size="sm">This Month</Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newArrivals.map((product, idx) => (
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
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        New
                      </Badge>
                    )}
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
                  </div>
                  
                  <CardContent className="p-3">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors text-sm">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-primary mt-1">
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {product.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {product.time}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More New Arrivals
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
