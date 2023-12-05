import { useCallback } from 'react';
import useMintFactorySdk from './useMintFactorySdk';
import useMintContractInfo from './useMintContract';

export default function useMintGenesisKor() {
  const { startMintNftTransaction } = useMintFactorySdk();
  const contractInfo = useMintContractInfo({ unlockId: 'kor_genesis' });

  return useCallback(
    async (quantity: number) =>
      await startMintNftTransaction({
        contractInfo,
        quantity,
      }),
    [contractInfo, startMintNftTransaction]
  );
}
