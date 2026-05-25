"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// FIXED ADMIN CREDENTIALS - Change these to your own
const ADMIN_EMAIL = "admin@markiwia.com";

// SECRET RECOVERY CODE - Sirf aapko pata hoga
// Agar password bhool jao to ye code use karo
const SECRET_RECOVERY_CODE = "MARKIWIA-ADMIN-2024-RESET";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Recovery Mode
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if email is admin email
      if (email !== ADMIN_EMAIL) {
        setError('Access denied. Only admin can login here.');
        setLoading(false);
        return;
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify admin status in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (userDoc.exists() && userDoc.data().isAdmin) {
        router.push('/admin');
      } else {
        setError('Access denied. You are not an admin.');
        await auth.signOut();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('user-not-found')) {
          setError('Admin account not found. Please create admin account first.');
        } else if (err.message.includes('wrong-password')) {
          setError('Incorrect password. Use recovery if forgotten.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRecovery = () => {
    if (recoveryCode === SECRET_RECOVERY_CODE) {
      setRecoverySuccess(true);
      setError('');
    } else {
      setError('Invalid recovery code. Access denied.');
      setRecoverySuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background flex items-center justify-center p-4">
      {/* Background Pattern */}
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
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Secure login for Markiwia administrators only
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!showRecovery ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@markiwia.com"
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
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Login as Admin
                    </span>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowRecovery(true)}
                    className="text-sm text-muted-foreground hover:text-primary underline"
                  >
                    Forgot Password? Use Recovery
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {recoverySuccess ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <KeyRound className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                      Recovery Successful!
                    </h3>
                    <div className="bg-muted p-4 rounded-lg text-left space-y-2">
                      <p className="text-sm font-medium">Admin Credentials:</p>
                      <div className="space-y-1">
                        <p className="text-sm"><span className="text-muted-foreground">Email:</span> {ADMIN_EMAIL}</p>
                        <p className="text-sm"><span className="text-muted-foreground">Password Reset:</span></p>
                        <p className="text-xs text-muted-foreground">
                          Go to Firebase Console &rarr; Authentication &rarr; Users &rarr; 
                          Find admin@markiwia.com &rarr; Reset Password
                        </p>
                      </div>
                    </div>
                    <Button onClick={() => { setShowRecovery(false); setRecoverySuccess(false); }} className="w-full">
                      Back to Login
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <KeyRound className="w-12 h-12 mx-auto text-primary mb-2" />
                      <h3 className="font-semibold">Secret Recovery</h3>
                      <p className="text-sm text-muted-foreground">
                        Enter your secret recovery code
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recovery">Recovery Code</Label>
                      <Input
                        id="recovery"
                        type="password"
                        placeholder="Enter secret code"
                        value={recoveryCode}
                        onChange={(e) => setRecoveryCode(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowRecovery(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleRecovery} className="flex-1">
                        Verify Code
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="pt-4 border-t text-center">
              <p className="text-xs text-muted-foreground">
                This page is for authorized administrators only.
                <br />
                Unauthorized access attempts are logged.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
