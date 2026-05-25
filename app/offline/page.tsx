"use client";

import Link from 'next/link';
import { WifiOff, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-12 h-12 text-muted-foreground" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">You are offline</h1>
        <p className="text-muted-foreground mb-6">
          Please check your internet connection and try again. Some features may be available offline.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-8">
          Markiwia works best with an internet connection
        </p>
      </div>
    </div>
  );
}
