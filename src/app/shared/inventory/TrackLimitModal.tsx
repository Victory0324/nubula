import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import TempInventory from './TempInventory';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const TrackLimitModal = NiceModal.create(() => {
  const tempInventoryModal = useModal(TempInventory);
  const modal = useModal();

  if (!modal.visible) {
    return null;
  }

  return (
    <Modal close={modal.remove}>
      <CenteredModalContent>
        <ModalBody className='w-[327px]'>
          <ModalHeader title='No space!' />
          <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
            Your free tracks inventory is full! Please delete a free track to
            make some space.
          </div>
          <div className='flex gap-4 flex-col w-full'>
            <button
              onClick={() => {
                modal.remove();
                tempInventoryModal.show();
              }}
              className='btn btn-primary btn-pinched-br w-full'
            >
              Delete Tracks
            </button>

            <button
              className='btn btn-secondary btn-pinched-br w-full'
              onClick={modal.remove}
            >
              Back
            </button>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
});

export default TrackLimitModal;
