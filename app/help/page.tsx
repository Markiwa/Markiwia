'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/layout/page-header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Phone, Mail, BookOpen, ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

const helpTopics = [
  { icon: BookOpen, title: 'Getting Started', description: 'Learn how to buy and sell on Markiwia', href: '/faq' },
  { icon: ShieldCheck, title: 'Safety Tips', description: 'Stay safe while trading online', href: '/safety' },
  { icon: AlertTriangle, title: 'Report an Issue', description: 'Report scams, fake listings or bugs', href: '/report' },
  { icon: MessageCircle, title: 'Contact Support', description: 'Get in touch with our support team', href: '/contact' },
];

export default function HelpPage() {
  const router = useRouter();
  const { footerSettings } = useAppStore();

  const handlePhoneCall = () => {
    window.location.href = `tel:${footerSettings.phone1}`;
  };

  const handleEmailSupport = () => {
    window.location.href = `mailto:${footerSettings.email}?subject=Help Request - Markiwia`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader title="Help Center" subtitle="How can we help you today?" />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {helpTopics.map((topic) => (
              <Link key={topic.title} href={topic.href}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <topic.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Card className="max-w-xl mx-auto text-center">
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Our support team is available to assist you.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="w-full sm:w-auto" onClick={handlePhoneCall}>
                  <Phone className="mr-2 h-4 w-4" />
                  {footerSettings.phone1}
                </Button>
                <Button className="w-full sm:w-auto" onClick={handleEmailSupport}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
}
