import { useOutputTrack } from '@/app/providers/outputTrack';
import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useCallback, useEffect } from 'react';

export default NiceModal.create(function OutputTrackNavigationConfirmation({
  onConfirm,
}: {
  onConfirm: () => void;
}) {
  const modal = useModal();
  const { setOutputTrack, outputTrack } = useOutputTrack();

  const handleConfirm = useCallback(() => {
    setOutputTrack(undefined);
    onConfirm();
    modal.remove();
  }, [modal, onConfirm, setOutputTrack]);

  useEffect(() => {
    if (!outputTrack) modal.remove();
  }, [modal, outputTrack]);

  if (!modal.visible || !outputTrack) {
    return null;
  }

  return (
    <Modal>
      <CenteredModalContent>
        <ModalBody className='!w-[327px]'>
          <ModalHeader title='Unsaved Track' />
          <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
            Heads up! If you complete this action, you&apos;ll lose your track.
            Press back to save or buy your track, or press confirm to keep
            going.
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <button
              className='btn btn-pinched-br btn-primary'
              onClick={() => modal.remove()}
            >
              Back
            </button>
            <button
              className='btn btn-pinched-bl btn-secondary'
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
});
