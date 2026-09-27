"use client";

import { createContext, useContext, useState, type ReactNode } from 'react';

interface LampContextType {
  isLit: boolean;
  setIsLit: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const LampContext = createContext<LampContextType>({
  isLit: false,
  setIsLit: () => {},
});

export function LampProvider({ children }: { children: ReactNode }) {
  const [isLit, setIsLit] = useState(false);
  return (
    <LampContext.Provider value={{ isLit, setIsLit }}>
      {children}
    </LampContext.Provider>
  );
}

export function useLampState() {
  return useContext(LampContext);
}
