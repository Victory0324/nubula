'use client';

import React, {
  RefObject,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useAnalytics } from './analytics';

type ContextType = {
  isUniverseOpen: boolean;
  setIsUniverseOpen: (v: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  universeSubHeadingRef: RefObject<HTMLDivElement>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const MenuContext = React.createContext<ContextType | undefined>(undefined);

export const MenuProvider = ({ children }: ProviderProps) => {
  const [isUniverseOpen, setIsUniverseOpenHandle] = useState(false);
  const [isMenuOpen, setIsMenuOpenHandle] = useState(false);
  const { track } = useAnalytics();
  const universeSubHeadingRef = useRef<HTMLDivElement>(null);

  const setIsUniverseOpen = useCallback(
    (v: boolean) => {
      if (v) {
        setIsMenuOpenHandle(false);

        track({
          category: 'page_flow',
          action: 'dashboard_view',
          name: null,
        });
      }

      setIsUniverseOpenHandle(v);
    },
    [track, setIsUniverseOpenHandle]
  );

  const setIsMenuOpen = (v: boolean) => {
    if (v) {
      setIsUniverseOpenHandle(false);
    }

    setIsMenuOpenHandle(v);
  };

  return (
    <MenuContext.Provider
      value={{
        isUniverseOpen,
        setIsUniverseOpen,
        isMenuOpen,
        setIsMenuOpen,
        universeSubHeadingRef,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): ContextType => {
  const context = useContext(MenuContext);
  if (!context)
    throw new Error('Called useMenu before setting MenuProvider context');

  return context;
};
