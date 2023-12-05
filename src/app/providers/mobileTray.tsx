'use client';

import React, { useContext, useState } from 'react';

type ContextType = {
  content: React.ReactNode;
  setContent: (content: React.ReactNode) => void;

  isTrayOpen: boolean;

  openTray: () => void;
  closeTray: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const MobileTrayContext = React.createContext<ContextType | undefined>(
  undefined
);

export const MobileTrayProvider = ({ children }: ProviderProps) => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const openTray = () => {
    setIsTrayOpen(true);
  };

  const closeTray = () => {
    setContent(null);
    setIsTrayOpen(false);
  };

  return (
    <MobileTrayContext.Provider
      value={{
        content,
        setContent,
        isTrayOpen,

        openTray,
        closeTray,
      }}
    >
      {children}
    </MobileTrayContext.Provider>
  );
};

export const useMobileTray = (): ContextType => {
  const context = useContext(MobileTrayContext);

  if (!context) {
    throw new Error(
      'Called useMobileTray before setting MobileTrayProvider context'
    );
  }

  return context;
};
