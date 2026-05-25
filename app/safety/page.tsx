'use client';

import { Shield, AlertTriangle, Users, Lock, Eye, Phone, Flag, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const safetyTips = [
  {
    icon: Users,
    title: 'Meet in Public Places',
    description: 'Always meet buyers or sellers in busy, public locations like shopping malls, police stations, or cafes. Avoid meeting at private residences or isolated areas.',
  },
  {
    icon: Eye,
    title: 'Inspect Before You Pay',
    description: 'Carefully examine products before making payment. Test electronics, check for damages, and verify authenticity. Never pay without inspection.',
  },
  {
    icon: Lock,
    title: 'Protect Your Personal Information',
    description: 'Never share sensitive information like bank passwords, PINs, or OTPs. Markiwia will never ask for your password or financial details.',
  },
  {
    icon: Phone,
    title: 'Verify Seller Identity',
    description: 'Check seller ratings, reviews, and profile verification status. Be cautious of newly created accounts with no history.',
  },
  {
    icon: AlertTriangle,
    title: 'Beware of Too-Good-To-Be-True Deals',
    description: 'If a price seems unrealistically low, it probably is. Scammers often lure victims with attractive prices on high-demand items.',
  },
  {
    icon: Flag,
    title: 'Report Suspicious Activity',
    description: 'If you encounter suspicious users or listings, report them immediately. Help keep our community safe by flagging potential scams.',
  },
];

const dosList = [
  'Verify product condition in person before payment',
  'Use cash or secure payment methods',
  'Keep records of all communications',
  'Trust your instincts - if something feels wrong, walk away',
  'Check seller reviews and ratings',
  'Meet during daylight hours',
  'Bring a friend or family member when meeting',
];

const dontsList = [
  'Share personal banking information',
  'Send advance payments without seeing the product',
  'Click suspicious links sent via chat',
  'Meet at isolated or unfamiliar locations',
  'Share OTPs or verification codes',
  'Trust unverified payment receipts',
  'Ignore red flags in communication',
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Safety Tips
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your safety is our priority. Follow these guidelines to ensure secure and trustworthy transactions on Markiwia.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Safety Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {safetyTips.map((tip, index) => (
              <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <tip.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dos and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Do&apos;s
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {dosList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Don&apos;ts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {dontsList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Contact */}
          <Card className="mt-12 border-primary/20 bg-primary/5">
            <CardContent className="py-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you&apos;ve been a victim of fraud or encountered suspicious activity, contact us immediately.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:03004538048" className="text-primary hover:underline font-medium">
                  Call: 0300-4538048
                </a>
                <span className="text-muted-foreground">|</span>
                <a href="mailto:alifarazmalik07@gmail.com" className="text-primary hover:underline font-medium">
                  Email: alifarazmalik07@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
