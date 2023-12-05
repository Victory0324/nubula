import Modal from '../../../Modal';
import ModalHeader from '../../../Modal/ModalHeader';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

const IframeModal = NiceModal.create(
  ({ siteName, url }: { url: string; siteName: string }) => {
    const modal = useModal();

    if (!modal.visible) {
      return;
    }

    return (
      <Modal close={modal.remove}>
        <div className={`p-8 h-full w-full`}>
          <ModalHeader onClose={modal.remove} />
          <iframe className='w-full h-full' aria-label={siteName} src={url} />
        </div>
      </Modal>
    );
  }
);

export default IframeModal;
