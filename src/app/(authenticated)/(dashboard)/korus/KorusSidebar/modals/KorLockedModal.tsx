import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';

interface KorLockedModalProps {
  setStep: (step: string) => void;
  onUnlockButtonClick: () => void;
}

const KorLockedModal: React.FC<KorLockedModalProps> = ({
  setStep,
  onUnlockButtonClick,
}) => {
  return (
    <Modal close={() => setStep('')}>
      <CenteredModalContent>
        <ModalBody>
          <ModalHeader title='KOR Locked' />

          <div className='flex flex-col gap-4'>
            <div className='text-sm font-[350] text-center text-white/50'>
              <p>This KOR needs to be unlocked before you can use it.</p>
            </div>

            <div className='flex flex-col gap-2'>
              <button
                className='btn btn-primary btn-pinched-br w-full'
                onClick={onUnlockButtonClick}
              >
                Unlock
              </button>
              <button
                className='btn btn-secondary btn-pinched-br w-full'
                onClick={() => setStep('')}
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

export default KorLockedModal;
