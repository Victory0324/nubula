import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';

export default function ConfirmationModal({
  shown,
  close,
  onConfirm,
}: {
  shown: boolean;
  close: Function;
  onConfirm: Function;
}) {
  if (!shown) return null;

  return (
    <Modal {...{ close }}>
      <CenteredModalContent>
        <ModalBody className='w-[327px]'>
          <ModalHeader title='Are you sure?' />
          <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
            You won’t be able to recover this creation after clearing.
          </div>
          <div className='flex gap-4 '>
            <button
              className='btn btn-primary btn-pinched-br'
              onClick={() => close()}
            >
              Go back
            </button>
            <button
              className='btn btn-secondary btn-pinched-br'
              onClick={() => onConfirm()}
            >
              Confirm
            </button>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
}
