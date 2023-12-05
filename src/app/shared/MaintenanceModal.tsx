'use client';

import NiceModal, { useModal as useNiceModal } from '@ebay/nice-modal-react';
import Modal from './Modal';
import CenteredModalContent from './Modal/CenteredContent';
import ModalBody from './Modal/ModalBody';
import ModalHeader from './Modal/ModalHeader';

const MaintenanceModal = NiceModal.create(() => {
  const modal = useNiceModal();

  if (!modal.visible) return null;

  return (
    <Modal>
      <CenteredModalContent>
        <ModalBody className='w-[327px]'>
          <ModalHeader title='KORUS Website Maintenance' />
          <div className='font-[350] text-center text-white'>
            We&apos;re under the hood, making things even better!
          </div>
          <div className='flex flex-col gap-4 max-w-[500px] text-sm font-[350] text-left text-white/50 mt-4'>
            <span>
              We&apos;re currently performing maintenance on the KORUS website,
              and we&apos;ll be back up and running shortly.
            </span>
            <span>
              In the meantime, you can check out our social media pages for
              updates, or just sit back and relax. We promise it&apos;ll be
              worth the wait!
            </span>
            <span>
              Twitter: <a href='https://twitter.com/KORUS_AI'>@KORUS_AI</a>
            </span>
            <span>We appreciate your patience and understanding!</span>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
});

export default MaintenanceModal;
