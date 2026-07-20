"use client";

import { StoreProvider } from '../context/StoreContext';
import { CartProvider } from '../context/CartContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </StoreProvider>
  );
}
