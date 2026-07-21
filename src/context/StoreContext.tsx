"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts as staticProducts } from '../data/catalog';

const StoreContext = createContext<any>(null);

export const useStoreState = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [inventory, setInventory] = useState(staticProducts);
  const [settings, setSettings] = useState({ maintenanceMode: false, announcementBanner: "" });
  const [isStoreLoading, setIsStoreLoading] = useState(true);

  // We import static category structures locally to preserve layout/descriptions,
  // and we apply the dynamic prices/flags from Redis on top of them.
  const [liveCategories, setLiveCategories] = useState<any[]>([]);
  const [liveFandoms, setLiveFandoms] = useState<any[]>([]);

  useEffect(() => {
    import('../data/catalog').then((module) => {
      setLiveCategories(module.productCategories);
      setLiveFandoms(module.fandomCollections);
    });

    const fetchStoreState = async () => {
      try {
        const res = await fetch('/api/store/state');
        if (res.ok) {
          const data = await res.json();
          if (data.inventory) {
            setInventory(data.inventory);
            // Merge dynamic inventory into static categories and fandoms
            import('../data/catalog').then((module) => {
              const updatedCats = module.productCategories.map((cat: any) => ({
                ...cat,
                products: cat.products.map((staticProd: any) => {
                  const liveProd = data.inventory.find((p: any) => p.id === staticProd.id);
                  return liveProd ? { ...staticProd, ...liveProd } : staticProd;
                })
              }));
              setLiveCategories(updatedCats);

              const updatedFandoms = module.fandomCollections.map((fandom: any) => ({
                ...fandom,
                products: fandom.products.map((staticProd: any) => {
                  const liveProd = data.inventory.find((p: any) => p.id === staticProd.id);
                  return liveProd ? { ...staticProd, ...liveProd } : staticProd;
                })
              }));
              setLiveFandoms(updatedFandoms);
            });
          }
          if (data.settings) setSettings(data.settings);
        }
      } catch {
        console.error("Failed to fetch live store state, falling back to local.");
      } finally {
        setIsStoreLoading(false);
      }
    };
    fetchStoreState();
  }, []);

  const allProductsById = React.useMemo(() => {
    return Object.fromEntries(inventory.map((p: any) => [p.id, p]));
  }, [inventory]);

  const allProductsBySlug = React.useMemo(() => {
    return Object.fromEntries(inventory.map((p: any) => [p.slug, p]));
  }, [inventory]);

  return (
    <StoreContext.Provider value={{ 
      inventory, 
      liveAllProducts: inventory, 
      allProductsById, 
      allProductsBySlug, 
      liveCategories, 
      liveFandoms, 
      settings, 
      isStoreLoading 
    }}>
      {children}
    </StoreContext.Provider>
  );
};
