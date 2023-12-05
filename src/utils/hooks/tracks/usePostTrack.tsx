import { useTracks } from '@/app/providers/tracks';
import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';

import { postTrack } from '@/utils/api/authenticated/elyxnir/inventory/postTrack';
import { useSFX } from '@/app/providers/sfx';
import { useAnalytics } from '@/app/providers/analytics';
import { useKors } from '@/app/providers/kors';
import { useMints } from '@/app/providers/mints';
import { getMintsForKorUnlockId } from '@/utils/helpers/mints';
import { useCurrentUser } from '@/app/providers/User';

export class TrackLimitExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TrackLimitExceededError';
  }
}

export default function usePostTrack() {
  const { onTrackSaved } = useSFX();
  const { track } = useAnalytics();
  const { tracks, refetch } = useTracks();
  const { selectedKor } = useKors();
  const { mints } = useMints();
  const { user } = useCurrentUser();

  const postInstanceQuery = useAuthenticatedQuery(
    useCallback((track: OutputTrackPostBody) => postTrack(track), [])
  );

  return useCallback(
    async ({
      outputTrack,
      ignoreLimit = false,
      saveType = 'save',
    }: {
      outputTrack: OutputTrack;
      ignoreLimit?: boolean;
      saveType?: string;
    }) => {
      const trackSlots = user?.allowedInventoryTrackSlots || 10;
      if (
        tracks.filter((t) => !t.tokenId).length >= trackSlots &&
        !ignoreLimit
      ) {
        throw new TrackLimitExceededError(
          `Limit of ${trackSlots} exceeded. Cant create any new tracks.`
        );
      }

      const mintsForSelectedKor = getMintsForKorUnlockId({
        unlockId: selectedKor?.korUnlockId,
        mints,
      });

      const randomMint =
        mintsForSelectedKor[
          Math.floor(Math.random() * mintsForSelectedKor.length)
        ];

      const trackWithMetadata = {
        ...outputTrack,
        korTokenId: randomMint.tokenId,
        korContractAddress: randomMint.nftCollection.contractAddress,
      };

      const instanceId = await postInstanceQuery(trackWithMetadata);

      onTrackSaved();
      track({
        category: 'song',
        action: 'save',
        name: outputTrack.itemId,
        type: saveType == 'save' ? 'save' : 'own',
      });

      // refetch inventory tracks
      await refetch();

      return instanceId;
    },
    [
      user?.allowedInventoryTrackSlots,
      tracks,
      selectedKor?.korUnlockId,
      mints,
      postInstanceQuery,
      onTrackSaved,
      track,
      refetch,
    ]
  );
}
