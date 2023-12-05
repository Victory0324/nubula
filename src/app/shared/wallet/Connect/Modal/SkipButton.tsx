'use client';

import { useCallback } from 'react';
import { useWallet } from '@/app/providers/Wallet';
import usePaperEmbeddedWalletSdk from '@/utils/hooks/paper/usePaperEmbeddedWalletSdk';
import Loading from '../../../assets/Loading';
import { useCurrentUser } from '@/app/providers/User';
import { useAnalytics } from '@/app/providers/analytics';

const SkipButton = ({
  onConnect,
  className,
  loading,
  setLoading,
}: {
  onConnect: () => void;
  className?: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout } = useCurrentUser();
  const { getPaperWallet } = usePaperEmbeddedWalletSdk();
  const {
    paperWalletAddress,
    paperRecoveryCode,
    onConnect: onWalletConnect,
  } = useWallet();
  const { track } = useAnalytics();

  const handleSkip = useCallback(async () => {
    setLoading(true);
    let address = paperWalletAddress;

    if (!paperWalletAddress) {
      const { success, status, walletAddress } = await getPaperWallet({
        recoveryCode: paperRecoveryCode,
      });

      if (!success && status === 401) return logout();

      address = walletAddress;
    }
    track({
      category: 'page_flow',
      action: 'wallet_connect_skip',
      name: `${address}`,
    });

    await onWalletConnect({ address, walletType: 'paper' });

    setLoading(false);
    onConnect();
  }, [
    getPaperWallet,
    logout,
    onConnect,
    onWalletConnect,
    paperRecoveryCode,
    paperWalletAddress,
    setLoading,
    track,
  ]);

  return (
    <button disabled={loading} className={className} onClick={handleSkip}>
      {loading ? <Loading className='text-white' /> : 'Skip'}
    </button>
  );
};

export default SkipButton;
