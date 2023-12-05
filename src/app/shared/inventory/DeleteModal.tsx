import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import { toast } from 'react-toastify';
import Toast from '@/app/shared/Toasts/Toast';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Modal from '@/app/shared/Modal';
import { useCallback, useState } from 'react';
import Loading from '../assets/Loading';

const DeleteModal = NiceModal.create(
  ({ deleter }: { deleter: () => Promise<void> }) => {
    const [loading, setLoading] = useState(false);
    const modal = useModal();

    const onDelete = useCallback(async () => {
      setLoading(true);
      try {
        await deleter();
        toast(<Toast type='success' title='Item Deleted Successfully' />);
      } catch (error) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        toast(
          <Toast type='error' title='Something went wrong' body={message} />
        );
      } finally {
        setLoading(false);
        modal.remove();
      }
    }, [deleter, modal]);

    if (!modal.visible) {
      return null;
    }

    return (
      <Modal close={modal.remove}>
        <CenteredModalContent>
          <ModalBody className='w-[327px]'>
            <ModalHeader title='Are you sure?' />
            <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
              You won’t be able to recover this item after deleting.
            </div>
            <div className='flex gap-4 '>
              <button
                disabled={loading}
                onClick={onDelete}
                className='btn btn-secondary btn-pinched-br flex justify-center items-center'
              >
                {loading ? <Loading className='text-white' /> : 'Confirm'}
              </button>
              <button
                disabled={loading}
                className='btn btn-primary btn-pinched-bl'
                onClick={() => modal.remove()}
              >
                Go back
              </button>
            </div>
          </ModalBody>
        </CenteredModalContent>
      </Modal>
    );
  }
);

export default DeleteModal;
