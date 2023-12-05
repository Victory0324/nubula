import { useCallback, useState } from 'react';
import Waveform from './Waveform';
import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import MobilePlayPause from './MobilePlayPause';
import TitleSection from './TitleSection';
import MobileHeader from './MobileHeader';
import ActionButtons from './ActionButtons';
import Recreate from './assets/Recreate';
import Tooltip from '../Tooltips/Tooltip';
import FavoriteButton from './FavoriteButton';
import { useEffect } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import RecreateModal from '@/app/(authenticated)/(dashboard)/output/OutputSidebar/RecreateModal';
import ClearButton from '@/app/(authenticated)/(dashboard)/nebula/NebulaSidebar/ClearCreateButtons';
import ShareButton from './ShareButton';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { usePathname } from 'next/navigation';

const AudioPlayer = () => {
  const {
    playing,
    setPlaying,
    waveformRef,
    setWaveformReady,
    waveformReady,
    currentTrack,
    trackName,
    trackType,
    setAverageFrequency,
  } = useAudioPlayer();
  const recreateModal = useModal(RecreateModal);
  const { creating } = useOutputTrack();
  const [newTrackName, setNewTrackName] = useState(trackName);
  const pathname = usePathname();

  useEffect(() => {
    // anytime the track changes
    // we want to reset our "newtrackname".
    setNewTrackName(trackName);
  }, [trackName]);

  useEffect(() => {
    if (!creating && pathname === '/output') {
      setPlaying(true);
    }
  }, [creating, setPlaying, pathname]);

  const onRecreate = useCallback(async () => {
    recreateModal.show();
  }, [recreateModal]);

  return (
    <div
      className={`
        w-full
        flex flex-col
        justify-between
        lg:grow
        fixed lg:static

        bottom-0 lg:unset
        left-0 lg:left-auto

        

        pl-5 lg:pl-2
        pr-5 lg:pr-2
        pb-3 lg:pb-4
        transition-all
        ${currentTrack ? 'h-[225px]' : 'h-[0px]'}
        bg-gray-13 
        bg-gradient-to-t from-purple-3a/50 to-40% to-gray-13
        lg:h-[265px]
    `}
    >
      <MobileHeader />

      <div
        className='
          flex
          flex-col
          grow
     '
      >
        <TitleSection
          newTrackName={newTrackName}
          setNewTrackName={setNewTrackName}
        />
        <div className=''>
          <div className='flex justify-center mb-5 mx-5 mt-2'>
            <Waveform
              playing={playing}
              setPlaying={setPlaying}
              waveformRef={waveformRef}
              waveformReady={waveformReady}
              setWaveformReady={setWaveformReady}
              setAverageFrequency={setAverageFrequency}
              track={currentTrack}
            />
          </div>
          <div className='flex justify-between mr-5 ml-5 gap-2'>
            {trackType === 'output' && (
              <div className='flex gap-2 items-center'>
                <Tooltip content='Click here to recreate a track from this stem.'>
                  <div
                    className='flex items-center cursor-pointer'
                    onClick={onRecreate}
                  >
                    <Recreate />
                  </div>
                </Tooltip>
                <ClearButton />
              </div>
            )}
            <MobilePlayPause />

            <div className='flex justify-end'>
              {/* on mobile: show the action button */}
              <ActionButtons mobile={true} />
              {/* on desktop: show the favorite button */}
              {pathname === '/output' ? (
                <div className='hidden lg:flex'>
                  <ShareButton disabled={trackType !== 'output'} />
                </div>
              ) : (
                <div className='hidden lg:block'>
                  <FavoriteButton newTrackName={newTrackName} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ActionButtons mobile={false} />
    </div>
  );
};

export default AudioPlayer;
