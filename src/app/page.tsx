"use client";

import { useCart } from '../context/CartContext';
import { useStoreState } from '../context/StoreContext';

export default function HomePage() {
  const { addItem, items, isInitialized } = useCart();
  const { liveAllProducts, isStoreLoading } = useStoreState();

  const handleAddToCart = () => {
    if (liveAllProducts && liveAllProducts.length > 0) {
      addItem(liveAllProducts[0]);
    }
  };

  return (
    <div className="font-mono text-xl p-8">
      <h1>Home Page</h1>
      
      <div className="mt-8 p-4 border border-ink/10 rounded">
        <h2 className="text-lg font-bold mb-4">Phase 3 Testing Area</h2>
        <button 
          onClick={handleAddToCart}
          disabled={isStoreLoading}
          className="px-4 py-2 bg-accent text-white rounded disabled:opacity-50"
        >
          {isStoreLoading ? 'Loading Store...' : 'Test Add First Product To Cart'}
        </button>
        <div className="mt-4 text-sm text-ink/80">
          Cart Items In Storage: {isInitialized ? items.length : 'Loading local storage...'}
        </div>
      </div>
    </div>
  );
}