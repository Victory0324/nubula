import { useKors } from '@/app/providers/kors';
import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import { useMemo } from 'react';

export default function SwitchKorsModal({
  shown,
  close,
  onConfirm,
  korUnlockId,
}: {
  shown: boolean;
  close: Function;
  onConfirm: Function;
  korUnlockId: string;
}) {
  const { availableKors } = useKors();

  const korName = useMemo(
    () => availableKors.find((kor) => kor.korUnlockId === korUnlockId)?.korName,
    [availableKors, korUnlockId]
  );

  if (!shown) return null;

  return (
    <Modal {...{ close }}>
      <CenteredModalContent>
        <ModalBody className='w-[327px]'>
          <ModalHeader title='Background unavailable' />
          <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
            You must have {korName} selected to apply this background.
          </div>
          <div className='flex flex-col gap-4 w-full'>
            <button
              className='btn btn-primary btn-pinched-br w-full'
              onClick={() => onConfirm()}
            >
              Change KOR & Apply
            </button>
            <button
              className='btn btn-secondary btn-pinched-br w-full'
              onClick={() => close()}
            >
              Go back
            </button>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
}
