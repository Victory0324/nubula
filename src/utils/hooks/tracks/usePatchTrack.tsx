import { useTracks } from '@/app/providers/tracks';
import {
  PatchInstanceValues,
  patchInstance,
} from '@/utils/api/authenticated/elyxnir/inventory/patchInstance';
import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';
import { useAnalytics } from '@/app/providers/analytics';
import { useOutputTrack } from '@/app/providers/outputTrack';

export default function usePatchTrack() {
  const { track } = useAnalytics();
  const { tracks, setTracks } = useTracks();
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
      trackId,
      title,
      isFavourite,
    }: {
      trackId: string;
      title?: string;
      isFavourite: boolean;
    }) => {
      const inventoryTracksBeforePatch = [...tracks];
      const inventoryInstance = tracks.find(
        (instance) => instance.instanceId === trackId
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
      setTracks((p) =>
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
        setTracks(inventoryTracksBeforePatch);

        if (outputTrack?.instanceId === inventoryInstance.instanceId) {
          const instanceBeforeUpdate = inventoryTracksBeforePatch.find(
            (instance) => instance.instanceId === trackId
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
          track({
            category: 'song',
            action: 'favorite',
            name: inventoryInstance.body.itemId,
          });
        }
      }
    },

    [patchInstanceQuery, setTracks, tracks, track, outputTrack, setOutputTrack]
  );
}
