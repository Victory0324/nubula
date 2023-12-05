import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';

import NextIcon from '../assets/NextIcon';
import PrevIcon from '../assets/PrevIcon';
import PlayFull from '../assets/PlayFull';
import PauseFull from '../assets/PauseFull';

interface FwdPrevProps {
  selectedOutputStem?: OutputTrackStem;
  setSelectedOutputStem: Dispatch<SetStateAction<OutputTrackStem | undefined>>;
  outputTrack?: OutputTrack;
}

export const handleKorusOnFwd = ({
  setSelectedOutputStem,
  selectedOutputStem,
  outputTrack,
}: FwdPrevProps) => {
  if (!outputTrack || !outputTrack.stems) return;

  if (!selectedOutputStem) {
    // no selectedOutputStem, which means ouptutTrack is playing
    // set selectedOutputStem to the first stem
    setSelectedOutputStem(outputTrack.stems[0]);
  } else {
    // get the current index of the selected stem
    const index = outputTrack.stems.findIndex(
      (stem) => stem.itemId === selectedOutputStem.itemId
    );

    // if the index is the last stem, then set selected stem to undefined
    const isLastStem =
      index === (outputTrack.stems || []).length - 1 || index === undefined;

    if (isLastStem) {
      setSelectedOutputStem(undefined);
    } else {
      // otherwise, set the next stem as the selected stem
      setSelectedOutputStem(outputTrack.stems[index + 1]);
    }
  }
};

export const handleKorusOnPrev = ({
  setSelectedOutputStem,
  selectedOutputStem,
  outputTrack,
}: FwdPrevProps) => {
  if (!outputTrack || !outputTrack.stems) return;

  if (!selectedOutputStem) {
    // no selectedOutputStem, which means ouptutTrack is playing
    // set selectedOutputStem to the first stem
    setSelectedOutputStem(outputTrack.stems[outputTrack.stems.length - 1]);
  } else {
    // get the current index of the selected stem
    const index = outputTrack.stems.findIndex(
      (stem) => stem.itemId === selectedOutputStem.itemId
    );

    // if the index is the first stem, then set selected stem to undefined
    if (index === 0 || !index) {
      setSelectedOutputStem(undefined);
    } else {
      // otherwise, set the last stem as the selected stem
      setSelectedOutputStem(outputTrack.stems[index - 1]);
    }
  }
};

const DesktopPlayPause = () => {
  const pathname = usePathname();
  const { playing, setPlaying, waveformReady, currentTrack } = useAudioPlayer();
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
    <div
      className='
        flex
        w-1/3
        justify-center
        items-center
        relative
        pb-1
      '
    >
      {shouldShowPlayPause && (
        <button
          className='hover:cursor-pointer
      hover:disabled:cursor-not-allowed pr-1'
          onClick={onPrev}
        >
          <PrevIcon />
        </button>
      )}
      <button
        disabled={!currentTrack || !waveformReady}
        className='hover:cursor-pointer
      hover:disabled:cursor-not-allowed'
        onClick={() => setPlaying((p) => !p)}
      >
        {playing ? (
          <PauseFull height={40} width={40} />
        ) : (
          <PlayFull height={40} width={40} />
        )}
      </button>
      {shouldShowPlayPause && (
        <button
          className='hover:cursor-pointer
      hover:disabled:cursor-not-allowed pl-1'
          onClick={onFwd}
        >
          <NextIcon />
        </button>
      )}
    </div>
  );
};

export default DesktopPlayPause;
