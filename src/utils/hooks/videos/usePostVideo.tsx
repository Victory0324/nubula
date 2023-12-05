import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';
import { useSFX } from '@/app/providers/sfx';
import { useAnalytics } from '@/app/providers/analytics';
import { useKors } from '@/app/providers/kors';
import { useMints } from '@/app/providers/mints';
import { getMintsForKorUnlockId } from '@/utils/helpers/mints';
import { useCurrentUser } from '@/app/providers/User';
import { useVideos } from '@/app/providers/videos';
import { postVideo } from '@/utils/api/authenticated/elyxnir/inventory/postVideo';

export class VideoLimitExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VideoLimitExceededError';
  }
}

export default function usePostVideo() {
  const { onVideoSaved } = useSFX();
  const { track: trackEvent } = useAnalytics();
  const { videos, refetch } = useVideos();
  const { selectedKor } = useKors();
  const { mints } = useMints();
  const { user } = useCurrentUser();

  const postVideoQuery = useAuthenticatedQuery(
    useCallback(
      ({
        video,
        thumbnail,
        duration,
        scenzNames,
        trackTemplateIds,
        name,
      }: {
        video: Blob;
        duration: number;
        scenzNames: string[];
        thumbnail: Blob;
        trackTemplateIds: string[];
        name: string;
      }) =>
        postVideo({
          video,
          thumbnail,
          scenzNames: scenzNames,
          duration,
          trackTemplateIds,
          name,
        }),
      []
    )
  );

  return useCallback(
    async ({
      video,
      thumbnail,
      duration,
      scenzNames,
      trackTemplateIds,
      name,
      ignoreLimit,
    }: {
      video: Blob;
      duration: number;
      thumbnail: Blob;
      scenzNames: string[];
      trackTemplateIds: string[];
      name: string;
      ignoreLimit?: boolean;
    }) => {
      const trackSlots = user?.allowedInventoryTrackSlots || 10;
      if (
        videos.filter((t) => !t.tokenId).length >= trackSlots &&
        !ignoreLimit
      ) {
        throw new VideoLimitExceededError(
          `Limit of ${trackSlots} exceeded. Cant create any new videos.`
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

      // TODO we should probaly send this metadata on video.body
      const metadata = {
        korTokenId: randomMint.tokenId,
        korContractAddress: randomMint.nftCollection.contractAddress,
      };

      const { success, data } = await postVideoQuery({
        trackTemplateIds,
        thumbnail,
        video,
        duration,
        scenzNames,
        name,
      });

      if (success) {
        onVideoSaved();
        trackEvent({
          category: 'video',
          action: 'save',
          name: data.body.itemId,
        });

        // refetch inventory videos
        await refetch();

        return data;
      }
    },
    [
      // FIXME: replace with allowedInventoryVideoSlots
      // once the BE has implemented this.
      user?.allowedInventoryTrackSlots,
      videos,
      selectedKor?.korUnlockId,
      mints,
      postVideoQuery,
      onVideoSaved,
      trackEvent,
      refetch,
    ]
  );
}
