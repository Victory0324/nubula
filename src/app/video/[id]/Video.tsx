import Loading from '@/app/shared/assets/Loading';
import useGetTemplate from '@/utils/hooks/templates/useGetTemplate';
import RecordingPlayback from '@/app/shared/RecordingPlayback';
import { getFormattedDuration } from '@/utils/helpers/tracks';

export default function Track({ id }: { id: string }) {
  const { data, loading, error } = useGetTemplate<VideoTemplate>({ id });

  if (loading) {
    return (
      <div className='w-full flex justify-center'>
        <Loading />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='w-full flex justify-center'>
        <div className='text-white'>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='my-8'>
        <div className='max-w-2xl'>
          <RecordingPlayback
            thumbnailUrl={data.body.thumbnailUrl}
            videoUrl={data.body.videoUrl}
          />
        </div>
      </div>
      <h2 className='text-xl font-bold'>{data?.body.name}</h2>
      <p className='mb-4 text-sm text-gray-400'>
        {getFormattedDuration(data?.body.duration)}
      </p>
    </div>
  );
}
