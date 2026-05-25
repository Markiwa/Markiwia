"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/use-pwa';

export function InstallBanner() {
  const { canInstall, isIOS, isInstalled, isStandalone, install } = usePWA();
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed
    const wasDismissed = localStorage.getItem('pwa-banner-dismissed');
    if (wasDismissed) {
      setDismissed(true);
    }

    // Show banner after 3 seconds if can install
    const timer = setTimeout(() => {
      if ((canInstall || isIOS) && !isInstalled && !isStandalone && !dismissed) {
        setShowBanner(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [canInstall, isIOS, isInstalled, isStandalone, dismissed]);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setShowBanner(false);
    }
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-card border rounded-2xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">Install Markiwia App</h3>
              <p className="text-sm text-muted-foreground">
                {isIOS 
                  ? 'Tap Share then "Add to Home Screen"'
                  : 'Install for faster access and offline support'
                }
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleDismiss}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {isIOS ? (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Share className="w-4 h-4" />
              <span>Tap</span>
              <Share className="w-4 h-4" />
              <span>then</span>
              <Plus className="w-4 h-4" />
              <span>Add to Home Screen</span>
            </div>
          ) : (
            <div className="mt-3 flex gap-2">
              <Button className="flex-1" onClick={handleInstall}>
                <Download className="w-4 h-4 mr-2" />
                Install App
              </Button>
              <Button variant="outline" onClick={handleDismiss}>
                Not Now
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
