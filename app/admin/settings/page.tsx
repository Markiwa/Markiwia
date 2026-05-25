"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, MessageSquare, 
  Settings, Bell, Search, ChevronDown, Save, ArrowLeft,
  Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube,
  MessageCircle, AlertCircle, Flag, BarChart3, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Package, label: 'Listings', href: '/admin/listings' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
  { icon: Flag, label: 'Reports', href: '/admin/reports' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Settings, label: 'Settings', href: '/admin/settings', active: true },
];

export default function AdminSettingsPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { footerSettings, updateFooterSettings } = useAppStore();
  
  const [formData, setFormData] = useState({
    phone1: '',
    phone2: '',
    phone3: '',
    whatsapp1: '',
    whatsapp2: '',
    whatsapp3: '',
    whatsapp4: '',
    email: '',
    location: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    importantNotice: '',
  });
  
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (footerSettings) {
      setFormData({
        phone1: footerSettings.phone1 || '',
        phone2: footerSettings.phone2 || '',
        phone3: footerSettings.phone3 || '',
        whatsapp1: footerSettings.whatsapp1 || '',
        whatsapp2: footerSettings.whatsapp2 || '',
        whatsapp3: footerSettings.whatsapp3 || '',
        whatsapp4: footerSettings.whatsapp4 || '',
        email: footerSettings.email || '',
        location: footerSettings.location || '',
        facebook: footerSettings.facebook || '',
        twitter: footerSettings.twitter || '',
        instagram: footerSettings.instagram || '',
        youtube: footerSettings.youtube || '',
        importantNotice: footerSettings.importantNotice || '',
      });
    }
  }, [footerSettings]);

  useEffect(() => {
    if (!loading && (!userProfile || !userProfile.isAdmin)) {
      router.push('/admin/login');
    }
  }, [userProfile, loading, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      updateFooterSettings(formData);
      toast({
        title: "Settings Saved",
        description: "Footer settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!userProfile?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background hidden lg:block">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-xl">Markiwia</span>
          <Badge variant="secondary" className="ml-auto text-xs">Admin</Badge>
        </div>
        
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur">
          <div className="flex h-full items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Footer & Contact Settings</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  5
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">Admin</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <main className="p-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Phone Numbers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Phone Numbers
                </CardTitle>
                <CardDescription>
                  Contact phone numbers displayed in the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone1">Phone Number 1</Label>
                    <Input
                      id="phone1"
                      value={formData.phone1}
                      onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                      placeholder="03004538048"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone2">Phone Number 2</Label>
                    <Input
                      id="phone2"
                      value={formData.phone2}
                      onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                      placeholder="03004538058"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone3">Phone Number 3</Label>
                    <Input
                      id="phone3"
                      value={formData.phone3}
                      onChange={(e) => setFormData({ ...formData, phone3: e.target.value })}
                      placeholder="03214538058"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Numbers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  WhatsApp Numbers
                </CardTitle>
                <CardDescription>
                  WhatsApp contact numbers for customer support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp1">WhatsApp 1</Label>
                    <Input
                      id="whatsapp1"
                      value={formData.whatsapp1}
                      onChange={(e) => setFormData({ ...formData, whatsapp1: e.target.value })}
                      placeholder="03004538048"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp2">WhatsApp 2</Label>
                    <Input
                      id="whatsapp2"
                      value={formData.whatsapp2}
                      onChange={(e) => setFormData({ ...formData, whatsapp2: e.target.value })}
                      placeholder="03004538058"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp3">WhatsApp 3</Label>
                    <Input
                      id="whatsapp3"
                      value={formData.whatsapp3}
                      onChange={(e) => setFormData({ ...formData, whatsapp3: e.target.value })}
                      placeholder="03214538058"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp4">WhatsApp 4</Label>
                    <Input
                      id="whatsapp4"
                      value={formData.whatsapp4}
                      onChange={(e) => setFormData({ ...formData, whatsapp4: e.target.value })}
                      placeholder="03107306812"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email & Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Email & Location
                </CardTitle>
                <CardDescription>
                  Business email and physical address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alifarazmalik07@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Business Address</Label>
                  <Textarea
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Batth Village, Manga Mandi, Lahore, Pakistan"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  Social Media Links
                </CardTitle>
                <CardDescription>
                  Links to your social media profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                      placeholder="https://facebook.com/markiwia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-sky-500" />
                      Twitter / X
                    </Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      placeholder="https://twitter.com/markiwia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-500" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="https://instagram.com/markiwia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-500" />
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      value={formData.youtube}
                      onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                      placeholder="https://youtube.com/markiwia"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Important Notice
                </CardTitle>
                <CardDescription>
                  Display an important message/announcement on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="importantNotice">Notice Message</Label>
                  <Textarea
                    id="importantNotice"
                    value={formData.importantNotice}
                    onChange={(e) => setFormData({ ...formData, importantNotice: e.target.value })}
                    placeholder="Enter an important notice or announcement..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => router.push('/admin')}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="min-w-32">
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
