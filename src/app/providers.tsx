import { StoreProvider } from '../context/StoreContext';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { LampProvider } from '../context/LampContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LampProvider>
      <AuthProvider>
        <StoreProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </StoreProvider>
      </AuthProvider>
    </LampProvider>
  );
}
