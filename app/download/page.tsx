'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Download,
  Smartphone,
  Monitor,
  Globe,
  CheckCircle,
  Zap,
  Shield,
  Bell,
  WifiOff,
  Share2,
  QrCode,
  Apple,
  Chrome,
} from 'lucide-react';

const features = [
  { icon: Zap, title: 'Fast & Lightweight', description: 'Only 2MB download size' },
  { icon: WifiOff, title: 'Works Offline', description: 'Browse even without internet' },
  { icon: Bell, title: 'Push Notifications', description: 'Never miss a message' },
  { icon: Shield, title: 'Secure', description: 'Your data is protected' },
];

const androidSteps = [
  'Click the "Download APK" button below',
  'Open the downloaded file',
  'If prompted, allow installation from unknown sources',
  'Tap "Install" to complete installation',
  'Open Markiwia from your home screen',
];

const iosSteps = [
  'Open Safari browser on your iPhone/iPad',
  'Visit markiwia.vercel.app',
  'Tap the Share button (square with arrow)',
  'Scroll down and tap "Add to Home Screen"',
  'Tap "Add" in the top right corner',
];

const desktopSteps = [
  'Open Chrome or Edge browser',
  'Visit markiwia.vercel.app',
  'Click the install icon in the address bar',
  'Or click Menu > Install Markiwia',
  'The app will install on your desktop',
];

export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState('android');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary">
                <Download className="h-3 w-3 mr-1" />
                Free Download
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get the Markiwia App
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Download our app for the best experience. Buy and sell on the go with 
                faster performance and exclusive features.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" className="magnetic bg-gradient-to-r from-primary to-accent">
                  <Download className="mr-2 h-5 w-5" />
                  Download APK
                </Button>
                <Button size="lg" variant="outline" className="magnetic">
                  <Globe className="mr-2 h-5 w-5" />
                  Use Web App
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Installation Guide
              </h2>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="android" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Android
                  </TabsTrigger>
                  <TabsTrigger value="ios" className="flex items-center gap-2">
                    <Apple className="h-4 w-4" />
                    iOS
                  </TabsTrigger>
                  <TabsTrigger value="desktop" className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Desktop
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="android">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Android Installation
                      </CardTitle>
                      <CardDescription>
                        Download the APK file directly - no Play Store needed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4">
                        {androidSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                              {i + 1}
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                      
                      <Button className="w-full mt-6 bg-gradient-to-r from-primary to-accent">
                        <Download className="mr-2 h-4 w-4" />
                        Download APK (2MB)
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ios">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Apple className="h-5 w-5" />
                        iOS Installation (PWA)
                      </CardTitle>
                      <CardDescription>
                        Add to Home Screen for app-like experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4">
                        {iosSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                              {i + 1}
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                      
                      <div className="mt-6 p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Note:</strong> iOS does not allow direct APK installation. 
                          The PWA provides the same features and works just like a native app.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="desktop">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Chrome className="h-5 w-5" />
                        Desktop Installation (PWA)
                      </CardTitle>
                      <CardDescription>
                        Install as a desktop app in Chrome or Edge
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4">
                        {desktopSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                              {i + 1}
                            </div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Alternative Download Options */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Alternative Download Options
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <QrCode className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Scan QR Code</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Scan with your phone camera to download
                  </p>
                  <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">QR Code</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Share2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Share Link</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send download link to your friends
                  </p>
                  <Button variant="outline" className="w-full">
                    Copy Link
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">APKPure / APKMirror</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download from trusted APK sites
                  </p>
                  <Button variant="outline" className="w-full">
                    View Options
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* PWA Benefits */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Why Use Our App?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Get exclusive features, faster performance, and a better experience with the Markiwia app.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Instant Notifications', 'Offline Access', 'Faster Loading', 'Less Data Usage'].map((item) => (
                <Badge key={item} variant="secondary" className="px-4 py-2 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
