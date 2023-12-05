import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';
import { useCallback } from 'react';
import { elyxnirRequest } from '../request';

export const getFreeGenesisKorNft = async (): Promise<
  APIResponse<GenesisKorNft>
> => {
  const res = await elyxnirRequest(
    `inventory/instances/free-genesis-kor-nft`,
    'GET'
  );

  const { status } = res;

  try {
    if (!res.ok) {
      console.error('Failed to fetch data');
      const { success, message } = await res.json();
      return { success, message, status };
    }

    const data = await res.json();

    return { success: true, data, status };
  } catch (e) {
    console.error(e);
    return { success: false, status };
  }
};

export function useGetFreeGenesisKorNft() {
  return useAuthenticatedQuery(useCallback(() => getFreeGenesisKorNft(), []));
}
