'use client';

import { Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: January 2026</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="border-primary/10">
            <CardContent className="prose prose-sm dark:prose-invert max-w-none py-8">
              <h2 className="text-xl font-semibold mb-4 text-primary">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We collect information you provide directly:</p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Account information (name, email, phone number)</li>
                <li>Profile information (photo, location, preferences)</li>
                <li>Listing information (product details, images, prices)</li>
                <li>Communication data (messages between users)</li>
                <li>Payment information for premium services</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-primary">2. Automatically Collected Information</h2>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Device information (type, operating system)</li>
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Location data (with your permission)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-primary">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>To provide and improve our services</li>
                <li>To process transactions and send notifications</li>
                <li>To personalize your experience</li>
                <li>To communicate with you about updates and offers</li>
                <li>To ensure safety and security</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-primary">4. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Other users (profile and listing information)</li>
                <li>Service providers who assist our operations</li>
                <li>Law enforcement when required by law</li>
                <li>Business partners for joint services</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-primary">5. Data Security</h2>
              <p className="text-muted-foreground mb-6">
                We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no system is completely secure.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-primary">7. Data Retention</h2>
              <p className="text-muted-foreground mb-6">
                We retain your information as long as your account is active or as needed to provide services. We may retain certain information for legal compliance or legitimate business purposes.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">8. Children&apos;s Privacy</h2>
              <p className="text-muted-foreground mb-6">
                Markiwia is not intended for users under 18 years of age. We do not knowingly collect information from children.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">9. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-6">
                We may update this Privacy Policy from time to time. We will notify you of significant changes through the platform or email.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">10. Contact Us</h2>
              <p className="text-muted-foreground">
                For privacy-related inquiries:
              </p>
              <ul className="list-none text-muted-foreground mt-2 space-y-1">
                <li>Email: alifarazmalik07@gmail.com</li>
                <li>Phone: 0300-4538048</li>
                <li>Address: Batth Village, Manga Mandi, Lahore, Pakistan</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
