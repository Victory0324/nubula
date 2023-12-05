'use client';

import { useMediaRecorder } from '@/app/providers/mediaRecorder';
import RecordingPlayback from '@/app/shared/RecordingPlayback';

const VideoRecording = () => {
  const { selectedRecording, setSelectedRecording } = useMediaRecorder();

  return (
    <div className='w-full h-full relative'>
      <div className='absolute right-0 bottom-[40px] h-[55px] flex items-center justify-center'>
        <button
          onClick={() => setSelectedRecording(null)}
          className='btn btn-primary rounded-full flex items-center justify-center mr-[70px] lg:mr-[85px] text-white z-50'
        >
          Back to scene
        </button>
      </div>
      {selectedRecording ? (
        <RecordingPlayback
          thumbnailUrl={selectedRecording.body.thumbnailUrl}
          videoUrl={selectedRecording.body.videoUrl}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default VideoRecording;
