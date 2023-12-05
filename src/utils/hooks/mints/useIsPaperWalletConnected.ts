import { useWallet } from '@/app/providers/Wallet';
import { useWalletClient } from 'wagmi';

export default function useIsPaperWalletConnected() {
  const { data: walletClient } = useWalletClient();
  const { walletAddress } = useWallet();

  return !walletClient && walletAddress;
}
