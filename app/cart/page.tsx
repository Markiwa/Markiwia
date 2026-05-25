'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  MapPin,
  CreditCard,
} from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useAppStore();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(cart.map((item) => [item.id, item.quantity]))
  );

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || item.quantity),
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
                <p className="text-sm text-muted-foreground">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                </p>
              </div>
            </div>
            {cart.length > 0 && (
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add items to your cart to continue shopping
              </p>
              <Link href="/">
                <Button>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                            {item.images?.[0] ? (
                              <Image
                                src={item.images[0]}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${item.id}`}>
                              <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">
                                {item.title}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {item.city || item.location || 'Unknown'}
                            </div>
                            <p className="text-lg font-bold text-primary mt-2">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <div className="flex flex-col items-end justify-between">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRemove(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {quantities[item.id] || item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-sm text-muted-foreground">Calculated at checkout</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-primary">{formatPrice(subtotal)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <Link href="/checkout">
                        <Button className="w-full bg-gradient-to-r from-primary to-accent">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Proceed to Checkout
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button variant="outline" className="w-full">
                          Continue Shopping
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      Prices are negotiable. Contact sellers directly for final pricing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
