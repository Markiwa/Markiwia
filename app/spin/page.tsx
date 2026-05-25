"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, RotateCcw, Clock, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { BottomNav } from '@/components/layout/bottom-nav';

const prizes = [
  { id: 1, label: '5% OFF', color: '#FF6B6B', textColor: '#fff' },
  { id: 2, label: '10% OFF', color: '#4ECDC4', textColor: '#fff' },
  { id: 3, label: 'Free Delivery', color: '#45B7D1', textColor: '#fff' },
  { id: 4, label: 'Try Again', color: '#96CEB4', textColor: '#fff' },
  { id: 5, label: '15% OFF', color: '#FFEAA7', textColor: '#333' },
  { id: 6, label: '50 XP', color: '#DDA0DD', textColor: '#fff' },
  { id: 7, label: '20% OFF', color: '#98D8C8', textColor: '#333' },
  { id: 8, label: 'Featured Ad', color: '#F7DC6F', textColor: '#333' },
];

const recentWinners = [
  { name: 'Ali K.', prize: '15% OFF', time: '2 min ago' },
  { name: 'Fatima A.', prize: 'Free Delivery', time: '5 min ago' },
  { name: 'Hassan M.', prize: '50 XP', time: '12 min ago' },
  { name: 'Sara B.', prize: '10% OFF', time: '18 min ago' },
];

// LocalStorage key for spin data
const SPIN_STORAGE_KEY = 'markiwia-spin-data';

interface SpinData {
  spinsLeft: number;
  lastSpinDate: string;
  wonPrizes: string[];
}

const getSpinData = (): SpinData => {
  if (typeof window === 'undefined') {
    return { spinsLeft: 1, lastSpinDate: '', wonPrizes: [] };
  }
  
  try {
    const stored = localStorage.getItem(SPIN_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as SpinData;
      const today = new Date().toDateString();
      
      // Reset spins if it's a new day
      if (data.lastSpinDate !== today) {
        return { spinsLeft: 1, lastSpinDate: today, wonPrizes: data.wonPrizes || [] };
      }
      
      return data;
    }
  } catch {
    // Ignore parse errors
  }
  
  return { spinsLeft: 1, lastSpinDate: new Date().toDateString(), wonPrizes: [] };
};

const saveSpinData = (data: SpinData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SPIN_STORAGE_KEY, JSON.stringify(data));
  }
};

export default function SpinPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<typeof prizes[0] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(1);
  const [wonPrizes, setWonPrizes] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Load spin data from localStorage on mount
  useEffect(() => {
    const data = getSpinData();
    setSpinsLeft(data.spinsLeft);
    setWonPrizes(data.wonPrizes);
    setMounted(true);
  }, []);

  // Save to localStorage when spins change
  useEffect(() => {
    if (mounted) {
      saveSpinData({
        spinsLeft,
        lastSpinDate: new Date().toDateString(),
        wonPrizes
      });
    }
  }, [spinsLeft, wonPrizes, mounted]);

  const spin = () => {
    if (isSpinning || spinsLeft <= 0) return;
    
    setIsSpinning(true);
    setShowResult(false);
    setPrize(null);
    
    // Random prize index
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[prizeIndex];
    
    // Calculate rotation
    const segmentAngle = 360 / prizes.length;
    const prizeAngle = segmentAngle * prizeIndex;
    const extraSpins = 5 * 360; // 5 full rotations
    const finalRotation = extraSpins + (360 - prizeAngle) - segmentAngle / 2;
    
    setRotation(rotation + finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setPrize(selectedPrize);
      setShowResult(true);
      setSpinsLeft(prev => prev - 1);
      
      // Add prize to won prizes list
      if (selectedPrize.label !== 'Try Again') {
        setWonPrizes(prev => [...prev, selectedPrize.label]);
        
        // Confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 5000);
  };

  const segmentAngle = 360 / prizes.length;

  // Show loading state while hydrating
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-24 md:pb-8">
          <div className="max-w-lg mx-auto px-4 flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-24 md:pb-8">
        <div className="max-w-lg mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4"
            >
              <Gift className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold">Daily Spin & Win</h1>
            <p className="text-muted-foreground mt-1">Spin the wheel to win amazing prizes!</p>
          </div>

          {/* Spins Left */}
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              {spinsLeft} spin{spinsLeft !== 1 ? 's' : ''} left today
            </Badge>
          </div>

          {/* Wheel Container */}
          <div className="relative w-72 h-72 mx-auto mb-8">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-primary" />
            </div>
            
            {/* Wheel */}
            <motion.div
              ref={wheelRef}
              animate={{ rotate: rotation }}
              transition={{ duration: 5, ease: [0.17, 0.67, 0.12, 0.99] }}
              className="w-full h-full rounded-full border-4 border-primary/20 overflow-hidden relative"
              style={{
                background: `conic-gradient(${prizes.map((p, i) => 
                  `${p.color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`
                ).join(', ')})`
              }}
            >
              {/* Prize Labels */}
              {prizes.map((p, i) => {
                const angle = (i * segmentAngle + segmentAngle / 2) * (Math.PI / 180);
                const x = 50 + 35 * Math.sin(angle);
                const y = 50 - 35 * Math.cos(angle);
                return (
                  <div
                    key={p.id}
                    className="absolute text-xs font-bold"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%, -50%) rotate(${i * segmentAngle + segmentAngle / 2}deg)`,
                      color: p.textColor
                    }}
                  >
                    {p.label}
                  </div>
                );
              })}
              
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </motion.div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spin}
            disabled={isSpinning || spinsLeft <= 0}
            className="w-full h-14 text-lg"
            size="lg"
          >
            {isSpinning ? (
              <>
                <RotateCcw className="w-5 h-5 mr-2 animate-spin" />
                Spinning...
              </>
            ) : spinsLeft <= 0 ? (
              <>
                <Clock className="w-5 h-5 mr-2" />
                Come back tomorrow!
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                SPIN NOW!
              </>
            )}
          </Button>

          {/* Won Prizes */}
          {wonPrizes.length > 0 && (
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Your Won Prizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {wonPrizes.map((prize, idx) => (
                    <Badge key={idx} variant="secondary">{prize}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result Modal */}
          <AnimatePresence>
            {showResult && prize && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                onClick={() => setShowResult(false)}
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="bg-background rounded-2xl p-8 max-w-sm w-full text-center"
                  onClick={e => e.stopPropagation()}
                >
                  {prize.label === 'Try Again' ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <RotateCcw className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">Better luck next time!</h2>
                      <p className="text-muted-foreground">Come back tomorrow for another spin</p>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4"
                      >
                        <Trophy className="w-10 h-10 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                      <p className="text-muted-foreground mb-4">You won:</p>
                      <div 
                        className="inline-block px-6 py-3 rounded-full text-xl font-bold"
                        style={{ backgroundColor: prize.color, color: prize.textColor }}
                      >
                        {prize.label}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Prize has been added to your account
                      </p>
                    </>
                  )}
                  <Button className="mt-6" onClick={() => setShowResult(false)}>
                    Continue
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Winners */}
          <Card className="mt-8">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Recent Winners
              </h3>
              <div className="space-y-3">
                {recentWinners.map((winner, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{winner.name}</span>
                    <Badge variant="secondary">{winner.prize}</Badge>
                    <span className="text-xs text-muted-foreground">{winner.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
