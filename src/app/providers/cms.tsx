'use client';

import { UniverseCard } from '@/utils/cms/getCards';
import React, { useContext } from 'react';

type ContextType = {
  cards: UniverseCard[];
  moods: string[];
};

type ProviderProps = ContextType & {
  children: React.ReactNode;
};

const CMSContext = React.createContext<ContextType | undefined>(undefined);

export const CMSProvider = ({ children, ...content }: ProviderProps) => {
  return (
    <CMSContext.Provider value={{ ...content }}>{children}</CMSContext.Provider>
  );
};

export const useCMS = (): ContextType => {
  const context = useContext(CMSContext);
  if (!context)
    throw new Error('Called useCMS before setting CMSProvider context');

  return context;
};
