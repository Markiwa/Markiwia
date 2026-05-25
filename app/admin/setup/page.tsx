"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, Mail, User, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// SECRET SETUP CODE - Ye admin signup ke liye required hai
const SECRET_SETUP_CODE = "MARKIWIA-SETUP-ADMIN-2024";

export default function AdminSetupPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState(1);
  const [setupCode, setSetupCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('Admin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tempRestricted, setTempRestricted] = useState(false);

  const verifySetupCode = () => {
    if (setupCode === SECRET_SETUP_CODE) {
      setStep(2);
      setError('');
      setTempRestricted(false);
    } else {
      // Temporary restriction - sirf is page load tak
      setTempRestricted(true);
      setError('Invalid secret code. Please try again.');
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      // Create admin user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });

      // Create admin profile in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: email,
        displayName: displayName,
        photoURL: '',
        country: 'Pakistan',
        gender: '',
        dateOfBirth: '',
        isVerified: true,
        isAdmin: true,
        sellerLevel: 'platinum',
        xpPoints: 10000,
        followers: 0,
        following: 0,
        createdAt: serverTimestamp()
      });

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('email-already-in-use')) {
          setError('This email is already registered. Try a different email or login.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Setup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Agar page reload ho to tempRestricted reset ho jaye (automatic hai useState se)

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                Admin Account Created!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your admin account has been created successfully.
              </p>
              <div className="bg-muted p-4 rounded-lg text-left mb-6">
                <p className="text-sm font-medium mb-2">Save these credentials:</p>
                <p className="text-sm"><span className="text-muted-foreground">Email:</span> {email}</p>
                <p className="text-sm"><span className="text-muted-foreground">Name:</span> {displayName}</p>
              </div>
              <Button onClick={() => router.push('/admin/login')} className="w-full">
                Go to Admin Login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-2 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <CardDescription>
              Create or access admin account for Markiwia
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Tab Switcher */}
            <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as 'login' | 'signup'); setStep(1); setError(''); setTempRestricted(false); }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4 mt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an admin account? Login here.
                  </p>
                </div>
                <Button 
                  onClick={() => router.push('/admin/login')} 
                  className="w-full"
                >
                  Go to Admin Login
                </Button>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4 mt-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {tempRestricted ? (
                  <div className="text-center space-y-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Wrong secret code entered. Please refresh the page and try again with the correct code.
                      </AlertDescription>
                    </Alert>
                    <Button onClick={() => { setTempRestricted(false); setSetupCode(''); setError(''); }} variant="outline" className="w-full">
                      Try Again
                    </Button>
                  </div>
                ) : step === 1 ? (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground">
                        Enter the secret setup code to create an admin account
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="setupCode">Secret Code</Label>
                      <Input
                        id="setupCode"
                        type="password"
                        placeholder="Enter secret setup code"
                        value={setupCode}
                        onChange={(e) => setSetupCode(e.target.value)}
                      />
                    </div>

                    <Button onClick={verifySetupCode} className="w-full">
                      Verify Code
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSetup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Admin Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="displayName"
                          type="text"
                          placeholder="Admin"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Admin Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min 8 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={loading}>
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Create Admin
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>
            </Tabs>

            <div className="pt-4 border-t text-center">
              <p className="text-xs text-muted-foreground">
                Admin access requires a valid secret code.
                <br />
                Contact the owner if you need access.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
