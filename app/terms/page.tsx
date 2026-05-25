'use client';

import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">Last updated: January 2026</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="border-primary/10">
            <CardContent className="prose prose-sm dark:prose-invert max-w-none py-8">
              <h2 className="text-xl font-semibold mb-4 text-primary">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing and using Markiwia, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">2. User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                To use certain features of Markiwia, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and truthful information</li>
                <li>Updating your information to keep it current</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-primary">3. Prohibited Activities</h2>
              <p className="text-muted-foreground mb-4">Users are prohibited from:</p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Posting illegal, fraudulent, or misleading content</li>
                <li>Selling counterfeit, stolen, or prohibited items</li>
                <li>Harassing or threatening other users</li>
                <li>Attempting to manipulate or exploit the platform</li>
                <li>Creating multiple accounts for fraudulent purposes</li>
                <li>Circumventing security measures</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-primary">4. Listing Guidelines</h2>
              <p className="text-muted-foreground mb-4">All listings must:</p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Accurately describe the item being sold</li>
                <li>Include clear, original photos</li>
                <li>Display honest pricing</li>
                <li>Be placed in appropriate categories</li>
                <li>Comply with all applicable laws</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-primary">5. Transactions</h2>
              <p className="text-muted-foreground mb-6">
                Markiwia facilitates connections between buyers and sellers but is not a party to transactions. Users are responsible for the successful completion of their transactions. We recommend meeting in safe, public locations.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">6. Fees and Payments</h2>
              <p className="text-muted-foreground mb-6">
                Basic listings on Markiwia are free. Premium features and promoted listings may incur fees as specified on the platform. All fees are non-refundable unless otherwise stated.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">7. Intellectual Property</h2>
              <p className="text-muted-foreground mb-6">
                All content on Markiwia, including logos, designs, and software, is owned by Markiwia or its licensors. Users retain ownership of content they post but grant Markiwia a license to use such content.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">
                Markiwia is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from your use of the platform, transactions between users, or third-party actions.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">9. Termination</h2>
              <p className="text-muted-foreground mb-6">
                We reserve the right to suspend or terminate accounts that violate these terms. Users may also delete their accounts at any time through account settings.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-primary">10. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, contact us at:
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
