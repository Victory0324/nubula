import WaveForm from '@/app/(authenticated)/(dashboard)/inventory/assets/WaveForm';
import Play from '../assets/Play';
import Image from 'next/image';

export default function TrackImage({
  isPlaying,
  trackName,
  artworkImageUrl,
}: {
  isPlaying: boolean;
  artworkImageUrl: string | undefined;
  trackName: string;
}) {
  return (
    <div className='relative'>
      <div className='w-[56px] h-[56px] relative bg-transparent'>
        {artworkImageUrl && (
          <Image
            src={artworkImageUrl}
            fill
            alt={`Album artwork for ${trackName}`}
          />
        )}
      </div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {isPlaying ? (
          <WaveForm className='text-purple-9a' />
        ) : (
          <Play width='100%' />
        )}
      </div>
    </div>
  );
}
