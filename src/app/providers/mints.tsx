'use client';
import { getAllMints } from '@/utils/api/mintFactory/nfts';
import { getClipUnlockIds, getCollections } from '@/utils/helpers/mints';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWallet } from './Wallet';
import { useAnalytics } from './analytics';
import { useAccount } from 'wagmi';
import { useCurrentUser } from './User';

type ContextType = {
  mints: TokenData[] | null;
  unlockedIds: string[] | null;
  sessionUnlockedIds: string[];
  setSessionUnlockedIds: React.Dispatch<React.SetStateAction<string[]>>;
  collectionSlugs: string[] | null;
  loading: boolean;

  fetchMints: () => Promise<TokenData[]>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const MintsContext = React.createContext<ContextType | undefined>(undefined);

export const MintsProvider = ({ children }: ProviderProps) => {
  const { user } = useCurrentUser();
  const { walletAddress, onWalletAddressChange } = useWallet();
  const [mints, setMints] = useState<TokenData[] | null>(null);
  const [sessionUnlockedIds, setSessionUnlockedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { track } = useAnalytics();
  const { address } = useAccount();

  useEffect(() => {
    if (!user) setSessionUnlockedIds([]);
  }, [user]);

  const fetchMints = useCallback(async () => {
    if (!walletAddress) return [];

    setLoading(true);

    const mints = await getAllMints(walletAddress);

    setMints(mints);

    setLoading(false);

    return mints;
  }, [walletAddress]);

  useEffect(() => {
    fetchMints();
  }, [fetchMints, walletAddress]);

  const unlockedIds = useMemo(
    () => (mints ? getClipUnlockIds(mints) : null),
    [mints]
  );

  const collectionSlugs = useMemo(
    () => (mints ? getCollections(mints) : null),
    [mints]
  );

  useEffect(() => {
    if (address && walletAddress && address !== walletAddress) {
      (async () => {
        await onWalletAddressChange(address);
        collectionSlugs?.map((s) => {
          track({
            category: 'unlock',
            action: 'track_collectibles',
            name: s,
          });
        });
      })();
    }
  }, [address, collectionSlugs, onWalletAddressChange, track, walletAddress]);

  return (
    <MintsContext.Provider
      value={{
        loading,
        mints,
        unlockedIds,
        collectionSlugs,
        fetchMints,
        sessionUnlockedIds,
        setSessionUnlockedIds,
      }}
    >
      {children}
    </MintsContext.Provider>
  );
};

export const useMints = (): ContextType => {
  const context = useContext(MintsContext);
  if (!context)
    throw new Error('Called useMints before setting MintsProvider context');

  return context;
};
