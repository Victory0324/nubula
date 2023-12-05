import Music from '@/app/shared/assets/Music';

export default function EmptyTrackList({ item = 'track' }: { item?: string }) {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <div className='p-4'>
          <Music />
        </div>
        <p>{`You've no ${item}s yet`}</p>
        <p className='text-sm text-gray-400'>
          Create a {item} to see them here
        </p>
      </div>
    </div>
  );
}
