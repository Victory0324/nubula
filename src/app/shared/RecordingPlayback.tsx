'use client';

const RecordingPlayback = ({
  videoUrl,
  thumbnailUrl,
}: {
  videoUrl: string;
  thumbnailUrl: string;
}) => {
  return (
    <div className='w-full h-full relative'>
      <video
        className='w-full h-full'
        src={videoUrl}
        poster={thumbnailUrl}
        controls
        autoPlay
      />
    </div>
  );
};

export default RecordingPlayback;
