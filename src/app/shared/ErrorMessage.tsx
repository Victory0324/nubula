import Info from '@/app/(authenticated)/(dashboard)/inventory/assets/Info';

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <div className='p-4'>
          <Info />
        </div>
        <p>Something went wrong.</p>
        <p className='text-sm text-gray-400'>{message}</p>
      </div>
    </div>
  );
}
