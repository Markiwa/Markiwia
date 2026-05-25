"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Smartphone, Car, Home, Shirt, Sofa, Briefcase, Dumbbell, Baby, Palette, MoreHorizontal } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Footer } from '@/components/layout/footer';

const categories = [
  {
    id: 'mobiles',
    name: 'Mobile Phones',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    count: 15234,
    subcategories: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'OnePlus', 'Accessories']
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400',
    count: 8567,
    subcategories: ['Cars', 'Motorcycles', 'Buses', 'Trucks', 'Spare Parts', 'Accessories']
  },
  {
    id: 'property',
    name: 'Property',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
    count: 12890,
    subcategories: ['Houses', 'Apartments', 'Plots', 'Commercial', 'Rooms', 'Roommates']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    count: 23456,
    subcategories: ['Men', 'Women', 'Kids', 'Footwear', 'Watches', 'Jewelry']
  },
  {
    id: 'furniture',
    name: 'Furniture & Decor',
    icon: Sofa,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    count: 5678,
    subcategories: ['Beds', 'Sofas', 'Tables', 'Chairs', 'Decor', 'Garden']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    count: 7890,
    subcategories: ['IT', 'Marketing', 'Sales', 'Education', 'Healthcare', 'Engineering']
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    count: 3456,
    subcategories: ['Gym Equipment', 'Cricket', 'Football', 'Cycling', 'Swimming', 'Other Sports']
  },
  {
    id: 'kids',
    name: 'Kids',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    count: 4567,
    subcategories: ['Toys', 'Clothing', 'Furniture', 'Strollers', 'School Supplies']
  },
  {
    id: 'services',
    name: 'Services',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400',
    count: 6789,
    subcategories: ['Home Services', 'Movers', 'Repair', 'Education', 'Events', 'Travel']
  },
  {
    id: 'others',
    name: 'Others',
    icon: MoreHorizontal,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    count: 9876,
    subcategories: ['Books', 'Musical Instruments', 'Pets', 'Food', 'Agriculture']
  },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="All Categories" subtitle="Browse all categories" />
      
      <main className="pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">All Categories</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div 
                  className="group relative rounded-2xl overflow-hidden border bg-card cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <div className="relative h-32">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold">{category.name}</h3>
                      <p className="text-sm opacity-80">{category.count.toLocaleString()} ads</p>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Subcategories */}
                  <motion.div
                    initial={false}
                    animate={{ height: selectedCategory === category.id ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/search?category=${category.id}&subcategory=${sub.toLowerCase()}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <span>{sub}</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      ))}
                      <Link
                        href={`/search?category=${category.id}`}
                        className="block text-center text-primary text-sm font-medium pt-2"
                      >
                        View All in {category.name}
                      </Link>
                    </div>
                  </motion.div>
                </div>
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
