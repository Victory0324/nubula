import { useCallback } from 'react';
import useMintFactorySdk from './useMintFactorySdk';
import useMintContractInfo from './useMintContract';
import { useKors } from '../../../app/providers/kors';

export default function useMintPreviewKor() {
  const { startMintNftTransaction } = useMintFactorySdk();
  const { previewKor } = useKors();
  const contractInfo = useMintContractInfo({
    unlockId: previewKor?.korUnlockId,
  });

  return useCallback(
    async (quantity: number) =>
      await startMintNftTransaction({
        contractInfo,
        quantity,
      }),
    [contractInfo, startMintNftTransaction]
  );
}
