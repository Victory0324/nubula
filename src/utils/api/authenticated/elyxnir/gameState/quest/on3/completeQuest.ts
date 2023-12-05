import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';
import { elyxnirRequest } from '../../../request';
import { useCallback } from 'react';

export const completeOn3Quest = async (
  body: On3Quest
): Promise<APIResponse<undefined>> => {
  const res = await elyxnirRequest(
    `game-state/quest/complete-on3-quest`,
    'POST',
    body
  );

  if (!res.ok) {
    console.error('Failed complete on3 quest');
    return { success: false, status: res.status };
  }

  return { success: true, status: res.status };
};

export const useCompleteOn3Quest = () => {
  return useAuthenticatedQuery(useCallback(completeOn3Quest, []));
};
