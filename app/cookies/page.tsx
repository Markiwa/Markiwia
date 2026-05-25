'use client';

import { Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">Last updated: January 2026</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="border-primary/10">
            <CardContent className="prose prose-sm dark:prose-invert max-w-none py-8">
              <h2 className="text-xl font-semibold mb-4 text-primary">What Are Cookies?</h2>
              <p className="text-muted-foreground mb-6">
                Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences and understanding how you use our platform.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">Types of Cookies We Use</h2>
              
              <h3 className="text-lg font-medium mb-2 text-foreground">Essential Cookies</h3>
              <p className="text-muted-foreground mb-4">
                Required for the website to function properly. They enable basic features like page navigation, secure areas access, and shopping cart functionality.
              </p>

              <h3 className="text-lg font-medium mb-2 text-foreground">Performance Cookies</h3>
              <p className="text-muted-foreground mb-4">
                Help us understand how visitors interact with our website by collecting anonymous information about page visits and navigation patterns.
              </p>

              <h3 className="text-lg font-medium mb-2 text-foreground">Functional Cookies</h3>
              <p className="text-muted-foreground mb-4">
                Remember your preferences such as language, location, and theme settings to provide a personalized experience.
              </p>

              <h3 className="text-lg font-medium mb-2 text-foreground">Targeting Cookies</h3>
              <p className="text-muted-foreground mb-6">
                Used to show relevant advertisements based on your interests and browsing behavior across different websites.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Block all cookies</li>
                <li>Delete existing cookies</li>
                <li>Allow cookies from specific websites</li>
                <li>Set preferences for different types of cookies</li>
              </ul>
              <p className="text-muted-foreground mb-6">
                Note: Blocking essential cookies may affect website functionality.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-6">
                Some cookies are placed by third-party services like analytics providers and advertising networks. These parties have their own privacy policies governing the use of cookies.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">Updates to This Policy</h2>
              <p className="text-muted-foreground mb-6">
                We may update this Cookie Policy periodically. Changes will be posted on this page with an updated revision date.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">Contact Us</h2>
              <p className="text-muted-foreground">
                For questions about our use of cookies:
              </p>
              <ul className="list-none text-muted-foreground mt-2 space-y-1">
                <li>Email: alifarazmalik07@gmail.com</li>
                <li>Phone: 0300-4538048</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
