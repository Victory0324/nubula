import DownArrow from '@/app/shared/assets/DownArrow';

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} className='relative self-start pl-3 cursor-pointer'>
      <DownArrow className='rotate-90 absolute -top-6 position-' />
    </div>
  );
}
