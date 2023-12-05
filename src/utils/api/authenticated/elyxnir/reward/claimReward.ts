import { useCallback } from 'react';
import { elyxnirRequest } from '../request';
import useUserActionsSdk from '@/utils/hooks/paper/useUserActionsSdk';

export const claimReward = async (
  rewardId: string
): Promise<APIResponse<CurrencyBalance>> => {
  const res = await elyxnirRequest(`reward/${rewardId}/claim`, 'POST');
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

export function useClaimReward() {
  const { sdk } = useUserActionsSdk();

  return useCallback(
    async ({ rewardId, actionId }: { rewardId: string; actionId: string }) => {
      const res = await claimReward(rewardId);

      if (!res.success || !sdk) return res;

      try {
        sdk.userAction(actionId);
      } catch (e) {
        console.error('Error starting onchain transaction', e);
      }
      return res;
    },
    [sdk]
  );
}
