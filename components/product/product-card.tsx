'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Eye, MapPin, Clock, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore, Product } from '@/lib/store';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { wishlist, addToWishlist, removeFromWishlist, addToRecentlyViewed } = useAppStore();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = wishlist.some((p) => p.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleClick = () => {
    addToRecentlyViewed(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/product/${product.id}`} onClick={handleClick}>
      <motion.div
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="h-full"
      >
        <Card className={`h-full overflow-hidden transition-shadow hover:shadow-xl ${featured ? 'border-primary/50' : ''}`}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            {!imageError && product.images?.[0] && !product.images[0].startsWith('blob:') ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <span className="text-xl font-bold text-primary">{product.title?.[0]?.toUpperCase() || 'P'}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">No Image</span>
                </div>
              </div>
            )}
            
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {featured && (
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Featured
                </Badge>
              )}
              {product.condition === 'new' && (
                <Badge variant="secondary">New</Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm ${
                isInWishlist ? 'text-destructive' : 'text-muted-foreground'
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </Button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <Button variant="secondary" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Quick View
              </Button>
            </motion.div>
          </div>

          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium line-clamp-2 flex-1">{product.title}</h3>
              {product.negotiable && (
                <Badge variant="outline" className="shrink-0 text-xs">
                  Negotiable
                </Badge>
              )}
            </div>

            <p className="text-xl font-bold text-primary mb-3">
              {formatPrice(product.price)}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{product.city || product.location || 'Pakistan'}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {product.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {product.likes}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                {product.sellerName?.[0]?.toUpperCase() || 'S'}
              </div>
              <span className="text-sm truncate">{product.sellerName}</span>
              {product.status === 'approved' && (
                <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <div className="aspect-square bg-muted animate-pulse" />
      <CardContent className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-6 w-24 bg-muted rounded animate-pulse" />
        <div className="h-3 w-20 bg-muted rounded animate-pulse" />
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
          <div className="h-3 w-12 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
