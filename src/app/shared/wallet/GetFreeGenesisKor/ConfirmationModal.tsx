import ModalBody from '../../Modal/ModalBody';
import ModalHeader from '../../Modal/ModalHeader';

export default function ConfirmationModal({
  onBack,
  onConfirm,
}: {
  onBack: Function;
  onConfirm: Function;
}) {
  return (
    <ModalBody className='w-[327px]'>
      <ModalHeader title='Own a GenKOR' />
      <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
        <p>You previously owned a GenKOR.</p>
        <p>In order to continue creating using KORUS you must own a GenKOR.</p>
      </div>
      <div className='flex gap-4 '>
        <button
          className='btn btn-secondary btn-pinched-br'
          onClick={() => onBack()}
        >
          Back
        </button>
        <button
          className='btn btn-primary btn-pinched-br'
          onClick={() => onConfirm()}
        >
          Own
        </button>
      </div>
    </ModalBody>
  );
}
