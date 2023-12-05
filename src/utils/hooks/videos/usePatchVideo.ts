import {
  PatchInstanceValues,
  patchInstance,
} from '@/utils/api/authenticated/elyxnir/inventory/patchInstance';
import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';
import { useAnalytics } from '@/app/providers/analytics';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useVideos } from '@/app/providers/videos';

export default function usePatchVideo() {
  const { track: trackEvent } = useAnalytics();
  const { videos, setVideos } = useVideos();
  const { outputTrack, setOutputTrack } = useOutputTrack();

  const patchInstanceQuery = useAuthenticatedQuery(
    useCallback(
      ({ instanceId, title, isFavourite }: PatchInstanceValues) =>
        patchInstance({
          instanceId,
          title,
          isFavourite,
        }),
      []
    )
  );

  return useCallback(
    async ({
      instanceId,
      title,
      isFavourite,
    }: {
      instanceId: string;
      title?: string;
      isFavourite: boolean;
    }) => {
      const inventoryVideosBeforePatch = [...videos];
      const inventoryInstance = videos.find(
        (instance) => instance.instanceId === instanceId
      );

      if (!inventoryInstance) {
        // We need to create the stem if it doesn't exist
        // not sure if its the same for tracks?
        throw Error('Inventory instance does not exist?');
      }

      const patchData = {
        title: title || inventoryInstance.name,
        isFavourite: isFavourite,
      };

      // optimistic update
      setVideos((p) =>
        p.map((instance) => {
          return instance.instanceId === inventoryInstance.instanceId
            ? {
                ...instance,
                isFavourite: patchData.isFavourite,
                name: patchData.title,
              }
            : instance;
        })
      );

      // optimistic update output track if needed.
      if (outputTrack?.instanceId === inventoryInstance.instanceId) {
        setOutputTrack({
          ...outputTrack,
          isFavourite: patchData.isFavourite,
          name: patchData.title,
        });
      }

      const { success } = await patchInstanceQuery({
        instanceId: inventoryInstance.instanceId,
        ...patchData,
      });

      if (!success) {
        // rollback on error
        // TODO: log error to toast error provider
        setVideos(inventoryVideosBeforePatch);

        if (outputTrack?.instanceId === inventoryInstance.instanceId) {
          const instanceBeforeUpdate = inventoryVideosBeforePatch.find(
            (instance) => instance.instanceId === instanceId
          );

          if (instanceBeforeUpdate) {
            setOutputTrack({
              ...outputTrack,
              isFavourite: instanceBeforeUpdate.isFavourite,
              name: instanceBeforeUpdate.name,
            });
          }
        }
      } else {
        if (patchData.isFavourite && !inventoryInstance.isFavourite) {
          // we are favoriting.
          trackEvent({
            category: 'video',
            action: 'favorite',
            name: inventoryInstance.body.itemId,
          });
        }
      }
    },

    [
      patchInstanceQuery,
      setVideos,
      videos,
      trackEvent,
      outputTrack,
      setOutputTrack,
    ]
  );
}
