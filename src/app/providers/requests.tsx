'use client';

import {
  RecordMintTransactiontBody,
  recordMintTransaction,
} from '@/utils/api/authenticated/elyxnir/inventory/recordMintTransaction';
import React, { useCallback, useContext, useEffect, useState } from 'react';

type ContextType = {
  pendingTransactionHashRequests: RecordMintTransactiontBody[];
  setPendingTransactionHashRequests: React.Dispatch<
    React.SetStateAction<RecordMintTransactiontBody[]>
  >;
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = React.createContext<ContextType | undefined>(undefined);

const RETRY_INTERVAL = 1000 * 60 * 1; // 1 minute

export const RequestsProvider = ({ children }: ProviderProps) => {
  const [pendingTransactionHashRequests, setPendingTransactionHashRequests] =
    useState<RecordMintTransactiontBody[]>([]);

  useEffect(() => {
    const cachedPendingTransactionHashRequests = localStorage.getItem(
      'pendingTransactionHashRequests'
    );
    if (cachedPendingTransactionHashRequests) {
      setPendingTransactionHashRequests(
        JSON.parse(cachedPendingTransactionHashRequests)
      );
    }
  }, []);

  useEffect(
    () =>
      pendingTransactionHashRequests
        ? localStorage.setItem(
            'pendingTransactionHashRequests',
            JSON.stringify(pendingTransactionHashRequests)
          )
        : localStorage.removeItem('pendingTransactionHashRequests'),
    [pendingTransactionHashRequests]
  );

  const retryPendingTransactionHashRequests = useCallback(() => {
    pendingTransactionHashRequests.forEach((request) => {
      recordMintTransaction(request).then(
        ({ success }) =>
          success &&
          setPendingTransactionHashRequests((prev) =>
            prev.filter((r) => r !== request)
          )
      );
    });
  }, [pendingTransactionHashRequests]);

  useEffect(() => {
    retryPendingTransactionHashRequests();

    const intervalId = setInterval(
      retryPendingTransactionHashRequests,
      RETRY_INTERVAL
    );

    return () => clearInterval(intervalId);
  }, [pendingTransactionHashRequests, retryPendingTransactionHashRequests]);

  return (
    <Context.Provider
      value={{
        pendingTransactionHashRequests,
        setPendingTransactionHashRequests,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useRequests = (): ContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      'Called useRequests before setting RequestsProvider context'
    );

  return context;
};
