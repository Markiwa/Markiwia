"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, MessageSquare, 
  Settings, Bell, Search, ChevronDown, MoreVertical, TrendingUp,
  TrendingDown, DollarSign, Eye, CheckCircle, XCircle, Clock,
  Filter, Download, RefreshCw, Shield, Flag, Image as ImageIcon,
  BarChart3, PieChart, Activity, Trash2, ArrowLeft, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/hooks/use-auth';
import { useAppStore, Product } from '@/lib/store';
import { toast } from 'sonner';

// Demo products list (same as in page.tsx)
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
    condition: 'new',
    views: 1250,
    likes: 89,
    featured: true,
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
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
    condition: 'new',
    views: 3450,
    likes: 234,
    featured: true,
    createdAt: Date.now() - 5 * 60 * 60 * 1000,
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
    condition: 'new',
    views: 890,
    likes: 67,
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
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
    condition: 'used',
    views: 2100,
    likes: 156,
    featured: true,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
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
    condition: 'new',
    views: 567,
    likes: 45,
    createdAt: Date.now() - 12 * 60 * 60 * 1000,
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
    condition: 'new',
    views: 234,
    likes: 28,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
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
    condition: 'new',
    views: 1890,
    likes: 178,
    featured: true,
    createdAt: Date.now() - 6 * 60 * 60 * 1000,
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
    condition: 'used',
    views: 456,
    likes: 34,
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    status: 'approved',
    deliveryOptions: ['Pickup', 'Delivery'],
    paymentOptions: ['Cash'],
  },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Package, label: 'Listings', href: '/admin/listings' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
  { icon: Flag, label: 'Reports', href: '/admin/reports' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  const { 
    removedProductIds, 
    adminRemoveProduct, 
    adminRestoreProduct,
    userListings,
    updateUserListing,
    removeUserListing
  } = useAppStore();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [listingFilter, setListingFilter] = useState('all');

  useEffect(() => {
    if (!loading && (!userProfile || !userProfile.isAdmin)) {
      router.push('/admin/login');
    }
  }, [userProfile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!userProfile?.isAdmin) {
    return null;
  }

  // Get visible demo products (not removed)
  const visibleDemoProducts = demoProducts.filter(p => !removedProductIds.includes(p.id));
  const removedDemoProducts = demoProducts.filter(p => removedProductIds.includes(p.id));
  
  // Combine all listings
  const allListings = [...userListings, ...visibleDemoProducts];
  
  // Filter listings
  const filteredListings = listingFilter === 'all' 
    ? allListings 
    : listingFilter === 'demo' 
      ? visibleDemoProducts
      : listingFilter === 'user'
        ? userListings
        : listingFilter === 'featured'
          ? allListings.filter(p => p.featured || p.isFeatured)
          : allListings;

  const stats = [
    { label: 'Total Listings', value: allListings.length.toString(), change: '+' + userListings.length + ' user', trend: 'up', icon: Package },
    { label: 'Demo Products', value: visibleDemoProducts.length.toString(), change: removedDemoProducts.length + ' removed', trend: 'down', icon: ImageIcon },
    { label: 'User Listings', value: userListings.length.toString(), change: userListings.filter(l => l.status === 'pending').length + ' pending', trend: 'up', icon: Users },
    { label: 'Featured', value: allListings.filter(p => p.featured || p.isFeatured).length.toString(), change: '', trend: 'up', icon: Star },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemoveDemoProduct = (productId: string) => {
    adminRemoveProduct(productId);
    toast.success('Demo product removed from website');
  };

  const handleRestoreDemoProduct = (productId: string) => {
    adminRestoreProduct(productId);
    toast.success('Demo product restored');
  };

  const handleApproveUserListing = (productId: string) => {
    updateUserListing(productId, { status: 'approved' });
    toast.success('Listing approved and now visible to public');
  };

  const handleRejectUserListing = (productId: string) => {
    updateUserListing(productId, { status: 'rejected' });
    toast.success('Listing rejected');
  };

  const handleDeleteUserListing = (productId: string) => {
    removeUserListing(productId);
    toast.success('User listing permanently deleted');
  };

  const handleToggleFeatured = (product: Product) => {
    if (product.id.startsWith('user-')) {
      updateUserListing(product.id, { featured: !product.featured });
      toast.success(product.featured ? 'Removed from featured' : 'Added to featured');
    } else {
      toast.error('Demo products cannot be modified. Only removed.');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background hidden lg:block">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-xl">Markiwia</span>
          <Badge variant="secondary" className="ml-auto text-xs">Admin</Badge>
        </div>
        
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur">
          <div className="flex h-full items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="lg:hidden">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {userListings.filter(l => l.status === 'pending').length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {userListings.filter(l => l.status === 'pending').length}
                  </span>
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userProfile?.photoURL} />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{userProfile?.displayName || 'Admin'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push('/')}>Back to Site</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        {stat.change && (
                          <div className={`flex items-center gap-1 text-sm mt-1 ${
                            stat.trend === 'up' ? 'text-green-500' : 'text-orange-500'
                          }`}>
                            <span>{stat.change}</span>
                          </div>
                        )}
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="listings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="listings">All Listings</TabsTrigger>
              <TabsTrigger value="pending">
                Pending Approval
                {userListings.filter(l => l.status === 'pending').length > 0 && (
                  <Badge className="ml-2" variant="destructive">
                    {userListings.filter(l => l.status === 'pending').length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="removed">Removed Demo Products</TabsTrigger>
            </TabsList>

            {/* All Listings Tab */}
            <TabsContent value="listings">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>All Listings</CardTitle>
                    <CardDescription>Manage demo and user listings</CardDescription>
                  </div>
                  <Select value={listingFilter} onValueChange={setListingFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Listings</SelectItem>
                      <SelectItem value="demo">Demo Products</SelectItem>
                      <SelectItem value="user">User Listings</SelectItem>
                      <SelectItem value="featured">Featured Only</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredListings.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        No listings found
                      </div>
                    ) : (
                      filteredListings.map((listing) => {
                        const isDemo = !listing.id.startsWith('user-');
                        return (
                          <div key={listing.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                              <Image 
                                src={listing.images[0] || '/placeholder.jpg'} 
                                alt={listing.title} 
                                fill 
                                className="object-cover" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium truncate">{listing.title}</h4>
                                <Badge variant={isDemo ? "secondary" : "outline"}>
                                  {isDemo ? 'Demo' : 'User'}
                                </Badge>
                                {(listing.featured || listing.isFeatured) && (
                                  <Badge variant="default" className="bg-amber-500">
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{listing.sellerName} • {listing.location}</p>
                              <p className="text-sm font-semibold text-primary">{formatPrice(listing.price)}</p>
                            </div>
                            <div className="flex gap-2">
                              {isDemo ? (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                                      <Trash2 className="w-4 h-4 mr-1" />
                                      Remove
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Remove Demo Product?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will hide &quot;{listing.title}&quot; from the website. You can restore it later from the Removed tab.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleRemoveDemoProduct(listing.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Remove
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleToggleFeatured(listing)}
                                  >
                                    <Star className={`w-4 h-4 mr-1 ${listing.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                                    {listing.featured ? 'Unfeature' : 'Feature'}
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete User Listing?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will permanently delete &quot;{listing.title}&quot;. This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDeleteUserListing(listing.id)}
                                          className="bg-red-500 hover:bg-red-600"
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pending Approval Tab */}
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approval</CardTitle>
                  <CardDescription>Review and approve user submitted listings</CardDescription>
                </CardHeader>
                <CardContent>
                  {userListings.filter(l => l.status === 'pending').length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle className="w-16 h-16 mx-auto opacity-30 mb-4" />
                      <p>No pending listings to review</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userListings.filter(l => l.status === 'pending').map((listing) => (
                        <div key={listing.id} className="flex items-center gap-4 p-4 rounded-lg border bg-amber-50 dark:bg-amber-950/20">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <Image 
                              src={listing.images[0] || '/placeholder.jpg'} 
                              alt={listing.title} 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium">{listing.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {listing.sellerName} • {listing.city || listing.location}
                            </p>
                            <p className="text-lg font-bold text-primary">{formatPrice(listing.price)}</p>
                            <p className="text-xs text-muted-foreground">
                              Category: {listing.category} • Condition: {listing.condition}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => handleApproveUserListing(listing.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleRejectUserListing(listing.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Removed Demo Products Tab */}
            <TabsContent value="removed">
              <Card>
                <CardHeader>
                  <CardTitle>Removed Demo Products</CardTitle>
                  <CardDescription>Demo products you have removed from the website</CardDescription>
                </CardHeader>
                <CardContent>
                  {removedDemoProducts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Package className="w-16 h-16 mx-auto opacity-30 mb-4" />
                      <p>No removed demo products</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {removedDemoProducts.map((listing) => (
                        <div key={listing.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 opacity-70">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden grayscale">
                            <Image 
                              src={listing.images[0] || '/placeholder.jpg'} 
                              alt={listing.title} 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{listing.title}</h4>
                            <p className="text-sm text-muted-foreground">{listing.sellerName}</p>
                            <p className="text-sm font-semibold text-primary">{formatPrice(listing.price)}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRestoreDemoProduct(listing.id)}
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Restore
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
