import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';

export default function ErrorStep({ onClose }: { onClose: () => void }) {
  return (
    <ModalBody className='!w-[327px]'>
      <ModalHeader title='Failed to Complete Own' />
      <div className='flex flex-col gap-4'>
        <div className='text-sm font-[350] text-center text-white/50 flex flex-col gap-4'>
          <p>
            We apologize for the inconvenience. We encountered an error during
            the owning process.
          </p>
          <p>Please try again later.</p>
        </div>
        <button className='btn btn-primary btn-pinched-br' onClick={onClose}>
          Confirm
        </button>
      </div>
    </ModalBody>
  );
}
