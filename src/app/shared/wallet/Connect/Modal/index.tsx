'use client';

import NiceModal, { useModal as useNiceModal } from '@ebay/nice-modal-react';
import { useCallback, useState } from 'react';
import Modal from '../../../Modal';
import CenteredModalContent from '../../../Modal/CenteredContent';
import ModalBody from '../../../Modal/ModalBody';
import ModalHeader from '../../../Modal/ModalHeader';
import SkipButton from './SkipButton';
import ConnectButton from './ConnectButton';

const ConnectModal = NiceModal.create(
  ({ onConnect }: { onConnect: () => void }) => {
    const [loading, setLoading] = useState(false);
    const modal = useNiceModal();

    const handleConnect = useCallback(() => {
      setLoading(false);
      modal.remove();
      onConnect();
    }, [modal, onConnect]);

    if (!modal.visible) return null;

    return (
      <Modal>
        <CenteredModalContent>
          <ModalBody className='w-[327px]'>
            <ModalHeader title='Wallet Connection' />
            <div className='text-sm font-[350] text-center text-white/50'>
              Connect your wallet to KORUS.
            </div>
            <div className='flex gap-4 mt-3'>
              <SkipButton
                {...{ loading, setLoading }}
                onConnect={handleConnect}
                className='btn btn-secondary btn-pinched-br'
              />
              <ConnectButton
                {...{ loading }}
                className='btn btn-primary btn-pinched-br'
              />
            </div>
          </ModalBody>
        </CenteredModalContent>
      </Modal>
    );
  }
);

export default ConnectModal;
