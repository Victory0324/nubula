import { completeOn3Quest } from '@/utils/api/authenticated/elyxnir/gameState/quest/on3/completeQuest';
import ON3Quests from '@/utils/enums/quests/on3Quests';
import { useCallback } from 'react';

export default function useCompleteOn3Quest() {
  return useCallback(
    (quest: keyof typeof ON3Quests) => completeOn3Quest(ON3Quests[quest]),
    []
  );
}
