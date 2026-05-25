'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { ProductCard, ProductCardSkeleton } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Product, useAppStore } from '@/lib/store';
import { Search, Filter, X, Grid, List, SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Electronics', 'Vehicles', 'Property', 'Fashion', 'Home & Garden', 'Jobs', 'Services', 'Kids'];
const conditions = ['All', 'New', 'Used', 'Refurbished'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
];

const demoProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB',
    description: 'Brand new sealed',
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
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Pickup'],
    paymentOptions: ['Cash'],
  },
  {
    id: '2',
    title: 'Honda Civic 2024',
    description: 'Top of the line',
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
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Pickup'],
    paymentOptions: ['Bank Transfer'],
  },
  {
    id: '3',
    title: 'MacBook Pro M3 14"',
    description: 'Sealed Box',
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
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    status: 'approved',
    deliveryOptions: ['Delivery'],
    paymentOptions: ['Cash'],
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { userListings } = useAppStore();
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filters
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Combine demo products with user listings
      let filtered = [...demoProducts, ...userListings];
      
      if (searchQuery) {
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (category !== 'All') {
        filtered = filtered.filter((p) => p.category === category);
      }
      
      if (condition !== 'All') {
        filtered = filtered.filter((p) => p.condition === condition.toLowerCase());
      }
      
      filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
      
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          filtered.sort((a, b) => b.views - a.views);
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        default:
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      
      setProducts(filtered);
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [searchQuery, category, condition, priceRange, sortBy, userListings]);

  const clearFilters = () => {
    setCategory('All');
    setCondition('All');
    setPriceRange([0, 10000000]);
    setSortBy('newest');
  };

  const activeFilters = [
    category !== 'All' && category,
    condition !== 'All' && condition,
    (priceRange[0] > 0 || priceRange[1] < 10000000) && 'Price Filter',
  ].filter(Boolean);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Condition</Label>
        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((cond) => (
              <SelectItem key={cond} value={cond}>{cond}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-4 block">
          Price Range: PKR {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={10000000}
          step={10000}
          className="w-full"
        />
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg rounded-full"
              />
            </div>
          </div>

          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
              </h1>
              <p className="text-muted-foreground">
                {products.length} product{products.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFilters.length > 0 && (
                      <Badge className="ml-2">{activeFilters.length}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="hidden md:flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map((filter) => (
                <Badge key={filter as string} variant="secondary" className="pl-3">
                  {filter}
                  <button className="ml-2 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterContent />
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {[...Array(6)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No products found</h2>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
