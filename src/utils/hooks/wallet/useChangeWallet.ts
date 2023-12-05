import { useModal } from 'connectkit';
import { useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export default function useChangeWallet() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const connectKitModal = useModal();

  return useCallback(async () => {
    if (!address) connectKitModal.setOpen(true);
    else disconnect();
  }, [address, connectKitModal, disconnect]);
}
