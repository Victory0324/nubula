'use client';

import { useOutputTrack } from '@/app/providers/outputTrack';
import Kor3DScene from '@/app/shared/KOR/3DScene';
import { useEffect } from 'react';
import { useRouter } from '@/app/providers/router';
import OutputTrackNavigationConfirmationModal from '@/app/(authenticated)/(dashboard)/nebula/Nebula/OutputTrackNavigationConfirmationModal';
import { useModal } from '@ebay/nice-modal-react';

const OutputPage = () => {
  const { creating, outputTrack, setOutputTrack } = useOutputTrack();
  const router = useRouter();
  const confirmationModal = useModal(OutputTrackNavigationConfirmationModal);

  useEffect(() => {
    if (!creating && !outputTrack) {
      router.push('/nebula');
    }
  }, [creating, outputTrack, router]);

  useEffect(() => {
    // add the before router change handler.
    const unsubscribe = router.beforeRouteChange((url, opts) => {
      // dont allow switching screens
      // while creating
      if (creating) {
        return false;
      }

      // dont allow switching screens
      // if output track is not saved.
      if (outputTrack && !outputTrack.instanceId) {
        confirmationModal.show({
          onConfirm: () => {
            setOutputTrack(undefined);
            router.push(url, opts);
          },
        });
        return false;
      }

      return true;
    });

    return unsubscribe;
    // purposely don't track the router here
    // otherwise it's an infinite loop because
    // beforeRouteChange modifies the router
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating, outputTrack]);

  return <Kor3DScene />;
};

export default OutputPage;
