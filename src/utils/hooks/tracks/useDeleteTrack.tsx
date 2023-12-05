import { useTracks } from '@/app/providers/tracks';
import { deleteInstance } from '@/utils/api/authenticated/elyxnir/inventory/deleteInstance';
import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';
import { useAnalytics } from '@/app/providers/analytics';

export default function useDeleteTrack(templateId: string) {
  const { tracks, setTracks } = useTracks();
  const { track } = useAnalytics();

  const deleteInstanceQuery = useAuthenticatedQuery(
    useCallback(deleteInstance, [])
  );

  return useCallback(async () => {
    const inventoryTracksBeforePatch = [...tracks];
    const inventoryInstance = tracks.find(
      (instance) => instance.templateId === templateId
    );

    if (!inventoryInstance) {
      throw Error('Inventory instance does not exist?');
    }

    // optimistic update
    setTracks((p) =>
      p.filter((instance) => {
        return instance.instanceId != inventoryInstance.instanceId;
      })
    );

    const { success } = await deleteInstanceQuery(inventoryInstance.instanceId);

    if (!success) {
      // rollback on error
      // TODO: log error to toast error provider
      setTracks(inventoryTracksBeforePatch);
      throw Error('Failed to delete track');
    } else {
      track({
        category: 'song',
        action: 'delete',
        name: inventoryInstance.body.itemId,
      });
    }
  }, [deleteInstanceQuery, setTracks, tracks, track, templateId]);
}
