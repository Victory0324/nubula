'use client';

import usePaperEmbeddedWalletSdk from '@/utils/hooks/paper/usePaperEmbeddedWalletSdk';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import WalletToast from '../shared/wallet/Connect/Toast';
import { useCurrentUser } from './User';
import { useAnalytics } from './analytics';
import Toast from '../shared/Toasts/Toast';
import { useUpdateUser } from '@/utils/api/authenticated/elyxnir/user/updateUser';

type ContextType = {
  walletAddress?: `0x${string}`;
  paperWalletAddress?: `0x${string}`;
  paperRecoveryCode?: string;
  onConnect: ({
    address,
    walletType,
  }: {
    address?: string;
    walletType?: WalletType;
  }) => Promise<void>;
  onDisconnect: () => Promise<void>;
  onWalletAddressChange: (address: `0x${string}`) => Promise<void>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = React.createContext<ContextType | undefined>(undefined);

export const WalletProvider = ({ children }: ProviderProps) => {
  const { track } = useAnalytics();
  const updateUser = useUpdateUser();
  const { fetchUser, setLoading, user } = useCurrentUser();
  const { getPaperWallet } = usePaperEmbeddedWalletSdk();

  const onConnect = useCallback(
    async ({
      address,
      walletType,
    }: {
      address?: string;
      walletType?: WalletType;
    }) => {
      setLoading(true);

      track({
        category: 'page_flow',
        action: 'wallet_connect_success',
        name: address || null,
        wallet_type: walletType || null,
      });

      const res = await updateUser({ walletAddress: address as `0x${string}` });

      if (res.success) {
        await fetchUser();

        if (walletType !== 'paper')
          toast(<WalletToast label='connect' />, {
            toastId: 'wallet-connect-success',
          });
      } else {
        if (walletType !== 'paper')
          toast(
            <Toast
              type={'error'}
              title={`Failed to connect wallet`}
              body={`Please try again.`}
            />,
            {
              toastId: 'wallet-connect-error',
            }
          );
      }

      setLoading(false);
    },
    [fetchUser, setLoading, track, updateUser]
  );

  const paperWalletAddress = useMemo(
    () => user?.paperWalletAddress,
    [user?.paperWalletAddress]
  );

  const paperRecoveryCode = useMemo(
    () => user?.paperRecoveryCode,
    [user?.paperRecoveryCode]
  );

  const walletAddress = useMemo(
    () => user?.walletAddress,
    [user?.walletAddress]
  );

  const onWalletAddressChange = useCallback(
    async (walletAddress: `0x${string}`) => {
      const res = await updateUser({ walletAddress });

      if (res.success) {
        await fetchUser();

        toast(<WalletToast label='connect' />, {
          toastId: 'wallet-connect-success',
        });
      }
    },
    [fetchUser, updateUser]
  );

  const onDisconnect = useCallback(async () => {
    setLoading(true);

    const { walletAddress } = await getPaperWallet({
      recoveryCode: paperRecoveryCode,
    });

    const res = await await updateUser({ walletAddress });

    if (res.success) {
      await fetchUser();

      toast(<WalletToast label='disconnect' />, {
        toastId: 'wallet-disconnect-success',
      });
    } else {
      toast(
        <Toast
          type={'error'}
          body={`Something went wrong, please try again.`}
        />,
        {
          toastId: 'wallet-disconnect-error',
        }
      );
    }

    setLoading(false);
  }, [fetchUser, getPaperWallet, paperRecoveryCode, setLoading, updateUser]);

  return (
    <Context.Provider
      value={{
        paperWalletAddress,
        paperRecoveryCode,
        walletAddress,
        onConnect,
        onDisconnect,
        onWalletAddressChange,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useWallet = (): ContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error('Called useWallet before setting WalletProvider context');

  return context;
};
