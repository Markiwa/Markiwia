'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Search,
  Menu,
  X,
  ShoppingCart,
  Heart,
  Bell,
  User,
  Settings,
  LogOut,
  Plus,
  Sun,
  Moon,
  History,
  TrendingUp,
  MessageCircle,
  LayoutDashboard,
  Download,
  Shield,
  Cpu,
  Car,
  Home,
  Shirt,
  Flower2,
  Briefcase,
  Wrench,
  Baby,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Sofa,
  Dumbbell,
  BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  { name: 'Electronics', href: '/categories?cat=electronics', Icon: Cpu, color: 'from-blue-500 to-cyan-400' },
  { name: 'Vehicles', href: '/categories?cat=vehicles', Icon: Car, color: 'from-red-500 to-orange-400' },
  { name: 'Property', href: '/categories?cat=property', Icon: Home, color: 'from-green-500 to-emerald-400' },
  { name: 'Fashion', href: '/categories?cat=fashion', Icon: Shirt, color: 'from-pink-500 to-rose-400' },
  { name: 'Home & Garden', href: '/categories?cat=home-garden', Icon: Flower2, color: 'from-amber-500 to-yellow-400' },
  { name: 'Jobs', href: '/categories?cat=jobs', Icon: Briefcase, color: 'from-indigo-500 to-violet-400' },
  { name: 'Services', href: '/categories?cat=services', Icon: Wrench, color: 'from-teal-500 to-cyan-400' },
  { name: 'Kids', href: '/categories?cat=kids', Icon: Baby, color: 'from-fuchsia-500 to-pink-400' },
  { name: 'Mobiles', href: '/categories?cat=mobiles', Icon: Smartphone, color: 'from-purple-500 to-indigo-400' },
  { name: 'Furniture', href: '/categories?cat=furniture', Icon: Sofa, color: 'from-orange-500 to-amber-400' },
  { name: 'Sports', href: '/categories?cat=sports', Icon: Dumbbell, color: 'from-lime-500 to-green-400' },
  { name: 'Books', href: '/categories?cat=books', Icon: BookOpen, color: 'from-sky-500 to-blue-400' },
];

const trendingSearches = ['iPhone 15', 'Honda Civic', 'Laptop', 'Apartment Lahore', 'Air Conditioner'];

// Specific pages that should NOT show the main header
const pagesWithOwnHeader = ['/dashboard', '/admin', '/sell', '/profile', '/settings', '/my-listings', '/categories', '/help', '/contact', '/faq', '/safety', '/report'];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cart, wishlist, notifications, theme, toggleTheme, recentSearches, addRecentSearch, clearRecentSearches } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Hide main header on certain pages
  const shouldHideHeader = pagesWithOwnHeader.some(page => pathname?.startsWith(page));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 10);
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Check slider scroll position
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      return () => slider.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchSuggestions(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success('Signed out successfully');
      router.push('/');
    } catch {
      toast.error('Failed to sign out');
    }
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Don't render on pages with their own header
  if (shouldHideHeader) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'glass-header shadow-lg' : 'bg-background/95 backdrop-blur-sm'}`}
    >
      {/* Shine overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 shine-effect opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-primary/10">
          <div className="flex items-center gap-4">
            <Link href="/download" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Download className="h-3 w-3" />
              Download App
            </Link>
            <span className="text-primary/30">|</span>
            <Link href="/sell" className="text-muted-foreground hover:text-primary transition-colors">
              Start Selling
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
              Help &amp; Support
            </Link>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              {theme === 'light' ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
        </div>

        {/* Main nav row */}
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent"
            >
              Markiwia
            </motion.div>
          </Link>

          {/* Desktop Search */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search for anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="pl-10 pr-4 py-6 rounded-full border-2 border-primary/20 focus:border-primary bg-background/80 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 shadow-lg"
                >
                  Search
                </Button>
              </div>
            </form>

            <AnimatePresence>
              {showSearchSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-primary/10 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  {recentSearches.length > 0 && (
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <History className="h-4 w-4 text-primary" />
                          Recent Searches
                        </span>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((query, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSearchQuery(query);
                              router.push(`/search?q=${encodeURIComponent(query)}`);
                              setShowSearchSuggestions(false);
                            }}
                            className="px-3 py-1 text-sm bg-secondary rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {query}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-sm font-medium flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Trending Searches
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((query, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSearchQuery(query);
                            addRecentSearch(query);
                            router.push(`/search?q=${encodeURIComponent(query)}`);
                            setShowSearchSuggestions(false);
                          }}
                          className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative hover:text-primary">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-primary to-blue-500">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-primary to-blue-500">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {user && (
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="relative hover:text-primary">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {user && (
              <Link href="/chat">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full ring-2 ring-primary/20 hover:ring-primary/40">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-blue-500 text-white">{user.displayName?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.displayName}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                      <Badge variant="secondary" className="w-fit mt-1 text-xs bg-primary/10 text-primary">
                        {user.level?.toUpperCase() || 'BRONZE'}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-listings" className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      My Listings
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 shadow-lg">Sign In</Button>
              </Link>
            )}

            <Link href="/sell" className="hidden md:block">
              <Button className="bg-gradient-to-r from-primary via-blue-500 to-accent hover:opacity-90 shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Sell Now
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/sell">
                    <Button className="w-full bg-gradient-to-r from-primary via-blue-500 to-accent">
                      <Plus className="mr-2 h-4 w-4" />
                      Sell Now
                    </Button>
                  </Link>
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2">
                      Categories
                    </h3>
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                          <cat.Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4">
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors w-full"
                    >
                      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                    <Link
                      href="/download"
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download App
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden pb-4"
            >
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-5 rounded-full border-primary/20 focus:border-primary"
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category bar with slider - 12 categories */}
        <div className="hidden md:block pb-3 relative">
          <div className="flex items-center gap-2">
            {/* Left scroll button */}
            <button
              onClick={() => scrollSlider('left')}
              className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all ${
                canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ChevronLeft className="h-4 w-4 text-primary" />
            </button>
            
            {/* Categories slider */}
            <div
              ref={sliderRef}
              className="flex items-center gap-1 overflow-x-auto category-slider flex-1"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-primary whitespace-nowrap transition-all duration-300 hover:bg-primary/10 overflow-hidden flex-shrink-0"
                >
                  {/* Shining sweep on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none" />
                  <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <cat.Icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="group-hover:text-primary transition-colors">{cat.name}</span>
                </Link>
              ))}
            </div>
            
            {/* Right scroll button */}
            <button
              onClick={() => scrollSlider('right')}
              className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all ${
                canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <ChevronRight className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
