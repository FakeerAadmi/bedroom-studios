"use client";

import CartDrawer from '../cart/CartDrawer';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ScrollToTop from '../ScrollToTop';
import Toast from '../Toast';
import { useStoreState } from '../../context/StoreContext';
import { usePathname } from 'next/navigation';

export default function StoreLayoutClientWrapper({ children }) {
  const { settings } = useStoreState();
  const pathname = usePathname();

  const isHQ = pathname?.startsWith('/hq');
  // Auth pages are full-screen splits — no navbar or footer needed
  const isAuthPage = pathname === '/account/login' || pathname === '/account/signup' || pathname === '/account/reset-password';
  const isChrome = isHQ || isAuthPage;
  const showMaintenance = settings?.maintenanceMode && !isChrome;

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
        <div className="bg-ink text-paper py-2 px-4 text-center text-[10px] font-bold uppercase tracking-widest relative z-50">
          {settings.announcementBanner}
        </div>
      )}

      <ScrollToTop />
      {!isChrome && <Navbar />}
      <CartDrawer />
      <Toast />
      <main>{children}</main>
      {!isChrome && <Footer />}
    </>
  );
}
