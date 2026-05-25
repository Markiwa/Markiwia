"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, MessageSquare, 
  Settings, Bell, ChevronDown, ArrowLeft, Flag, BarChart3,
  Star, Trash2, CheckCircle, XCircle, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Package, label: 'Listings', href: '/admin/listings', active: true },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
  { icon: Flag, label: 'Reports', href: '/admin/reports' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminListingsPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  const { userListings, updateUserListing, removeUserListing } = useAppStore();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userProfile?.isAdmin) {
    router.push('/admin/login');
    return null;
  }

  const filteredListings = userListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || listing.status === filter;
    return matchesSearch && matchesFilter;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
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
              <Button variant="ghost" size="icon" onClick={() => router.push('/admin')} className="lg:hidden">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold">User Listings</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
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
                  <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>User Listings ({userListings.length})</CardTitle>
                  <CardDescription>Manage user-posted products</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-full sm:w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredListings.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No user listings found
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredListings.map((listing) => (
                    <div key={listing.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        {listing.images[0] ? (
                          <Image 
                            src={listing.images[0]} 
                            alt={listing.title} 
                            fill 
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=100';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium truncate">{listing.title}</h4>
                          <Badge variant={
                            listing.status === 'approved' ? 'default' :
                            listing.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {listing.status}
                          </Badge>
                          {listing.featured && (
                            <Badge variant="outline" className="text-amber-500 border-amber-500">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{listing.sellerName} • {listing.location}</p>
                        <p className="text-sm font-semibold text-primary">{formatPrice(listing.price)}</p>
                      </div>
                      <div className="flex gap-2">
                        {listing.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-500"
                              onClick={() => {
                                updateUserListing(listing.id, { status: 'approved' });
                                toast.success('Listing approved');
                              }}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-500"
                              onClick={() => {
                                updateUserListing(listing.id, { status: 'rejected' });
                                toast.success('Listing rejected');
                              }}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            updateUserListing(listing.id, { featured: !listing.featured });
                            toast.success(listing.featured ? 'Removed from featured' : 'Added to featured');
                          }}
                        >
                          <Star className={`w-4 h-4 ${listing.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500"
                          onClick={() => {
                            removeUserListing(listing.id);
                            toast.success('Listing deleted');
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
