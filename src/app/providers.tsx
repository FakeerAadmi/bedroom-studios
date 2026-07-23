
import { StoreProvider } from '../context/StoreContext';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
