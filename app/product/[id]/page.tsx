"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Share2, Flag, MessageCircle, Phone, MapPin, Calendar, Eye, Star, ChevronLeft, ChevronRight, Shield, Clock, User, Package, ShoppingCart, CreditCard, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppStore, Product } from '@/lib/store';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Footer } from '@/components/layout/footer';
import { toast } from 'sonner';

// Demo products database - different products based on ID
const productsDatabase: Record<string, {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  subCategory: string;
  condition: string;
  location: string;
  postedAt: string;
  views: number;
  isFeatured: boolean;
  isNegotiable: boolean;
  deliveryOptions: string[];
  paymentDetails?: {
    accountTitle: string;
    accountNumber: string;
    bankName: string;
  };
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    memberSince: string;
    isVerified: boolean;
    responseRate: string;
    responseTime: string;
    totalListings: number;
    phone: string;
  };
  specifications: { label: string; value: string }[];
}> = {
  '1': {
    id: '1',
    title: 'Samsung Galaxy S24 Ultra - 512GB',
    price: 380000,
    originalPrice: 420000,
    description: 'Brand new Samsung Galaxy S24 Ultra with S-Pen. 512GB storage, 12GB RAM. PTA approved with box and all accessories. 1 year Samsung warranty.',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800',
    ],
    category: 'Electronics',
    subCategory: 'Mobile Phones',
    condition: 'New',
    location: 'Lahore, Punjab',
    postedAt: '3 days ago',
    views: 892,
    isFeatured: true,
    isNegotiable: true,
    deliveryOptions: ['Meetup', 'Delivery'],
    paymentDetails: {
      accountTitle: 'Ali Faraz Malik',
      accountNumber: '03004538048',
      bankName: 'JazzCash / Easypaisa',
    },
    seller: {
      id: 's1',
      name: 'Ali Electronics',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 4.8,
      reviews: 156,
      memberSince: 'Jan 2022',
      isVerified: true,
      responseRate: '95%',
      responseTime: 'Within 1 hour',
      totalListings: 45,
      phone: '03004538048',
    },
    specifications: [
      { label: 'Brand', value: 'Samsung' },
      { label: 'Model', value: 'Galaxy S24 Ultra' },
      { label: 'Storage', value: '512GB' },
      { label: 'RAM', value: '12GB' },
      { label: 'PTA Status', value: 'Approved' },
      { label: 'Warranty', value: '1 Year' },
    ]
  },
  '2': {
    id: '2',
    title: 'Honda City 2022 - Automatic',
    price: 4500000,
    originalPrice: 4800000,
    description: 'Honda City 2022 model, 1.5L VTEC engine, automatic transmission. First owner, excellent condition, complete documented. Genuine 25,000 km driven.',
    images: [
      'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    ],
    category: 'Vehicles',
    subCategory: 'Cars',
    condition: 'Used - Like New',
    location: 'Karachi, Sindh',
    postedAt: '1 week ago',
    views: 2341,
    isFeatured: true,
    isNegotiable: true,
    deliveryOptions: ['Meetup'],
    paymentDetails: {
      accountTitle: 'Muhammad Ahmed',
      accountNumber: '1234567890',
      bankName: 'HBL',
    },
    seller: {
      id: 's2',
      name: 'Ahmed Motors',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 4.9,
      reviews: 89,
      memberSince: 'Mar 2021',
      isVerified: true,
      responseRate: '98%',
      responseTime: 'Within 30 mins',
      totalListings: 23,
      phone: '03001234567',
    },
    specifications: [
      { label: 'Brand', value: 'Honda' },
      { label: 'Model', value: 'City' },
      { label: 'Year', value: '2022' },
      { label: 'Transmission', value: 'Automatic' },
      { label: 'Mileage', value: '25,000 km' },
      { label: 'Fuel Type', value: 'Petrol' },
    ]
  },
  '3': {
    id: '3',
    title: 'MacBook Pro 14" M3 Pro - 512GB',
    price: 450000,
    description: 'Apple MacBook Pro 14 inch with M3 Pro chip. 18GB RAM, 512GB SSD. Brand new, sealed pack with Apple warranty. Perfect for professionals.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
    ],
    category: 'Electronics',
    subCategory: 'Laptops',
    condition: 'New',
    location: 'Islamabad',
    postedAt: '5 days ago',
    views: 567,
    isFeatured: false,
    isNegotiable: false,
    deliveryOptions: ['Meetup', 'Delivery'],
    paymentDetails: {
      accountTitle: 'Tech Hub Pakistan',
      accountNumber: '03214538058',
      bankName: 'Easypaisa',
    },
    seller: {
      id: 's3',
      name: 'Tech Hub',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
      rating: 4.7,
      reviews: 234,
      memberSince: 'Jun 2020',
      isVerified: true,
      responseRate: '92%',
      responseTime: 'Within 2 hours',
      totalListings: 67,
      phone: '03214538058',
    },
    specifications: [
      { label: 'Brand', value: 'Apple' },
      { label: 'Model', value: 'MacBook Pro 14"' },
      { label: 'Chip', value: 'M3 Pro' },
      { label: 'RAM', value: '18GB' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Warranty', value: 'Apple 1 Year' },
    ]
  },
  '4': {
    id: '4',
    title: '3 Marla House for Sale - DHA Phase 6',
    price: 12500000,
    description: 'Beautiful 3 marla house in DHA Phase 6 Lahore. 3 bedrooms, 2 bathrooms, drawing room, lounge, kitchen. Fully furnished, ready to move in.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    category: 'Property',
    subCategory: 'Houses',
    condition: 'Used',
    location: 'Lahore, Punjab',
    postedAt: '2 weeks ago',
    views: 1567,
    isFeatured: true,
    isNegotiable: true,
    deliveryOptions: ['Visit'],
    paymentDetails: {
      accountTitle: 'Property Deals',
      accountNumber: '0987654321',
      bankName: 'MCB',
    },
    seller: {
      id: 's4',
      name: 'Property Deals',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
      rating: 4.6,
      reviews: 45,
      memberSince: 'Sep 2021',
      isVerified: true,
      responseRate: '88%',
      responseTime: 'Within 3 hours',
      totalListings: 12,
      phone: '03107306812',
    },
    specifications: [
      { label: 'Size', value: '3 Marla' },
      { label: 'Bedrooms', value: '3' },
      { label: 'Bathrooms', value: '2' },
      { label: 'Location', value: 'DHA Phase 6' },
      { label: 'Furnished', value: 'Yes' },
      { label: 'Parking', value: '1 Car' },
    ]
  },
};

// Default product for unknown IDs
const defaultProduct = {
  id: 'default',
  title: 'Product Not Found',
  price: 0,
  description: 'This product listing is not available or has been removed.',
  images: ['https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800'],
  category: 'Unknown',
  subCategory: '',
  condition: 'Unknown',
  location: 'Unknown',
  postedAt: 'Unknown',
  views: 0,
  isFeatured: false,
  isNegotiable: false,
  deliveryOptions: [],
  seller: {
    id: '',
    name: 'Unknown Seller',
    avatar: '',
    rating: 0,
    reviews: 0,
    memberSince: '',
    isVerified: false,
    responseRate: '0%',
    responseTime: 'Unknown',
    totalListings: 0,
    phone: '',
  },
  specifications: []
};

const similarProducts = [
  { id: '1', title: 'Samsung Galaxy S24 Ultra', price: 380000, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', location: 'Lahore' },
  { id: '2', title: 'Honda City 2022', price: 4500000, image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=400', location: 'Karachi' },
  { id: '3', title: 'MacBook Pro M3', price: 450000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', location: 'Islamabad' },
  { id: '4', title: 'DHA House 3 Marla', price: 12500000, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400', location: 'Lahore' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const { addToWishlist, removeFromWishlist, addToCart, isInWishlist, userListings } = useAppStore();

  const productId = params.id as string;
  
  // First check if it's a user listing, then check demo products
  const userProduct = userListings.find(p => p.id === productId);
  
  // Convert user listing to product format if found
  const product = userProduct ? {
    id: userProduct.id,
    title: userProduct.title,
    price: userProduct.price,
    description: userProduct.description || '',
    images: userProduct.images.length > 0 ? userProduct.images : ['https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800'],
    category: userProduct.category,
    subCategory: userProduct.subcategory || '',
    condition: userProduct.condition === 'new' ? 'New' : userProduct.condition === 'refurbished' ? 'Refurbished' : 'Used',
    location: userProduct.location || userProduct.city || 'Pakistan',
    postedAt: new Date(userProduct.createdAt).toLocaleDateString(),
    views: userProduct.views || 0,
    isFeatured: userProduct.isFeatured || userProduct.featured || false,
    isNegotiable: userProduct.isNegotiable || userProduct.negotiable || false,
    deliveryOptions: userProduct.deliveryOptions || ['Meetup'],
    paymentDetails: undefined,
    seller: {
      id: userProduct.sellerId,
      name: userProduct.sellerName || 'Seller',
      avatar: userProduct.sellerPhoto || '',
      rating: userProduct.sellerRating || 0,
      reviews: 0,
      memberSince: 'New Member',
      isVerified: false,
      responseRate: 'N/A',
      responseTime: 'N/A',
      totalListings: 1,
      phone: '03004538048',
    },
    specifications: []
  } : (productsDatabase[productId] || defaultProduct);

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        images: product.images,
        category: product.category,
        subcategory: product.subCategory,
        condition: product.condition as 'new' | 'used' | 'refurbished',
        location: product.location,
        sellerId: product.seller.id,
        sellerName: product.seller.name,
        sellerPhoto: product.seller.avatar,
        sellerRating: product.seller.rating,
        createdAt: Date.now(),
        views: product.views,
        isFeatured: product.isFeatured,
        isNegotiable: product.isNegotiable,
        stock: 1,
        deliveryOptions: product.deliveryOptions,
        paymentOptions: ['Cash', 'Bank Transfer'],
      });
      toast.success('Added to wishlist');
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.title,
        text: `Check out ${product.title} on Markiwia`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.images,
      category: product.category,
      subcategory: product.subCategory,
      condition: product.condition as 'new' | 'used' | 'refurbished',
      location: product.location,
      sellerId: product.seller.id,
      sellerName: product.seller.name,
      sellerPhoto: product.seller.avatar,
      sellerRating: product.seller.rating,
      createdAt: Date.now(),
      views: product.views,
      isFeatured: product.isFeatured,
      isNegotiable: product.isNegotiable,
      stock: 1,
      deliveryOptions: product.deliveryOptions,
      paymentOptions: ['Cash', 'Bank Transfer'],
    });
    toast.success('Added to cart');
  };

  const handleBuyNow = () => {
    setShowBuyDialog(true);
  };

  const handleProceedToPayment = () => {
    setShowBuyDialog(false);
    setShowPaymentDialog(true);
  };

  const handleConfirmOrder = () => {
    setShowPaymentDialog(false);
    toast.success('Order placed successfully! Seller will contact you soon.');
    router.push('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (product.id === 'default') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <Package className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-primary to-blue-500">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-4 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="py-4 text-sm">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li><Link href={`/categories?cat=${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link></li>
              <li>/</li>
              <li className="text-foreground truncate max-w-[200px]">{product.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={product.images[currentImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                {product.isFeatured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500">
                    Featured
                  </Badge>
                )}
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      currentImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleWishlist}>
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {product.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {product.postedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {product.views} views
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.isNegotiable && (
                  <Badge variant="secondary">Negotiable</Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{product.condition}</Badge>
                <Badge variant="outline">{product.category}</Badge>
                {product.deliveryOptions.map(opt => (
                  <Badge key={opt} variant="outline">{opt}</Badge>
                ))}
              </div>

              {/* Seller Card */}
              <div className="p-4 rounded-xl border border-primary/10 bg-card">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{product.seller.name}</h3>
                      {product.seller.isVerified && (
                        <Shield className="w-4 h-4 text-primary fill-primary/20" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{product.seller.rating}</span>
                      <span>({product.seller.reviews} reviews)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Member since {product.seller.memberSince} - {product.seller.totalListings} listings
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{product.seller.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span>{product.seller.responseRate} response</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-blue-500" 
                  size="lg" 
                  onClick={handleBuyNow}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
                <Button variant="outline" className="flex-1 h-12" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" variant="secondary" asChild>
                  <Link href={`/chat/${product.seller.id}`}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Seller
                  </Link>
                </Button>
                <Button className="flex-1" variant="secondary" asChild>
                  <a href={`tel:${product.seller.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Seller
                  </a>
                </Button>
              </div>

              <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                <Link href="/report">
                  <Flag className="w-4 h-4 mr-2" />
                  Report this ad
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-4">
              <div className="prose dark:prose-invert max-w-none">
                <p>{product.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No reviews yet</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Similar Products */}
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.filter(item => item.id !== product.id).slice(0, 4).map(item => (
                <Link key={item.id} href={`/product/${item.id}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-xl border border-primary/10 bg-card overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                      <p className="text-xs text-muted-foreground">{item.location}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Buy Now Dialog */}
      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              Review your order details before proceeding to payment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                <Image src={product.images[0]} alt={product.title} width={80} height={80} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(product.price)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-primary">{formatPrice(product.price)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowBuyDialog(false)}>
              Cancel
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-primary to-blue-500" onClick={handleProceedToPayment}>
              Proceed to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              Payment Details
            </DialogTitle>
            <DialogDescription>
              Send payment to the seller&apos;s account and confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Account Title</p>
                <p className="font-semibold">{product.paymentDetails?.accountTitle || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account Number</p>
                <p className="font-semibold font-mono">{product.paymentDetails?.accountNumber || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Bank / Payment Method</p>
                <p className="font-semibold">{product.paymentDetails?.bankName || 'Not provided'}</p>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                <strong>Important:</strong> Send exactly {formatPrice(product.price)} to the account above. 
                After payment, the seller will be notified and will contact you for delivery/meetup.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500" onClick={handleConfirmOrder}>
              I&apos;ve Made the Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <BottomNav />
    </div>
  );
}
