'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const footerLinks = {
  marketplace: [
    { name: 'All Categories', href: '/categories' },
    { name: 'Featured Ads', href: '/featured' },
    { name: 'Trending', href: '/trending' },
    { name: 'New Arrivals', href: '/new' },
    { name: 'Flash Sale', href: '/sale' },
  ],
  account: [
    { name: 'My Account', href: '/profile' },
    { name: 'My Listings', href: '/my-listings' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Messages', href: '/chat' },
    { name: 'Settings', href: '/settings' },
  ],
  help: [
    { name: 'Help Center', href: '/help' },
    { name: 'Safety Tips', href: '/safety' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Report Issue', href: '/report' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Posting Rules', href: '/rules' },
  ],
};

export function Footer() {
  const { footerSettings } = useAppStore();

  const formatWhatsAppLink = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    const formattedNumber = cleanNumber.startsWith('0') ? '92' + cleanNumber.slice(1) : cleanNumber;
    return `https://wa.me/${formattedNumber}`;
  };

  return (
    <footer className="bg-card border-t border-primary/10 mt-auto">
      {/* Important Notice Banner */}
      {footerSettings.importantNotice && (
        <div className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-accent/10 border-b border-primary/10">
          <div className="container mx-auto px-4 py-3">
            <p className="text-sm text-center text-primary font-medium">
              {footerSettings.importantNotice}
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent">
              Markiwia
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {"Pakistan's most advanced marketplace. Buy and sell everything with trust and ease."}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href={footerSettings.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={footerSettings.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={footerSettings.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={footerSettings.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Marketplace</h3>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Account</h3>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp */}
          <div>
            <h3 className="font-semibold mb-4 text-green-600 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={formatWhatsAppLink(footerSettings.whatsapp1)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {footerSettings.whatsapp1}
                </a>
              </li>
              <li>
                <a
                  href={formatWhatsAppLink(footerSettings.whatsapp2)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {footerSettings.whatsapp2}
                </a>
              </li>
              <li>
                <a
                  href={formatWhatsAppLink(footerSettings.whatsapp3)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {footerSettings.whatsapp3}
                </a>
              </li>
              <li>
                <a
                  href={formatWhatsAppLink(footerSettings.whatsapp4)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {footerSettings.whatsapp4}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${footerSettings.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span className="break-all">{footerSettings.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerSettings.phone1}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {footerSettings.phone1}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerSettings.phone2}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {footerSettings.phone2}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerSettings.phone3}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {footerSettings.phone3}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(footerSettings.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {footerSettings.location}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Markiwia. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
