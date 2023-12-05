import { useCallback } from 'react';
import { elyxnirRequest } from '../request';

export const checkReward = async (
  rewardId: string
): Promise<APIResponse<Reward>> => {
  const res = await elyxnirRequest(`reward/${rewardId}/claim`, 'GET');
  const { status } = res;

  try {
    if (!res.ok) {
      console.error('Failed to fetch data');
      const { success, message } = await res.json();
      return { success, message, status };
    }

    const data = (await res.json()) as Reward;

    return { success: true, data, status };
  } catch (e) {
    console.error(e);
    return { success: false, status };
  }
};

export function useCheckReward() {
  return useCallback((rewardId: string) => checkReward(rewardId), []);
}
