'use client';

import { useRouter } from '@/app/providers/router';
import { useCallback, useEffect, useState } from 'react';
import Step from '../../shared/Step';

import SkipButton from '@/app/shared/wallet/Connect/Modal/SkipButton';
import ConnectButton from '@/app/shared/wallet/Connect/Modal/ConnectButton';
import { useModal as useNiceModal } from '@ebay/nice-modal-react';
import ConnectModal from '@/app/shared/wallet/Connect/Modal';
import { useWallet } from '@/app/providers/Wallet';
import { useAnalytics } from '@/app/providers/analytics';
import { useAccount } from 'wagmi';
import { useCurrentUser } from '@/app/providers/User';
import Loading from '@/app/shared/assets/Loading';

const ConnectWallet: React.FC = () => {
  const router = useRouter();
  const connectModal = useNiceModal(ConnectModal);

  const { loading: userLoading } = useCurrentUser();
  const { address } = useAccount();
  const {
    walletAddress,
    paperWalletAddress,
    onConnect: onWalletConnect,
  } = useWallet();
  const { track } = useAnalytics();

  const [loading, setLoading] = useState(false);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (!tracked) {
      track({
        category: 'page_flow',
        action: 'wallet_connect_start',
        name: null,
      });
      setTracked(true);
    }
  }, [track, tracked]);

  const onConnect = useCallback(async () => {
    router.push('/universe');
  }, [router]);

  useEffect(() => {
    (async () => {
      if (!loading) {
        if (
          (!walletAddress && address) ||
          (walletAddress && walletAddress !== paperWalletAddress)
        ) {
          setLoading(true);
          await onWalletConnect({
            address: (walletAddress || address) as string,
          });
          connectModal.remove();
          onConnect();
        }
      }
    })();
  }, [
    address,
    connectModal,
    loading,
    onConnect,
    onWalletConnect,
    paperWalletAddress,
    router,
    track,
    walletAddress,
  ]);

  if (userLoading) return <Loading className='text-white' />;

  return (
    <Step>
      <div
        className='rounded-tl-xl
        rounded-tr-3xl
        rounded-bl-xl
        h-[56px]
        bg-gradient-to-r from-[#5F37B6] to-[#9A6AFF] w-full flex justify-center items-center hover:opacity-75 hover:cursor-pointer transition-opacity'
      >
        <ConnectButton
          {...{ loading }}
          className='font-bold text-white flex items-center justify-center w-full rounded-tl-xl rounded-tr-3xl rounded-bl-xl h-full p-[2px] bg-clip-content bg-[#2e244a]'
        />
      </div>
      <SkipButton
        {...{ onConnect, loading, setLoading }}
        className='
        rounded-tr-xl
        rounded-br-xl
        rounded-bl-3xl mt-5 !h-[56px] !w-full flex justify-center items-center bg-gradient-to-r from-[#5F37B6] to-[#9A6AFF] border-none hover:opacity-75 transition-opacity'
      />
    </Step>
  );
};

export default ConnectWallet;
