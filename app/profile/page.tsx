'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useAppStore } from '@/lib/store';
import {
  User,
  Settings,
  Package,
  Heart,
  MessageCircle,
  Star,
  Award,
  Shield,
  Edit,
  ChevronRight,
  Loader2,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const menuItems = [
  { icon: Package, label: 'My Listings', href: '/my-listings', description: 'Manage your ads' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist', description: 'Saved items' },
  { icon: MessageCircle, label: 'Messages', href: '/chat', description: 'Chat with buyers/sellers' },
  { icon: Star, label: 'Reviews', href: '/reviews', description: 'Your ratings & reviews' },
  { icon: Settings, label: 'Settings', href: '/settings', description: 'Account settings' },
];

const levelColors = {
  bronze: 'from-amber-600 to-amber-800',
  silver: 'from-gray-400 to-gray-600',
  gold: 'from-yellow-400 to-yellow-600',
  platinum: 'from-cyan-400 to-cyan-600',
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { wishlist, cart } = useAppStore();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success('Signed out successfully');
      router.push('/');
    } catch {
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const level = user.level || 'bronze';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="overflow-hidden">
              <div className={`h-24 bg-gradient-to-r ${levelColors[level]}`} />
              <CardContent className="relative pt-0">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-12">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback className="text-2xl">
                      {user.displayName?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left pb-4">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <h1 className="text-2xl font-bold">{user.displayName}</h1>
                      {user.isVerified && (
                        <Shield className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <Badge className={`bg-gradient-to-r ${levelColors[level]} text-white`}>
                        <Award className="h-3 w-3 mr-1" />
                        {level.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {user.xp || 0} XP
                      </span>
                    </div>
                  </div>

                  <Link href="/settings/profile">
                    <Button variant="outline" className="mb-4">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.followers || 0}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.following || 0}</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{wishlist.length}</p>
                    <p className="text-sm text-muted-foreground">Wishlist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link href="/sell">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Post New Ad</h3>
                  <p className="text-sm text-muted-foreground">Start selling</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/dashboard">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Star className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold">Dashboard</h3>
                  <p className="text-sm text-muted-foreground">View analytics</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={item.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}

            {/* Admin Link */}
            {user.isAdmin && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
              >
                <Link href="/admin">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/50">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Admin Panel</h3>
                        <p className="text-sm text-muted-foreground">Manage the platform</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )}

            {/* Sign Out */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (menuItems.length + 1) * 0.05 }}
            >
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer border-destructive/50"
                onClick={handleSignOut}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <LogOut className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-destructive">Sign Out</h3>
                    <p className="text-sm text-muted-foreground">Log out of your account</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
