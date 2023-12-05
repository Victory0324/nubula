import X from '@/app/(authenticated)/(dashboard)/nebula/assets/X';

export default function ModalHeader({
  onClose,
  title,
}: {
  onClose?: () => void;
  title?: string;
}) {
  return (
    <>
      {onClose && (
        <button className='absolute right-3 top-6' onClick={() => onClose()}>
          <X className='hover:text-gray-999 transition-colors' />
        </button>
      )}
      <div className='text-center text-2xl font-extrabold mb-3'>{title}</div>
    </>
  );
}
