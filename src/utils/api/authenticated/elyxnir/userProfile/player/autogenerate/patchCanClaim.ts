import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';
import { useCallback } from 'react';
import { elyxnirRequest } from '../../../request';

export const patchCanClaimAutogenerate = async () => {
  const res = await elyxnirRequest(
    'user-profile/players/claimed-auto-generated-track',
    'PATCH'
  );

  if (!res.ok) {
    console.error('Failed to patch player');
    return { success: false };
  }

  return { success: true };
};

export function usePatchCanClaimAutogenerate() {
  return useAuthenticatedQuery(
    useCallback(() => patchCanClaimAutogenerate(), [])
  );
}
