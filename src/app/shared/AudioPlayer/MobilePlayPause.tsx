import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { handleKorusOnFwd, handleKorusOnPrev } from './DesktopPlayPause';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import PrevIcon from '../assets/PrevIcon';
import PauseFull from '../assets/PauseFull';
import PlayFull from '../assets/PlayFull';
import NextIcon from '../assets/NextIcon';

const MobilePlayPause: React.FC = () => {
  const pathname = usePathname();
  const { playing, setPlaying, currentTrack } = useAudioPlayer();
  const { outputTrack } = useOutputTrack();
  const { selectedOutputStem, setSelectedOutputStem } = useStems();

  const shouldShowPlayPause = useMemo(() => {
    if (pathname.includes('output')) {
      return true;
    } else {
      return false;
    }
  }, [pathname]);

  const onPrev = () => {
    if (pathname.includes('output')) {
      handleKorusOnPrev({
        setSelectedOutputStem,
        selectedOutputStem,
        outputTrack,
      });
    } else {
      console.error('need to implement prev track logic for this path');
    }
  };

  const onFwd = () => {
    if (pathname.includes('output')) {
      handleKorusOnFwd({
        setSelectedOutputStem,
        selectedOutputStem,
        outputTrack,
      });
    } else {
      console.error('need to implement prev track logic for this path');
    }
  };

  return (
    <div className='flex'>
      {shouldShowPlayPause && (
        <button
          className='
            lg:invisible
            hover:cursor-pointer
            hover:disabled:cursor-not-allowed'
          onClick={onPrev}
        >
          <PrevIcon height={20} width={20} />
        </button>
      )}
      <button
        key='mobile-pause'
        disabled={!currentTrack}
        className='lg:invisible'
        onClick={() => setPlaying((p) => !p)}
      >
        {playing ? (
          <PauseFull height={30} width={30} />
        ) : (
          <PlayFull height={30} width={30} />
        )}
      </button>
      {shouldShowPlayPause && (
        <button
          className='lg:invisible
            hover:cursor-pointer
            hover:disabled:cursor-not-allowed'
          onClick={onFwd}
        >
          <NextIcon height={20} width={20} />
        </button>
      )}
    </div>
  );
};

export default MobilePlayPause;
