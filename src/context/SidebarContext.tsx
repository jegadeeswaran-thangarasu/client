import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type SidebarContextValue = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (ctx === null) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return ctx;
}
