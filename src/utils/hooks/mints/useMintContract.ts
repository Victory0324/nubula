import { useKors } from '@/app/providers/kors';

export type ContractInfo = {
  contractId: `0x${string}`;
  contractAddress: `0x${string}`;
};

export default function useMintContractInfo({
  unlockId,
  track,
}: {
  unlockId?: string;
  track?: boolean;
}): ContractInfo {
  const { availableKors, selectedKorId, loading } = useKors();

  if (loading)
    return {
      contractId: '' as `0x${string}`,
      contractAddress: '' as `0x${string}`,
    };

  const id = track ? selectedKorId : unlockId;

  const kor = availableKors.find((kor) => kor.korUnlockId === id);

  if (!kor) {
    return {
      contractId: '' as `0x${string}`,
      contractAddress: '' as `0x${string}`,
    };
  }

  if (track) {
    return {
      contractId: kor.contractAddresses.PaperTrackContractID as `0x${string}`,
      contractAddress: kor.contractAddresses
        .TrackContractAddress as `0x${string}`,
    };
  }

  return {
    contractId: kor.contractAddresses.PaperContractId as `0x${string}`,
    contractAddress: kor.contractAddresses.KORContractAddress as `0x${string}`,
  };
}
