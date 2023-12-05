import X from '@/app/(authenticated)/(dashboard)/nebula/assets/X';

export default function Header({ close }: { close: () => void }) {
  return (
    <div className='flex justify-between items-center border-b pb-4'>
      <h2 className='text-xl font-bold'>Chat</h2>
      <X className='cursor-pointer' onClick={close} />
    </div>
  );
}
