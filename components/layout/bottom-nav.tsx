'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Sell', href: '/sell', icon: Plus, special: true },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Profile', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { wishlist } = useAppStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          if (item.special) {
            return (
              <Link key={item.name} href={item.href} className="relative -mt-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg"
                >
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </motion.div>
              </Link>
            );
          }
          
          return (
            <Link key={item.name} href={item.href} className="relative">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.name === 'Wishlist' && wishlist.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs">
                      {wishlist.length}
                    </Badge>
                  )}
                </div>
                <span className="text-xs">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
