import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDcPvydMkL_EkzXPNUdxP_3Tbtv3-pQZ8k",
  authDomain: "markiwia-137cb.firebaseapp.com",
  databaseURL: "https://markiwia-137cb-default-rtdb.firebaseio.com",
  projectId: "markiwia-137cb",
  storageBucket: "markiwia-137cb.firebasestorage.app",
  messagingSenderId: "197509394179",
  appId: "1:197509394179:web:6d862478f3200209454336"
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Firestore Database
export const db = getFirestore(app);

// Realtime Database
export const realtimeDb = getDatabase(app);

// Storage
export const storage = getStorage(app);

export default app;
