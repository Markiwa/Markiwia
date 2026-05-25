"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ChevronRight, Filter, Grid3X3, List, Heart, MapPin, Clock,
  Smartphone, Car, Home, Shirt, Sofa, Briefcase, Dumbbell, Baby, 
  Palette, MoreHorizontal, Wrench, Gamepad2
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

const categoryData: Record<string, {
  name: string;
  icon: any;
  image: string;
  description: string;
  subcategories: string[];
}> = {
  'electronics': {
    name: 'Electronics',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
    description: 'Mobile phones, laptops, tablets, and all electronic gadgets',
    subcategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Cameras', 'Gaming', 'Accessories', 'TVs', 'Audio']
  },
  'vehicles': {
    name: 'Vehicles',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
    description: 'Cars, motorcycles, and all types of vehicles',
    subcategories: ['Cars', 'Motorcycles', 'Buses', 'Trucks', 'Rickshaws', 'Spare Parts', 'Accessories']
  },
  'property': {
    name: 'Property',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    description: 'Houses, apartments, plots and commercial properties',
    subcategories: ['Houses', 'Apartments', 'Plots', 'Commercial', 'Rooms', 'Roommates', 'Vacation Rentals']
  },
  'fashion': {
    name: 'Fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    description: 'Clothing, footwear, and fashion accessories',
    subcategories: ['Men Clothing', 'Women Clothing', 'Kids Clothing', 'Footwear', 'Watches', 'Jewelry', 'Bags']
  },
  'home-garden': {
    name: 'Home & Garden',
    icon: Sofa,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    description: 'Furniture, home decor, and garden supplies',
    subcategories: ['Furniture', 'Kitchen', 'Garden', 'Decor', 'Bedding', 'Bathroom', 'Lighting']
  },
  'jobs': {
    name: 'Jobs',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    description: 'Find jobs or post job opportunities',
    subcategories: ['IT & Software', 'Marketing', 'Sales', 'Education', 'Healthcare', 'Engineering', 'Part-time']
  },
  'services': {
    name: 'Services',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
    description: 'Professional and home services',
    subcategories: ['Home Services', 'Movers', 'Repair', 'Education', 'Events', 'Travel', 'Health & Fitness']
  },
  'kids': {
    name: 'Kids',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800',
    description: 'Products for babies and kids',
    subcategories: ['Toys', 'Clothing', 'Furniture', 'Strollers', 'School Supplies', 'Baby Care', 'Books']
  },
  'sports': {
    name: 'Sports & Hobbies',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    description: 'Sports equipment and hobby items',
    subcategories: ['Gym Equipment', 'Cricket', 'Football', 'Cycling', 'Swimming', 'Musical Instruments', 'Books']
  },
  'animals': {
    name: 'Animals',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800',
    description: 'Pets and pet supplies',
    subcategories: ['Dogs', 'Cats', 'Birds', 'Fish', 'Pet Food', 'Pet Accessories', 'Other Pets']
  },
  'business': {
    name: 'Business & Industry',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    description: 'Business equipment and industrial supplies',
    subcategories: ['Office Equipment', 'Medical', 'Machinery', 'Raw Materials', 'Trade', 'Food & Restaurants']
  },
  'education': {
    name: 'Education',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    description: 'Books, courses, and educational materials',
    subcategories: ['Books', 'Courses', 'Tutoring', 'Online Learning', 'School Supplies', 'Languages']
  },
};

// Sample products for each category
const sampleProducts = [
  {
    id: '1',
    title: 'Samsung Galaxy S24 Ultra',
    price: 385000,
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    time: '2 hours ago',
    featured: true,
  },
  {
    id: '2',
    title: 'iPhone 14 Pro Max',
    price: 420000,
    location: 'Karachi',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
    time: '5 hours ago',
    featured: true,
  },
  {
    id: '3',
    title: 'MacBook Pro M3',
    price: 650000,
    location: 'Islamabad',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    time: '1 day ago',
    featured: false,
  },
  {
    id: '4',
    title: 'Sony PlayStation 5',
    price: 145000,
    location: 'Lahore',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
    time: '3 hours ago',
    featured: false,
  },
  {
    id: '5',
    title: 'Dell XPS 15 Laptop',
    price: 280000,
    location: 'Rawalpindi',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
    time: '6 hours ago',
    featured: true,
  },
  {
    id: '6',
    title: 'Canon EOS R5 Camera',
    price: 520000,
    location: 'Faisalabad',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    time: '1 day ago',
    featured: false,
  },
];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const { addToWishlist, wishlist } = useAppStore();
  
  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  const category = categoryData[slug] || {
    name: slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Category',
    icon: MoreHorizontal,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    description: 'Browse items in this category',
    subcategories: ['All Items'],
  };

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

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-24 md:pb-8">
        {/* Hero Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                <Link href="/" className="hover:text-white">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/categories" className="hover:text-white">Categories</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{category.name}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{category.name}</h1>
              <p className="text-white/80">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Subcategories */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge 
              variant="default" 
              className="cursor-pointer bg-primary text-primary-foreground"
            >
              All
            </Badge>
            {category.subcategories.map((sub) => (
              <Badge 
                key={sub} 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {sub}
              </Badge>
            ))}
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                {sampleProducts.length} results
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="hidden sm:flex border rounded-lg">
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sampleProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={`group overflow-hidden hover:shadow-lg transition-all ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`relative ${
                    viewMode === 'list' ? 'w-40 shrink-0' : 'aspect-square'
                  }`}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <Badge className="absolute top-2 left-2 bg-amber-500 text-white">
                        Featured
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
                  
                  <CardContent className={`p-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
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
              Load More Products
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
