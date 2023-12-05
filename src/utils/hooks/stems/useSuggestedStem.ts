import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import { useMints } from '@/app/providers/mints';
import { useCallback } from 'react';

export default function useSuggestedStem() {
  const { stems, loading } = useStems();
  const { unlockedIds } = useMints();

  const getSuggestedStem = useCallback(() => {
    const ids = stems
      .filter((s) => unlockedIds?.includes(s.unlockId))
      .map((i) => i.itemId);

    return ids[(ids.length * Math.random()) | 0];
  }, [stems, unlockedIds]);

  return { getSuggestedStem, loading };
}
