"use client";

import CartDrawer from '../cart/CartDrawer';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ScrollToTop from '../ScrollToTop';
import Toast from '../Toast';
import { useStoreState } from '../../context/StoreContext';
import { useLampState } from '../../context/LampContext';
import { usePathname } from 'next/navigation';

export default function StoreLayoutClientWrapper({ children }) {
  const { settings } = useStoreState();
  const { isLit } = useLampState();
  const pathname = usePathname();

  const isHQ = pathname?.startsWith('/hq');
  const isAuthPage = pathname === '/account/login' || pathname === '/account/signup' || pathname === '/account/reset-password';
  const isChrome = isHQ || isAuthPage;
  const showMaintenance = settings?.maintenanceMode && !isChrome;

  // On the home page, hide the header until the lamp is switched on
  const isHomePage = pathname === '/';
  const hideHeader = isHomePage && !isLit;

  if (showMaintenance) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-display text-5xl mb-4">Store is closed for maintenance</h1>
        <p className="text-ink/60">We are currently updating our inventory. Please check back later.</p>
      </div>
    );
  }

  return (
    <>
      {settings?.announcementBanner && !isChrome && (
        <div
          className={`bg-ink text-paper py-2 px-4 text-center text-[10px] font-bold uppercase tracking-widest relative z-50 transition-all duration-1000 ease-out ${
            hideHeader ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          {settings.announcementBanner}
        </div>
      )}

      <ScrollToTop />
      {!isChrome && (
        <div
          className={`transition-all duration-1000 ease-out ${
            hideHeader
              ? 'opacity-0 -translate-y-full pointer-events-none absolute top-0 left-0 right-0'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <Navbar />
        </div>
      )}
      <CartDrawer />
      <Toast />
      <main>{children}</main>
      {!isChrome && <Footer />}
    </>
  );
}
