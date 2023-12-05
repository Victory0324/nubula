import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import { createStemInstance } from '@/utils/api/authenticated/elyxnir/inventory/createStemInstance';
import {
  PatchInstanceValues,
  patchInstance,
} from '@/utils/api/authenticated/elyxnir/inventory/patchInstance';
import { useCallback } from 'react';
import useAuthenticatedQuery from '../api/useAuthenticatedQuery';

export default function usePatchStem() {
  const { inventoryStems, setInventoryStems, fetchInventoryStems } = useStems();

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
      stem,
      title,
      shouldFavorite,
    }: {
      stem: InputStem;
      title?: string;
      shouldFavorite: boolean;
    }) => {
      const inventoryStemsBeforePatch = [...inventoryStems];
      const inventoryInstance = inventoryStems.find(
        (stemInstance) => stemInstance.templateId === stem.itemId
      );

      if (inventoryInstance) {
        const patchData = {
          title: title || inventoryInstance.name,
          isFavourite: shouldFavorite
            ? !inventoryInstance.isFavourite
            : inventoryInstance.isFavourite,
        };

        // optimistic update
        setInventoryStems((p) =>
          p.map((stemInstance) => {
            return stemInstance === inventoryInstance
              ? { ...stemInstance, ...patchData }
              : stemInstance;
          })
        );

        const { success } = await patchInstanceQuery({
          instanceId: inventoryInstance.instanceId,
          ...patchData,
        });

        if (!success) {
          // rollback on error
          setInventoryStems(inventoryStemsBeforePatch);
        }
      } else {
        const patchData = {
          title: title || stem.trackTitle,
          isFavourite: shouldFavorite,
        };

        // optimistic update
        setInventoryStems((p) => [
          ...p,
          {
            instanceId: '',
            userOwner: '',
            tokenId: null,
            name: patchData.title,
            templateTrackName: patchData.title,
            isFavourite: patchData.isFavourite,
            templateId: stem.itemId,
            quantity: null,
            type: 'Stem',
            description: stem.trackTitle,
            body: stem,
            isMinted: false,
          },
        ]);

        const { success, instanceId } = await createStemInstance({
          inputStem: stem,
          patchData,
        });

        if (!success) {
          console.error('failed to create stem instance');
          // rollback on error
          setInventoryStems(inventoryStemsBeforePatch);
          return;
        }

        if (instanceId)
          // optimistic update
          setInventoryStems((p) =>
            p.map((stemInstance) => {
              return stemInstance.templateId === stem.itemId
                ? { ...stemInstance, instanceId }
                : stemInstance;
            })
          );
      }

      fetchInventoryStems();
    },
    [fetchInventoryStems, inventoryStems, patchInstanceQuery, setInventoryStems]
  );
}
