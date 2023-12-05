'use client';

import { useGetBalance } from '@/utils/api/authenticated/elyxnir/currency/getBalance';
import { useDeductBalance } from '@/utils/api/authenticated/elyxnir/currency/deductBalance';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useCheckReward } from '@/utils/api/authenticated/elyxnir/reward/checkReward';
import { useClaimReward } from '@/utils/api/authenticated/elyxnir/reward/claimReward';
import { useCurrentUser } from './User';
import { useAnalytics } from './analytics';
import Toast from '../shared/Toasts/Toast';
import { toast } from 'react-toastify';
import { useSFX } from './sfx';

export type AnimationValue = {
  value: number;
  rewardId: string;
};

type ContextType = {
  noizBalance?: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  rewardLoading: boolean;
  setRewardLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showAnimationValue: AnimationValue | undefined;
  setShowAnimationValue: React.Dispatch<
    React.SetStateAction<AnimationValue | undefined>
  >;
  fetchNoizBalance: () => Promise<void>;
  deductNoizBalance: (value: number) => Promise<boolean>;
  claimReward: (rewardId: string) => Promise<void>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = React.createContext<ContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: ProviderProps) => {
  const { onFaucet, onFaucetDailyReward } = useSFX();
  const [showAnimationValue, setShowAnimationValue] = useState<
    AnimationValue | undefined
  >();
  const getBalance = useGetBalance();
  const deductBalance = useDeductBalance();
  const rewardCheck = useCheckReward();
  const rewardClaim = useClaimReward();
  const { track } = useAnalytics();
  const { user } = useCurrentUser();

  const [loading, setLoading] = useState(true);
  const [rewardLoading, setRewardLoading] = useState(false);
  const [noizBalance, setNoizBalance] = useState<number | undefined>();

  const fetchNoizBalance = useCallback(async () => {
    setLoading(true);

    const { success, data } = await getBalance('noiz');

    if (success) setNoizBalance(data?.value);

    setLoading(false);
  }, [getBalance]);

  useEffect(() => void fetchNoizBalance(), [fetchNoizBalance]);

  const deductNoizBalance = useCallback(
    async (value: number) => {
      setLoading(true);

      const prevBalance = noizBalance;

      setNoizBalance((prevBalance || 0) - value);

      const { success, data } = await deductBalance({
        currencyId: 'noiz',
        value,
      });

      if (!success)
        toast(<Toast type='error' title={`Insufficient balance.`} />);

      setNoizBalance(success ? data?.value || 0 : prevBalance);

      setLoading(false);

      return success;
    },
    [deductBalance, noizBalance]
  );

  const claimReward = useCallback(
    async (rewardId: string) => {
      setRewardLoading(true);

      const { success, data } = await rewardCheck(rewardId);

      if (success && data?.canClaim) {
        const prevBalance = noizBalance;

        setNoizBalance((prevBalance || 0) + data.nextScheduleValue);

        const { success: claimSuccess, data: claimData } = await rewardClaim({
          rewardId,
          actionId: data.actionId,
        });

        setNoizBalance(claimSuccess ? claimData?.value || 0 : prevBalance);

        if (success) {
          if (rewardId.includes('daily')) {
            track({
              action: 'daily_reward',
              category: 'received_coins',
              day_number: data?.lastClaimedScheduleIndex,
              claim_counts: data.claimCount,
              name: 'undefined',
            });
            onFaucetDailyReward();
          } else onFaucet();
          setShowAnimationValue({
            rewardId,
            value: data?.nextScheduleValue,
          });
        }
      }

      setRewardLoading(false);
    },
    [
      noizBalance,
      track,
      onFaucet,
      onFaucetDailyReward,
      rewardCheck,
      rewardClaim,
    ]
  );

  return (
    <Context.Provider
      value={{
        noizBalance,
        loading,
        setLoading,
        rewardLoading,
        setRewardLoading,
        showAnimationValue,
        setShowAnimationValue,
        fetchNoizBalance,
        deductNoizBalance,
        claimReward,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCurrency = (): ContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      'Called useCurrency before setting CurrencyProvider context'
    );

  return context;
};
