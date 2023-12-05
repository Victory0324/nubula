import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import { toast } from 'react-toastify';
import Toast from '@/app/shared/Toasts/Toast';
import RenameInput from './NameInput';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const RenameModal = NiceModal.create(
  ({
    name,
    onRename,
  }: {
    name: string;
    onRename: (newName: string) => Promise<void>;
  }) => {
    const modal = useModal();

    if (!modal.visible) return null;

    return (
      <Modal close={modal.remove}>
        <CenteredModalContent>
          <ModalBody className='w-[327px]'>
            <ModalHeader title='Rename track' />
            <RenameInput
              name={name}
              onSubmit={async (newName) => {
                try {
                  await onRename(newName);
                  toast(
                    <Toast type='success' title='Successfully Renamed Item' />
                  );
                } catch (error) {
                  let message = 'Unknown Error';
                  if (error instanceof Error) message = error.message;
                  toast(
                    <Toast
                      type='error'
                      title='Something went wrong'
                      body={message}
                    />
                  );
                } finally {
                  modal.remove();
                }
              }}
              onCancel={() => modal.remove()}
            />
          </ModalBody>
        </CenteredModalContent>
      </Modal>
    );
  }
);

export default RenameModal;
