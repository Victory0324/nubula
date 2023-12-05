'use client';

import { useCurrentUser } from '@/app/providers/User';
import { useEffect } from 'react';

import ConnectModal from './Modal';
import { useAnalytics } from '@/app/providers/analytics';
import { useModal } from '@ebay/nice-modal-react';
import { useWallet } from '@/app/providers/Wallet';
import Loading from '../../assets/Loading';
import Modal from '../../Modal';
import { usePathname } from 'next/navigation';

export default function WalletConnect({
  onConnect,
  onConnectStart,
}: {
  onConnect?: () => void;
  onConnectStart?: () => void;
}) {
  const pathname = usePathname();
  const { user, loading } = useCurrentUser();
  const { track } = useAnalytics();
  const { walletAddress } = useWallet();

  const connectModal = useModal(ConnectModal);

  useEffect(() => {
    if (pathname !== '/connect-wallet' && user) {
      if (!loading) {
        if (!walletAddress) {
          track({
            category: 'page_flow',
            action: 'wallet_connect_start',
            name: null,
          });

          onConnectStart && onConnectStart();
          connectModal.show({ onConnect });
        } else {
          connectModal.remove();
          onConnect && onConnect();
        }
      }
    }
  }, [
    connectModal,
    loading,
    onConnect,
    onConnectStart,
    pathname,
    track,
    user,
    walletAddress,
  ]);

  if (pathname === '/connect-wallet') return null;

  if (loading) {
    return (
      <Modal>
        <div className='flex items-center justify-center m-auto'>
          <Loading className='text-white' />
        </div>
      </Modal>
    );
  } else return null;
}
