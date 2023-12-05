import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';

export default function CreateConfirmationModal({
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
        <div className='w-[327px] p-8 flex flex-col items-center'>
          <div className='text-xl font-extrabold mb-3'>
            You will lose this track!
          </div>
          <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
            {
              "Press continue If you don't want to own or save your current track. Otherwise, press back and press own or save, then follow the on screen instructions."
            }
          </div>
          <div className='flex gap-4 '>
            <button
              className='btn btn-primary btn-pinched-br'
              onClick={() => close()}
            >
              Back
            </button>
            <button
              className='btn btn-secondary btn-pinched-bl'
              onClick={() => onConfirm()}
            >
              Continue
            </button>
          </div>
        </div>
      </CenteredModalContent>
    </Modal>
  );
}
