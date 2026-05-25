"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Banknote,
  Building2,
  Phone,
  CheckCircle,
  Copy,
  ArrowLeft,
  MessageCircle,
  Shield,
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, clearCart } = useAppStore();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 50000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  // Bank account details (from seller's payment info)
  const bankDetails = {
    bankName: 'JazzCash / Easypaisa',
    accountTitle: 'Markiwia Payments',
    accountNumber: '03004538048',
    iban: 'PK36MEZN0099120101234567',
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderPlaced(true);
    setLoading(false);
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pb-20 md:pb-0">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add items to proceed to checkout</p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pb-20 md:pb-0">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. The seller will contact you soon to confirm your order.
            </p>
            
            {paymentMethod === 'bank' && (
              <Card className="mb-6 text-left">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Please transfer the payment to complete your order:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-bold text-primary">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account:</span>
                      <span className="font-medium">{bankDetails.accountNumber}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/my-listings" className="flex-1">
                <Button className="w-full">
                  View My Orders
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
              <p className="text-sm text-muted-foreground">
                Complete your order
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Delivery Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Muhammad Ali"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="03001234567"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="House no, Street, Area"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Lahore"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Special instructions for delivery..."
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <label className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                        }`}>
                          <RadioGroupItem value="cod" id="cod" className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Banknote className="w-5 h-5 text-green-500" />
                              <span className="font-medium">Cash on Delivery (COD)</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Pay cash when your order is delivered
                            </p>
                          </div>
                        </label>

                        <label className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                        }`}>
                          <RadioGroupItem value="bank" id="bank" className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-5 h-5 text-primary" />
                              <span className="font-medium">Bank Transfer / JazzCash / Easypaisa</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Transfer payment to seller account
                            </p>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'bank' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-4 rounded-lg bg-muted/50"
                      >
                        <h4 className="font-medium mb-3">Payment Details</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Account Type:</span>
                            <span className="font-medium">{bankDetails.bankName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Account Title:</span>
                            <span className="font-medium">{bankDetails.accountTitle}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Account Number:</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{bankDetails.accountNumber}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleCopy(bankDetails.accountNumber)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          After transferring, send payment screenshot on WhatsApp for confirmation
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Cart Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
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
                            <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-accent"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Secure checkout - Your data is protected</span>
                    </div>

                    {/* WhatsApp Support */}
                    <a
                      href="https://wa.me/923004538048"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm text-green-600 hover:text-green-700"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Need help? Chat on WhatsApp
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
