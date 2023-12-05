'use client';

import React, { useContext, useEffect, useState } from 'react';

type ContextType = {
  isSSR: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

const SSRContext = React.createContext<ContextType | undefined>(undefined);

export const SSRProvider = ({ children }: ProviderProps) => {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <SSRContext.Provider
      value={{
        isSSR,
      }}
    >
      {children}
    </SSRContext.Provider>
  );
};

export const useSSR = (): ContextType => {
  const context = useContext(SSRContext);
  if (!context)
    throw new Error('Called useSSR before setting SSRProvider context');

  return context;
};
