"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAppStore, UserProfile } from '@/lib/store';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setUser: setStoreUser } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser.uid);
        setUserProfile(profile);
        setStoreUser(profile);
      } else {
        setUserProfile(null);
        setStoreUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setStoreUser]);

  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
      return null;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return null;
    }
  };

  const createUserProfile = async (user: User, additionalData: Partial<UserProfile> = {}) => {
    const userRef = doc(db, 'users', user.uid);
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      country: additionalData.country || 'Pakistan',
      gender: additionalData.gender || '',
      dateOfBirth: additionalData.dateOfBirth || '',
      isVerified: false,
      isAdmin: false,
      sellerLevel: 'bronze',
      xpPoints: 0,
      followers: 0,
      following: 0,
      createdAt: new Date(),
      ...additionalData
    };
    
    await setDoc(userRef, {
      ...profile,
      createdAt: serverTimestamp()
    });
    
    return profile;
  };

  const signUp = useCallback(async (
    email: string, 
    password: string, 
    displayName: string,
    additionalData: Partial<UserProfile> = {}
  ) => {
    setError(null);
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      const profile = await createUserProfile(result.user, { ...additionalData, displayName });
      setUserProfile(profile);
      setStoreUser(profile);
      return result.user;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setStoreUser]);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = await fetchUserProfile(result.user.uid);
      setUserProfile(profile);
      setStoreUser(profile);
      return result.user;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setStoreUser]);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      let profile = await fetchUserProfile(result.user.uid);
      if (!profile) {
        profile = await createUserProfile(result.user);
      }
      
      setUserProfile(profile);
      setStoreUser(profile);
      return result.user;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Google sign in failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setStoreUser]);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setStoreUser(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    }
  }, [setStoreUser]);

  const updateUserProfile = useCallback(async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, data, { merge: true });
      const updatedProfile = await fetchUserProfile(user.uid);
      setUserProfile(updatedProfile);
      setStoreUser(updatedProfile);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed';
      setError(errorMessage);
      throw err;
    }
  }, [user, setStoreUser]);

  return {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateUserProfile
  };
}
