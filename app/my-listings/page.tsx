'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Plus, Edit, Trash2, Eye, MoreVertical, Search, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

// Demo listings data
const demoListings = [
  {
    id: '1',
    title: 'Samsung Galaxy S24 Ultra',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200',
    category: 'Mobiles',
    status: 'active',
    views: 245,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Honda City 2022',
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=200',
    category: 'Vehicles',
    status: 'active',
    views: 892,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'MacBook Pro M3',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
    category: 'Electronics',
    status: 'sold',
    views: 567,
    createdAt: '2024-01-05',
  },
];

export default function MyListingsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [listings, setListings] = useState(demoListings);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setListings(listings.filter((l) => l.id !== id));
    toast.success('Listing deleted successfully');
  };

  const handleMarkSold = (id: string) => {
    setListings(listings.map((l) => (l.id === id ? { ...l, status: 'sold' } : l)));
    toast.success('Listing marked as sold');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
              <p className="text-muted-foreground mb-6">
                Please sign in to view and manage your listings.
              </p>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-primary to-blue-500">
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Page Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  My Listings
                </h1>
                <p className="text-sm text-muted-foreground">Manage your posted ads</p>
              </div>
            </div>
            <Link href="/sell">
              <Button className="bg-gradient-to-r from-primary to-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Post New Ad
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/10">
            <CardContent className="py-4 text-center">
              <p className="text-3xl font-bold text-primary">{listings.length}</p>
              <p className="text-sm text-muted-foreground">Total Listings</p>
            </CardContent>
          </Card>
          <Card className="border-green-500/20">
            <CardContent className="py-4 text-center">
              <p className="text-3xl font-bold text-green-600">{listings.filter((l) => l.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20">
            <CardContent className="py-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{listings.filter((l) => l.status === 'sold').length}</p>
              <p className="text-sm text-muted-foreground">Sold</p>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/20">
            <CardContent className="py-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">{listings.reduce((acc, l) => acc + l.views, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </CardContent>
          </Card>
        </div>

        {/* Listings */}
        {filteredListings.length === 0 ? (
          <Card className="border-primary/10">
            <CardContent className="py-16 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== 'all'
                  ? 'No listings match your search criteria.'
                  : "You haven't posted any ads yet."}
              </p>
              <Link href="/sell">
                <Button className="bg-gradient-to-r from-primary to-blue-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your First Ad
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="border-primary/10 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-40 h-40 bg-muted">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{listing.title}</h3>
                          <p className="text-2xl font-bold text-primary mt-1">
                            Rs. {listing.price.toLocaleString()}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/product/${listing.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            {listing.status === 'active' && (
                              <DropdownMenuItem onClick={() => handleMarkSold(listing.id)}>
                                <Package className="h-4 w-4 mr-2" />
                                Mark as Sold
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(listing.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <Badge variant="secondary">{listing.category}</Badge>
                        <Badge
                          variant={listing.status === 'active' ? 'default' : 'secondary'}
                          className={listing.status === 'active' ? 'bg-green-500' : listing.status === 'sold' ? 'bg-blue-500' : ''}
                        >
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {listing.views} views
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Posted: {listing.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
