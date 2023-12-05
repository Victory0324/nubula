import Modal from '../../../Modal';
import CenteredModalContent from '../../../Modal/CenteredContent';
import ModalBody from '../../../Modal/ModalBody';
import ModalHeader from '../../../Modal/ModalHeader';

export interface DeepLinkModalProps {
  isOpen: boolean;
  close?: () => void;
  siteName: string;
  url: string;
}

const DeepLinkModal: React.FC<DeepLinkModalProps> = ({
  close,
  siteName,
  url,
}) => {
  return (
    <Modal
      close={() => {
        close && close();
      }}
    >
      <CenteredModalContent className='w-[320px]'>
        <ModalBody>
          <ModalHeader title='Leaving so soon?' />

          <div className='flex flex-col gap-4'>
            <div className='text-sm font-[350] text-center text-white/50'>
              <p>{`You are leaving KORUS for ${siteName}. Are you sure?`}</p>
            </div>

            <div className='flex flex-col gap-2'>
              <button
                className='btn btn-primary btn-pinched-br w-full'
                onClick={() => {
                  window.location.replace(url);
                }}
              >
                Yes
              </button>

              <button
                className='btn btn-secondary btn-pinched-br w-full'
                onClick={() => close && close()}
              >
                Back
              </button>
            </div>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
};

export default DeepLinkModal;
