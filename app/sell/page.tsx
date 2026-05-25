'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  Upload,
  X,
  Plus,
  Camera,
  MapPin,
  DollarSign,
  Tag,
  FileText,
  Loader2,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Cpu,
  Car,
  Home,
  Shirt,
  Flower2,
  Briefcase,
  Wrench,
  Baby,
  Smartphone,
  Sofa,
  Dumbbell,
  BookOpen,
  CreditCard,
  Banknote,
} from 'lucide-react';

const categories = [
  { value: 'electronics', label: 'Electronics', Icon: Cpu, color: 'from-blue-500 to-cyan-400', subcategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Cameras', 'TVs', 'Gaming', 'Audio', 'Accessories'] },
  { value: 'vehicles', label: 'Vehicles', Icon: Car, color: 'from-red-500 to-orange-400', subcategories: ['Cars', 'Bikes', 'Parts', 'Buses', 'Trucks', 'Rickshaws', 'Boats'] },
  { value: 'property', label: 'Property', Icon: Home, color: 'from-green-500 to-emerald-400', subcategories: ['Houses', 'Apartments', 'Plots', 'Commercial', 'Rooms', 'Shops'] },
  { value: 'fashion', label: 'Fashion', Icon: Shirt, color: 'from-pink-500 to-rose-400', subcategories: ['Men', 'Women', 'Kids', 'Watches', 'Jewelry', 'Bags', 'Shoes'] },
  { value: 'home-garden', label: 'Home & Garden', Icon: Flower2, color: 'from-amber-500 to-yellow-400', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden', 'Tools', 'Appliances'] },
  { value: 'jobs', label: 'Jobs', Icon: Briefcase, color: 'from-indigo-500 to-violet-400', subcategories: ['IT', 'Marketing', 'Sales', 'Education', 'Healthcare', 'Engineering'] },
  { value: 'services', label: 'Services', Icon: Wrench, color: 'from-teal-500 to-cyan-400', subcategories: ['Cleaning', 'Repairs', 'Moving', 'Events', 'Tutoring', 'Web Development'] },
  { value: 'kids', label: 'Kids', Icon: Baby, color: 'from-fuchsia-500 to-pink-400', subcategories: ['Toys', 'Clothes', 'Baby Care', 'School', 'Strollers', 'Books'] },
  { value: 'mobiles', label: 'Mobiles', Icon: Smartphone, color: 'from-purple-500 to-indigo-400', subcategories: ['Samsung', 'iPhone', 'Xiaomi', 'Oppo', 'Vivo', 'OnePlus', 'Accessories'] },
  { value: 'furniture', label: 'Furniture', Icon: Sofa, color: 'from-orange-500 to-amber-400', subcategories: ['Sofas', 'Beds', 'Tables', 'Chairs', 'Wardrobes', 'Office'] },
  { value: 'sports', label: 'Sports', Icon: Dumbbell, color: 'from-lime-500 to-green-400', subcategories: ['Gym', 'Cricket', 'Football', 'Cycling', 'Swimming', 'Other'] },
  { value: 'books', label: 'Books', Icon: BookOpen, color: 'from-sky-500 to-blue-400', subcategories: ['Educational', 'Fiction', 'Islamic', 'Children', 'Magazines', 'Other'] },
];

const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur'];

const conditions = [
  { value: 'new', label: 'Brand New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' },
];

const paymentMethods = [
  { value: 'jazzcash', label: 'JazzCash' },
  { value: 'easypaisa', label: 'Easypaisa' },
  { value: 'bank', label: 'Bank Transfer' },
  { value: 'cod', label: 'Cash on Delivery' },
];

export default function SellPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { addUserListing } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    price: '',
    negotiable: false,
    condition: 'used',
    city: '',
    location: '',
    deliveryOptions: ['meetup'] as string[],
    // Payment details for seller
    paymentMethod: '',
    accountTitle: '',
    accountNumber: '',
    bankName: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      toast.error('Please sign in to post an ad');
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to post an ad');
      return;
    }

    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    if (!formData.title || !formData.price || !formData.category || !formData.city) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!formData.paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (formData.paymentMethod !== 'cod' && !formData.accountNumber) {
      toast.error('Please add payment details so buyers can pay you');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create product object
      const newProduct = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        category: formData.category,
        subcategory: formData.subCategory,
        condition: formData.condition as 'new' | 'used' | 'refurbished',
        city: formData.city,
        location: formData.location || formData.city,
        sellerId: user.uid,
        sellerName: user.displayName || 'Anonymous',
        sellerPhoto: user.photoURL || '',
        images: imagePreviews, // Using preview URLs for now
        negotiable: formData.negotiable,
        status: 'pending' as const,
        views: 0,
        likes: 0,
        createdAt: Date.now(),
        deliveryOptions: formData.deliveryOptions,
        paymentOptions: [formData.paymentMethod],
      };

      // Add to store
      addUserListing(newProduct);

      toast.success('Ad posted successfully! It will be reviewed shortly.');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to post ad. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find((c) => c.value === formData.category);

  const steps = [
    { number: 1, title: 'Category', icon: Tag },
    { number: 2, title: 'Photos', icon: Camera },
    { number: 3, title: 'Details', icon: FileText },
    { number: 4, title: 'Price & Payment', icon: DollarSign },
    { number: 5, title: 'Review', icon: CheckCircle },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Custom Header for Sell Page */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Post Your Ad
              </h1>
              <p className="text-sm text-muted-foreground">Sell your items quickly on Markiwia</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
              {steps.map((step, i) => (
                <div key={step.number} className="flex items-center">
                  <button
                    onClick={() => {
                      if (step.number < currentStep) setCurrentStep(step.number);
                    }}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.number
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border text-muted-foreground'
                    } ${step.number < currentStep ? 'cursor-pointer hover:opacity-80' : ''}`}
                  >
                    <step.icon className="h-5 w-5" />
                  </button>
                  <span
                    className={`ml-2 text-sm font-medium hidden sm:block whitespace-nowrap ${
                      currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </span>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-4 sm:w-8 h-0.5 mx-2 ${
                        currentStep > step.number ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Category Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Select Category</CardTitle>
                      <CardDescription>
                        Choose the category that best fits your item
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => setFormData({ ...formData, category: cat.value, subCategory: '' })}
                            className={`p-4 rounded-xl border-2 transition-all text-center hover:border-primary/50 ${
                              formData.category === cat.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border'
                            }`}
                          >
                            <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3`}>
                              <cat.Icon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-sm font-medium">{cat.label}</span>
                          </button>
                        ))}
                      </div>

                      {selectedCategory && (
                        <div className="mt-6">
                          <Label className="mb-2 block">Sub-category</Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedCategory.subcategories.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => setFormData({ ...formData, subCategory: sub })}
                                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                  formData.subCategory === sub
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary hover:bg-secondary/80'
                                }`}
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end mt-6">
                        <Button
                          onClick={() => setCurrentStep(2)}
                          disabled={!formData.category || !formData.subCategory}
                          className="bg-gradient-to-r from-primary to-blue-500"
                        >
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Photos */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Add Photos</CardTitle>
                      <CardDescription>
                        Add up to 10 photos. First photo will be the cover image.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {imagePreviews.map((preview, i) => (
                          <div
                            key={i}
                            className="relative aspect-square rounded-lg overflow-hidden border-2 border-border group"
                          >
                            <img
                              src={preview}
                              alt={`Preview ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {i === 0 && (
                              <Badge className="absolute top-2 left-2 text-xs bg-primary">Cover</Badge>
                            )}
                            <button
                              onClick={() => removeImage(i)}
                              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}

                        {images.length < 10 && (
                          <label className="aspect-square rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <Plus className="h-8 w-8 text-primary mb-2" />
                            <span className="text-sm text-muted-foreground">Add Photo</span>
                          </label>
                        )}
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setCurrentStep(1)}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          onClick={() => setCurrentStep(3)}
                          disabled={images.length === 0}
                          className="bg-gradient-to-r from-primary to-blue-500"
                        >
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                      <CardDescription>
                        Provide details about your product
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="What are you selling? e.g., Samsung Galaxy S24 Ultra"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your product in detail - condition, features, reason for selling..."
                          rows={5}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Condition *</Label>
                        <div className="flex flex-wrap gap-2">
                          {conditions.map((cond) => (
                            <button
                              key={cond.value}
                              onClick={() => setFormData({ ...formData, condition: cond.value })}
                              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                formData.condition === cond.value
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary hover:bg-secondary/80'
                              }`}
                            >
                              {cond.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City *</Label>
                          <Select
                            value={formData.city}
                            onValueChange={(value) => setFormData({ ...formData, city: value })}
                          >
                            <SelectTrigger className="border-primary/20">
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Area/Locality</Label>
                          <Input
                            id="location"
                            placeholder="e.g., DHA Phase 5"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setCurrentStep(2)}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          onClick={() => setCurrentStep(4)}
                          disabled={!formData.title || !formData.city}
                          className="bg-gradient-to-r from-primary to-blue-500"
                        >
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Price & Payment */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Price & Payment Details</CardTitle>
                      <CardDescription>
                        Set your price and add payment details for buyers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (PKR) *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">Rs.</span>
                          <Input
                            id="price"
                            type="number"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="pl-12 border-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                        <div>
                          <Label>Price Negotiable</Label>
                          <p className="text-sm text-muted-foreground">Allow buyers to make offers</p>
                        </div>
                        <Switch
                          checked={formData.negotiable}
                          onCheckedChange={(checked) => setFormData({ ...formData, negotiable: checked })}
                        />
                      </div>

                      {/* Payment Details Section */}
                      <div className="border-t pt-6">
                        <div className="flex items-center gap-2 mb-4">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Payment Details</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add your payment details so buyers can pay you directly
                        </p>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Payment Method *</Label>
                            <div className="flex flex-wrap gap-2">
                              {paymentMethods.map((method) => (
                                <button
                                  key={method.value}
                                  onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                    formData.paymentMethod === method.value
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-secondary hover:bg-secondary/80'
                                  }`}
                                >
                                  {method.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {formData.paymentMethod && formData.paymentMethod !== 'cod' && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="accountTitle">Account Title *</Label>
                                <Input
                                  id="accountTitle"
                                  placeholder="Your name as on account"
                                  value={formData.accountTitle}
                                  onChange={(e) => setFormData({ ...formData, accountTitle: e.target.value })}
                                  className="border-primary/20 focus:border-primary"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="accountNumber">
                                  {formData.paymentMethod === 'bank' ? 'Account Number *' : 'Mobile Number *'}
                                </Label>
                                <Input
                                  id="accountNumber"
                                  placeholder={formData.paymentMethod === 'bank' ? 'Enter account number' : 'e.g., 03001234567'}
                                  value={formData.accountNumber}
                                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                  className="border-primary/20 focus:border-primary"
                                />
                              </div>

                              {formData.paymentMethod === 'bank' && (
                                <div className="space-y-2">
                                  <Label htmlFor="bankName">Bank Name *</Label>
                                  <Input
                                    id="bankName"
                                    placeholder="e.g., HBL, MCB, UBL"
                                    value={formData.bankName}
                                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                    className="border-primary/20 focus:border-primary"
                                  />
                                </div>
                              )}
                            </>
                          )}

                          {formData.paymentMethod === 'cod' && (
                            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                              <p className="text-sm text-green-700 dark:text-green-400">
                                Cash on Delivery selected. Buyer will pay when they receive the item.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setCurrentStep(3)}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          onClick={() => setCurrentStep(5)}
                          disabled={!formData.price || (!formData.accountNumber && formData.paymentMethod !== 'cod')}
                          className="bg-gradient-to-r from-primary to-blue-500"
                        >
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 5: Review */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="border-primary/10">
                    <CardHeader>
                      <CardTitle>Review Your Ad</CardTitle>
                      <CardDescription>
                        Make sure everything looks good before posting
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Image Preview */}
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {imagePreviews.map((preview, i) => (
                          <div
                            key={i}
                            className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-border flex-shrink-0"
                          >
                            <img
                              src={preview}
                              alt={`Preview ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {i === 0 && (
                              <Badge className="absolute top-1 left-1 text-xs bg-primary">Cover</Badge>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Details Summary */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <h3 className="font-semibold text-lg mb-2">{formData.title || 'No title'}</h3>
                          <p className="text-3xl font-bold text-primary">
                            Rs. {parseInt(formData.price || '0').toLocaleString()}
                            {formData.negotiable && (
                              <Badge variant="secondary" className="ml-2 text-xs">Negotiable</Badge>
                            )}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-secondary/50">
                            <p className="text-xs text-muted-foreground">Category</p>
                            <p className="font-medium">{selectedCategory?.label || formData.category}</p>
                            {formData.subCategory && (
                              <p className="text-sm text-muted-foreground">{formData.subCategory}</p>
                            )}
                          </div>
                          <div className="p-3 rounded-lg bg-secondary/50">
                            <p className="text-xs text-muted-foreground">Condition</p>
                            <p className="font-medium capitalize">{formData.condition}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-secondary/50">
                            <p className="text-xs text-muted-foreground">Location</p>
                            <p className="font-medium">{formData.city}</p>
                            {formData.location && (
                              <p className="text-sm text-muted-foreground">{formData.location}</p>
                            )}
                          </div>
                          <div className="p-3 rounded-lg bg-secondary/50">
                            <p className="text-xs text-muted-foreground">Payment Method</p>
                            <p className="font-medium capitalize">
                              {paymentMethods.find(m => m.value === formData.paymentMethod)?.label || 'Not set'}
                            </p>
                          </div>
                        </div>

                        {formData.description && (
                          <div className="p-3 rounded-lg bg-secondary/50">
                            <p className="text-xs text-muted-foreground mb-1">Description</p>
                            <p className="text-sm">{formData.description}</p>
                          </div>
                        )}

                        {formData.accountNumber && formData.paymentMethod !== 'cod' && (
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <p className="text-xs text-muted-foreground mb-1">Payment Details</p>
                            <p className="font-medium">{formData.accountTitle}</p>
                            <p className="text-sm font-mono">{formData.accountNumber}</p>
                            {formData.bankName && (
                              <p className="text-sm text-muted-foreground">{formData.bankName}</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setCurrentStep(4)}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Post Ad
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
