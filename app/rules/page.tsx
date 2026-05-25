'use client';

import { ScrollText, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const allowedItems = [
  'Electronics (phones, laptops, cameras)',
  'Vehicles (cars, bikes, auto parts)',
  'Property (houses, apartments, land)',
  'Furniture and home appliances',
  'Fashion and clothing',
  'Books and educational materials',
  'Sports and fitness equipment',
  'Baby and kids items',
  'Musical instruments',
  'Art and collectibles',
  'Services (tutoring, repairs, freelance)',
  'Jobs and employment opportunities',
];

const prohibitedItems = [
  'Weapons, firearms, and ammunition',
  'Drugs and illegal substances',
  'Counterfeit or stolen goods',
  'Adult content and services',
  'Endangered animal products',
  'Hazardous materials',
  'Government-issued IDs and documents',
  'Hacking tools and services',
  'Tobacco and alcohol',
  'Gambling services',
  'Multi-level marketing schemes',
  'Anything illegal under Pakistani law',
];

const postingRules = [
  {
    title: 'Accurate Descriptions',
    description: 'Provide honest and detailed descriptions of your items. Include condition, defects, and specifications.',
  },
  {
    title: 'Original Photos',
    description: 'Use your own photos showing the actual item. Stock photos or images from the internet are not allowed.',
  },
  {
    title: 'Correct Category',
    description: 'List your item in the most appropriate category. Miscategorized listings may be removed.',
  },
  {
    title: 'Fair Pricing',
    description: 'Set reasonable prices based on market value. Misleading prices to attract clicks are prohibited.',
  },
  {
    title: 'One Item Per Listing',
    description: 'Create separate listings for different items. Bundle deals should be clearly stated.',
  },
  {
    title: 'No Duplicate Listings',
    description: 'Do not post the same item multiple times. Repost only after your listing expires.',
  },
  {
    title: 'Contact Information',
    description: 'Use the Markiwia messaging system. Sharing external contact info in descriptions is discouraged.',
  },
  {
    title: 'Respectful Communication',
    description: 'Treat all users with respect. Harassment or abusive language will result in account suspension.',
  },
];

export default function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <ScrollText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Posting Rules
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these guidelines to ensure your listings reach the right audience and maintain our community standards.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Posting Rules */}
          <h2 className="text-2xl font-bold mb-6 text-center">Listing Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {postingRules.map((rule, index) => (
              <Card key={index} className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                      {index + 1}
                    </span>
                    {rule.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{rule.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Allowed and Prohibited */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Allowed Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {allowedItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <X className="h-5 w-5" />
                  Prohibited Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prohibitedItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Warning */}
          <Card className="mt-12 border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="py-6">
              <p className="text-center text-sm">
                <strong className="text-yellow-600">Warning:</strong> Violation of these rules may result in listing removal, account suspension, or permanent ban. Repeated violations will be reported to authorities if necessary.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
