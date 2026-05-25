'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Flag, AlertTriangle, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { toast } from 'sonner';

const reportTypes = [
  { value: 'scam', label: 'Scam or Fraud' },
  { value: 'fake', label: 'Fake or Misleading Listing' },
  { value: 'prohibited', label: 'Prohibited Item' },
  { value: 'harassment', label: 'Harassment or Abuse' },
  { value: 'spam', label: 'Spam or Repeated Listings' },
  { value: 'bug', label: 'Technical Bug' },
  { value: 'other', label: 'Other Issue' },
];

export default function ReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    listingUrl: '',
    description: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success('Report submitted successfully. We will review it shortly.');
    setFormData({ type: '', listingUrl: '', description: '', email: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-6">
              <Flag className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Report an Issue
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us keep Markiwia safe by reporting suspicious activity, scams, or violations.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Submit a Report
              </CardTitle>
              <CardDescription>
                All reports are reviewed by our team within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Issue Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="listingUrl">Listing URL (optional)</Label>
                  <Input
                    id="listingUrl"
                    placeholder="https://markiwia.com/product/..."
                    value={formData.listingUrl}
                    onChange={(e) => setFormData({ ...formData, listingUrl: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    If reporting a specific listing, paste its URL here.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Your Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide your email if you want to receive updates about this report.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-blue-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mt-8 border-primary/10 bg-primary/5">
            <CardContent className="py-6">
              <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For urgent matters or if you&apos;ve been a victim of fraud, contact us directly:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:03004538048" className="text-primary hover:underline">
                    0300-4538048
                  </a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{' '}
                  <a href="https://wa.me/923004538048" className="text-primary hover:underline">
                    0300-4538048
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:alifarazmalik07@gmail.com" className="text-primary hover:underline">
                    alifarazmalik07@gmail.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
