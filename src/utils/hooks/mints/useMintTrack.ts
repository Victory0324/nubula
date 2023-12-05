import { useCallback } from 'react';
import useMintFactorySdk from './useMintFactorySdk';
import useMintContractInfo from './useMintContract';

export default function useMintTrack() {
  const { startMintNftTransaction } = useMintFactorySdk();
  const contractInfo = useMintContractInfo({ track: true });

  return useCallback(
    async ({
      quantity,
      instanceId,
      transactionType,
    }: {
      quantity: number;
      instanceId: string;
      transactionType: 'Card' | 'Wallet';
    }) =>
      await startMintNftTransaction({
        contractInfo,
        quantity,
        instanceId,
        transactionType,
      }),
    [contractInfo, startMintNftTransaction]
  );
}
