import { useMemo } from 'react';
import { useTracks } from '@/app/providers/tracks';
import { useModal } from '@ebay/nice-modal-react';
import UnlockInventorySlotWithNoizModal from './UnlockInventorySlotWithNoizModal';
import { useCurrentUser } from '@/app/providers/User';

export default function TrackLimit() {
  const { user } = useCurrentUser();

  const unlockModal = useModal(UnlockInventorySlotWithNoizModal);

  const { loading, error, tracks } = useTracks();

  const remainder = useMemo(() => {
    const unmintedTracks = tracks.filter((t) => !t.tokenId);

    const r = (user?.allowedInventoryTrackSlots || 10) - unmintedTracks.length;

    return r <= 0 ? 0 : r;
  }, [tracks, user?.allowedInventoryTrackSlots]);

  if (loading || error) {
    return null;
  }

  return (
    <button
      className='flex items-center relative group'
      onClick={() => unlockModal.show()}
    >
      <div className='flex items-center relative w-[200px] overflow-hidden h-[60px] mr-[10px]'>
        <div className='absolute w-[200px] right-0 group-hover:translate-x-0 translate-x-[200px] transition-transform inline-flex items-center px-1 py-1 font-bold text-2xs text-center text-white rounded-full gap-1 border border-pink-ff bg-pink-ff/20 uppercase backdrop-blur leading-5'>
          <div className='flex items-center justify-center w-5 h-5 rounded-full bg-pink-ff'>
            {remainder}
          </div>
          <span className='pr-2 '>Track Slots Left</span>
        </div>
      </div>
      <div
        className='text-2xl rounded-full absolute right-0 border-2 border-purple-9a backdrop-blur-xl w-[60px] h-[60px] flex items-center justify-center'
        onClick={() => unlockModal.show()}
      >
        +
      </div>
    </button>
  );
}
