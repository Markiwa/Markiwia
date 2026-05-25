'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const faqs = [
  { q: 'How do I post a free ad?', a: 'Click "Sell Now" in the header, fill in your product details, upload photos, and click Post Ad. Your listing goes live after admin approval.' },
  { q: 'Is Markiwia free to use?', a: 'Yes! Posting basic ads is completely free. We offer premium featured placements for sellers who want more visibility.' },
  { q: 'How do I contact a seller?', a: 'Click the "Chat Now" or "Call Seller" button on any product listing page to get in touch directly.' },
  { q: 'What payment methods are accepted?', a: 'We support Cash on Delivery, JazzCash, EasyPaisa, Bank Transfer, and more depending on the seller.' },
  { q: 'How do I report a fake listing?', a: 'Open the listing and click the "Report" button, or visit our Report Issue page for more options.' },
  { q: 'Can I sell in any city?', a: 'Yes, Markiwia operates nationwide across all major cities in Pakistan.' },
  { q: 'How long does listing approval take?', a: 'Most listings are reviewed within 24 hours. You will receive a notification once approved.' },
  { q: 'How do I edit or delete my listing?', a: 'Go to My Listings in your dashboard. You can edit, pause, or delete any of your active listings.' },
];

export default function FAQPage() {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="bg-muted/50 border-b border-border py-10">
          <div className="container mx-auto px-4">
            <Button variant="ghost" className="mb-4 -ml-2" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">Everything you need to know about Markiwia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  {open === i ? <ChevronUp className="h-5 w-5 shrink-0 text-primary" /> : <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />}
                </button>
                {open === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
