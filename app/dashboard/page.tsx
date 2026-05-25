"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Package, Plus, Eye, Edit, Trash2, MoreVertical, TrendingUp,
  DollarSign, ShoppingCart, Star, MessageSquare, Settings,
  BarChart3, Calendar, Clock, CheckCircle, XCircle, AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { useAppStore } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { userListings } = useAppStore();
  const [activeTab, setActiveTab] = useState('listings');

  // Get user's own listings from store
  const myListings = userListings.filter(listing => listing.sellerId === user?.uid) || [];
  
  // Calculate real stats based on user's listings
  const totalSales = myListings.filter(l => l.status === 'sold').reduce((sum, l) => sum + l.price, 0);
  const activeListings = myListings.filter(l => l.status === 'active').length;
  const totalViews = myListings.reduce((sum, l) => sum + (l.views || 0), 0);
  const totalMessages = 0; // No messages yet for new users

  const sellerStats = [
    { label: 'Total Sales', value: `Rs ${totalSales.toLocaleString()}`, change: totalSales > 0 ? '+' : '', icon: DollarSign },
    { label: 'Active Listings', value: activeListings.toString(), change: activeListings > 0 ? '+' + activeListings : '', icon: Package },
    { label: 'Total Views', value: totalViews.toLocaleString(), change: totalViews > 0 ? '+' + totalViews : '', icon: Eye },
    { label: 'Messages', value: totalMessages.toString(), change: '', icon: MessageSquare },
  ];

  // Calculate seller XP based on sales
  const salesCount = myListings.filter(l => l.status === 'sold').length;
  const xpPoints = salesCount * 100;
  const xpToGold = 1000;
  const currentLevel = xpPoints >= 1000 ? 'Gold' : xpPoints >= 500 ? 'Silver' : 'Bronze';
  const xpProgress = Math.min((xpPoints / xpToGold) * 100, 100);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'sold': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'sold':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0 hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate text-foreground">Seller Dashboard</h1>
            <p className="text-sm text-muted-foreground truncate">Manage your listings and orders</p>
          </div>

          <Button asChild size="sm">
            <Link href="/sell">
              <Plus className="w-4 h-4 mr-2" />
              Add New Listing
            </Link>
          </Button>
        </div>
      </header>
      
      <main className="pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {sellerStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-xl font-bold mt-1">{stat.value}</p>
                        {stat.change && <p className="text-xs text-green-500 mt-1">{stat.change}</p>}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Seller Level Progress */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{currentLevel} Seller</span>
                </div>
                <span className="text-sm text-muted-foreground">{xpPoints} / {xpToGold} XP to Gold</span>
              </div>
              <Progress value={xpProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {salesCount === 0 
                  ? 'Complete your first sale to start earning XP and level up!'
                  : `Complete ${Math.ceil((xpToGold - xpPoints) / 100)} more sales to reach Gold level and unlock premium features`
                }
              </p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="listings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="listings">
              <Card>
                <CardHeader>
                  <CardTitle>My Listings</CardTitle>
                  <CardDescription>Manage your product listings</CardDescription>
                </CardHeader>
                <CardContent>
                  {myListings.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                      <p className="text-muted-foreground mb-4">Start selling by posting your first ad</p>
                      <Button asChild>
                        <Link href="/sell">
                          <Plus className="w-4 h-4 mr-2" />
                          Post Your First Ad
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myListings.map((listing) => (
                        <motion.div
                          key={listing.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <Image src={listing.images[0] || '/placeholder.jpg'} alt={listing.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium truncate">{listing.title}</h4>
                              <Badge variant="outline" className="capitalize">
                                <span className={`w-2 h-2 rounded-full ${getStatusColor(listing.status || 'pending')} mr-1`} />
                                {listing.status || 'pending'}
                              </Badge>
                            </div>
                            <p className="text-lg font-bold text-primary">{formatPrice(listing.price)}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {listing.views || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {listing.likes || 0}
                              </span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Track your sales and orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                    <p className="text-muted-foreground">Orders will appear here when buyers purchase your items</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Views Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                      {totalViews > 0 ? (
                        <BarChart3 className="w-16 h-16 opacity-50" />
                      ) : (
                        <div className="text-center">
                          <BarChart3 className="w-12 h-12 mx-auto opacity-30 mb-2" />
                          <p className="text-sm">Post your first ad to see analytics</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                      {totalSales > 0 ? (
                        <TrendingUp className="w-16 h-16 opacity-50" />
                      ) : (
                        <div className="text-center">
                          <TrendingUp className="w-12 h-12 mx-auto opacity-30 mb-2" />
                          <p className="text-sm">Make your first sale to see performance</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
