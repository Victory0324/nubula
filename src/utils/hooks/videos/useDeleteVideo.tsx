import { deleteInstance } from '@/utils/api/authenticated/elyxnir/inventory/deleteInstance';
import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';
import { useAnalytics } from '@/app/providers/analytics';
import { useVideos } from '@/app/providers/videos';

export default function useDeleteVideo(templateId: string) {
  const { videos, setVideos } = useVideos();
  const { track: trackEvent } = useAnalytics();

  const deleteInstanceQuery = useAuthenticatedQuery(
    useCallback(deleteInstance, [])
  );

  return useCallback(async () => {
    const inventoryTracksBeforePatch = [...videos];
    const inventoryInstance = videos.find(
      (instance) => instance.templateId === templateId
    );

    if (!inventoryInstance) {
      throw Error('Inventory instance does not exist?');
    }

    // optimistic update
    setVideos((p) =>
      p.filter((instance) => {
        return instance.instanceId != inventoryInstance.instanceId;
      })
    );

    const { success } = await deleteInstanceQuery(inventoryInstance.instanceId);

    if (!success) {
      setVideos(inventoryTracksBeforePatch);
      throw Error('Failed to delete track');
    } else {
      trackEvent({
        category: 'video',
        action: 'delete',
        name: inventoryInstance.body.itemId,
      });
    }
  }, [deleteInstanceQuery, setVideos, videos, trackEvent, templateId]);
}
