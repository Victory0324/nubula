import { useMints } from '@/app/providers/mints';
import { useCallback } from 'react';

export function useIsStemUnlocked() {
  const { unlockedIds, sessionUnlockedIds } = useMints();

  return useCallback(
    (stem?: InputStem) => {
      return stem
        ? unlockedIds?.includes(stem.unlockId) ||
            sessionUnlockedIds?.includes(stem.unlockId)
        : false;
    },
    [sessionUnlockedIds, unlockedIds]
  );
}
