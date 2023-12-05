import Image from 'next/image';
import Link from '@/app/(authenticated)/(dashboard)/inventory/assets/Link';
import Heart from '@/app/shared/assets/Heart';
import VideoActions from './VideoActions';
import { useMediaRecorder } from '@/app/providers/mediaRecorder';
import { getFormattedDuration } from '@/utils/helpers/tracks';

const VideoListItem = (video: VideoInstance) => {
  const { selectedRecording, setSelectedRecording } = useMediaRecorder();

  return (
    <div className='w-full' key={video.instanceId}>
      <div className='relative'>
        <div className='absolute top-4 left-4'>
          {video.isFavourite && <Heart />}
        </div>
        <div className='absolute top-4 right-4'>
          {video.isMinted && <Link />}
        </div>
        <Image
          onClick={() =>
            setSelectedRecording((p) => (p === video ? null : video))
          }
          className={`w-full rounded-xl mb-2 border hover:border-purple-9a transition-colors hover:cursor-pointer ${
            selectedRecording === video
              ? 'border-purple-9a/50'
              : 'border-transparent'
          }`}
          src={video.body.thumbnailUrl}
          alt={video.description}
          width={500}
          height={500}
        />
      </div>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h3>{video.name}</h3>
          <p className='text-xs truncate text-gray-400'>
            {getFormattedDuration(video.body.duration)}
          </p>
        </div>
        <VideoActions {...video} />
      </div>
    </div>
  );
};

export default VideoListItem;
