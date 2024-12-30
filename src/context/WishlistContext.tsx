import { createContext, useContext, useCallback, ReactNode, useState } from 'react';

// Define interfaces
interface Product {
  id: string | number;
  [key: string]: any; // Allow for other product properties
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string | number) => Promise<void>;
}

// Update context creation with type
const WishlistContext = createContext<WishlistContextType | null>(null);

// Add types to the provider props
interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = useCallback(async (product: Product) => {
    // Update UI
    setWishlist(current => [...current, product]);

    try {
      // Simulate API call
      await fakeApiCall('add', product);
    } catch (error) {
      // Revert the UI update if API call fails
      setWishlist(current => current.filter(item => item.id !== product.id));
      console.error('Failed to add to wishlist:', error);
    }
  }, []);

  const removeFromWishlist = useCallback(async (productId: string | number) => {
    // Store previous state in case we need to revert
    const previousWishlist = wishlist;
    setWishlist(current => current.filter(item => item.id !== productId));

    try {
      await fakeApiCall('remove', { id: productId });
    } catch (error) {
      // Revert to previous state if API call fails
      setWishlist(previousWishlist);
      console.error('Failed to remove from wishlist:', error);
    }
  }, [wishlist]);

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use wishlist
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

// Update API call function with types
const fakeApiCall = async (action: 'add' | 'remove', data: Product | { id: string | number }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, data };
}; 