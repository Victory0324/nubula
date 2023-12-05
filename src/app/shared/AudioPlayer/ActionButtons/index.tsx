import { useMemo } from 'react';
import { useTracks } from '@/app/providers/tracks';
import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import DesktopPlayPause from '../DesktopPlayPause';
import BuyButton from './BuyButton';
import SaveButton from './SaveButton';
import DownloadButton from './DownloadButton';
import InventoryButton from './InventoryButton';
import CreateButton from './CreateButton';
import SmallCoin from '../../assets/SmallCoin';
import { useModal } from '@ebay/nice-modal-react';
import UnlockStemWithNoizModal from '@/app/(authenticated)/(dashboard)/nebula/Nebula/UnlockStemWithNoizModal';
import { useIsStemUnlocked } from '@/utils/hooks/stems/useIsStemUnlocked';
import { canTemporarilyUnlock } from '@/utils/helpers/stems';

const ActionButtons: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const unlockModal = useModal(UnlockStemWithNoizModal);
  const isStemUnlocked = useIsStemUnlocked();

  const { tracks } = useTracks();
  const { trackType, currentTrack } = useAudioPlayer();

  const isSaved = useMemo(() => {
    if (trackType === 'output') {
      return tracks.find((t) => t.body.itemId == currentTrack?.itemId);
    }

    return false;
  }, [tracks, currentTrack, trackType]);

  const isOwned = useMemo(() => {
    if (trackType === 'output') {
      const found = tracks.find((t) => t.body.itemId == currentTrack?.itemId);

      // if it's in the inventory
      // and has a tokenId then it
      // is owned.
      return !!found?.tokenId;
    }
  }, [tracks, currentTrack, trackType]);

  return (
    <>
      {
        // mobile
        // not we dont show the inventory
        // button on mobile because of space issues
        mobile && (
          <div className='flex justify-between gap-2 lg:hidden'>
            <>
              {trackType === 'empty' ? (
                <></>
              ) : trackType === 'input' ? (
                <CreateButton />
              ) : trackType === 'output' && isSaved ? (
                <></>
              ) : trackType === 'output' ? (
                <SaveButton />
              ) : (
                <BuyButton disabled className='btn-pinched-br' />
              )}
              {trackType === 'output' ? (
                <>
                  <DownloadButton
                    className={`btn-pinched-bl ${!isOwned && 'hidden'}`}
                  />
                  <BuyButton
                    className={`btn-pinched-bl ${isOwned && 'hidden'}`}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          </div>
        )
      }

      {
        // desktop
        !mobile && (
          <div className='flex-row justify-between hidden lg:flex'>
            <div
              className='
              w-4/12
              px-3
              pt-2
              relative
            '
            >
              <div className='h-[42px]'>
                {trackType === 'empty' ? (
                  <></>
                ) : trackType === 'output' && isSaved ? (
                  <InventoryButton />
                ) : trackType === 'output' ? (
                  <SaveButton />
                ) : trackType === 'input' &&
                  !isStemUnlocked(currentTrack as InputStem) ? (
                  <>
                    <button
                      disabled={
                        !canTemporarilyUnlock(currentTrack as InputStem)
                      }
                      className='btn btn-secondary btn-pinched-br w-full flex justify-center items-center  border-white bg-transparent'
                      onClick={() =>
                        unlockModal.show({
                          unlockId: (currentTrack as InputStem).unlockId,
                        })
                      }
                    >
                      <div className='flex gap-2 items-center'>
                        <SmallCoin />
                        <span className='font-bold text-[15px]'>50</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <BuyButton disabled className='btn-pinched-br' />
                )}
              </div>
            </div>

            <DesktopPlayPause />

            <div
              className='
                w-1/3
                px-3
                pt-2
                relative
              '
            >
              <div className='h-[42px]'>
                {trackType === 'input' ? (
                  <CreateButton />
                ) : trackType === 'output' ? (
                  <>
                    <DownloadButton
                      className={`btn-pinched-bl ${!isOwned && 'hidden'}`}
                    />
                    <BuyButton
                      className={`btn-pinched-bl ${isOwned && 'hidden'}`}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default ActionButtons;
