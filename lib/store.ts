import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  subcategory?: string;
  condition: 'new' | 'used' | 'refurbished';
  location: string;
  city?: string;
  sellerId: string;
  sellerName: string;
  sellerPhoto?: string;
  sellerRating?: number;
  createdAt: number | Date;
  updatedAt?: Date;
  views: number;
  likes?: number;
  isFeatured?: boolean;
  featured?: boolean;
  isNegotiable?: boolean;
  negotiable?: boolean;
  stock?: number;
  status?: 'pending' | 'active' | 'approved' | 'sold' | 'rejected';
  deliveryOptions: string[];
  paymentOptions: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Notification {
  id: string;
  type: 'order' | 'message' | 'system' | 'promo';
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
  link?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  country: string;
  gender: string;
  dateOfBirth: string;
  isVerified: boolean;
  isAdmin: boolean;
  sellerLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  xpPoints: number;
  followers: number;
  following: number;
  createdAt: Date;
}

interface AppState {
  // User
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;

  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recent Searches
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  getUnreadCount: () => number;

  // Compare
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;

  // Admin-removed product IDs (admin can remove demo/fake listings)
  removedProductIds: string[];
  adminRemoveProduct: (productId: string) => void;
  adminRestoreProduct: (productId: string) => void;

  // User listings (products posted by users)
  userListings: Product[];
  addUserListing: (product: Product) => void;
  updateUserListing: (productId: string, updates: Partial<Product>) => void;
  removeUserListing: (productId: string) => void;

  // Footer/Contact settings (editable by admin)
  footerSettings: {
    phone1: string;
    phone2: string;
    phone3: string;
    whatsapp1: string;
    whatsapp2: string;
    whatsapp3: string;
    whatsapp4: string;
    email: string;
    location: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    importantNotice: string;
  };
  updateFooterSettings: (settings: Partial<AppState['footerSettings']>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),

      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // Cart
      cart: [],
      addToCart: (product) => set((state) => {
        const existing = state.cart.find((item) => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
      getCartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => set((state) => ({
        wishlist: [...state.wishlist, product],
      })),
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== productId),
      })),
      isInWishlist: (productId) => get().wishlist.some((item) => item.id === productId),

      // Recent Searches
      recentSearches: [],
      addRecentSearch: (query) => set((state) => {
        const filtered = state.recentSearches.filter((s) => s !== query);
        return { recentSearches: [query, ...filtered].slice(0, 10) };
      }),
      clearRecentSearches: () => set({ recentSearches: [] }),

      // Recently Viewed
      recentlyViewed: [],
      addToRecentlyViewed: (product) => set((state) => {
        const filtered = state.recentlyViewed.filter((p) => p.id !== product.id);
        return { recentlyViewed: [product, ...filtered].slice(0, 20) };
      }),

      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [
          { ...notification, id: Date.now().toString(), createdAt: Date.now(), read: false },
          ...state.notifications,
        ],
      })),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      })),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      })),
      getUnreadCount: () => get().notifications.filter((n) => !n.read).length,

      // Compare
      compareList: [],
      addToCompare: (product) => set((state) => {
        if (state.compareList.length >= 4) return state;
        if (state.compareList.some((p) => p.id === product.id)) return state;
        return { compareList: [...state.compareList, product] };
      }),
      removeFromCompare: (productId) => set((state) => ({
        compareList: state.compareList.filter((p) => p.id !== productId),
      })),
      clearCompare: () => set({ compareList: [] }),

      // Admin-removed products
      removedProductIds: [],
      adminRemoveProduct: (productId) => set((state) => ({
        removedProductIds: [...state.removedProductIds, productId],
      })),
      adminRestoreProduct: (productId) => set((state) => ({
        removedProductIds: state.removedProductIds.filter((id) => id !== productId),
      })),

      // User listings
      userListings: [],
      addUserListing: (product) => set((state) => ({
        userListings: [...state.userListings, product],
      })),
      updateUserListing: (productId, updates) => set((state) => ({
        userListings: state.userListings.map((p) =>
          p.id === productId ? { ...p, ...updates } : p
        ),
      })),
      removeUserListing: (productId) => set((state) => ({
        userListings: state.userListings.filter((p) => p.id !== productId),
      })),

      // Footer/Contact settings (editable by admin)
      footerSettings: {
        phone1: '03004538048',
        phone2: '03004538058',
        phone3: '03214538058',
        whatsapp1: '03004538048',
        whatsapp2: '03004538058',
        whatsapp3: '03214538058',
        whatsapp4: '03107306812',
        email: 'alifarazmalik07@gmail.com',
        location: 'Batth Village, Manga Mandi, Lahore, Pakistan',
        facebook: 'https://facebook.com/markiwia',
        twitter: 'https://twitter.com/markiwia',
        instagram: 'https://instagram.com/markiwia',
        youtube: 'https://youtube.com/markiwia',
        importantNotice: 'Welcome to Markiwia - Pakistan\'s most trusted marketplace. Buy and sell with confidence!',
      },
      updateFooterSettings: (settings) => set((state) => ({
        footerSettings: { ...state.footerSettings, ...settings },
      })),
    }),
    {
      name: 'markiwia-storage',
      partialize: (state) => ({
        theme: state.theme,
        cart: state.cart,
        wishlist: state.wishlist,
        recentSearches: state.recentSearches,
        recentlyViewed: state.recentlyViewed,
        removedProductIds: state.removedProductIds,
        userListings: state.userListings,
        footerSettings: state.footerSettings,
      }),
    }
  )
);
