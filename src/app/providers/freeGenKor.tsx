'use client';

import React, { useContext, useState } from 'react';
import GetFreeGenesisKor from '../shared/wallet/GetFreeGenesisKor';

type ContextType = {
  isClaimed: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

const FreeGenKorContext = React.createContext<ContextType | undefined>(
  undefined
);

export const FreeGenKorProvider = ({ children }: ProviderProps) => {
  const [isClaimed, setIsClaimed] = useState(false);

  return (
    <FreeGenKorContext.Provider value={{ isClaimed }}>
      <GetFreeGenesisKor onComplete={() => setIsClaimed(true)} />
      {children}
    </FreeGenKorContext.Provider>
  );
};

export const useFreeGenKor = (): ContextType => {
  const context = useContext(FreeGenKorContext);
  if (!context)
    throw new Error('Called useFreeGenKor before setting UserProvider context');

  return context;
};
