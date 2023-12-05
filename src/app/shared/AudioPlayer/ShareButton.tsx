import ExternalLink from '@/app/(authenticated)/(dashboard)/inventory/assets/ExternalLink';
import ShareModal from '../ShareModal';
import { useCallback } from 'react';

import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import { absoluteURL } from '@/utils/helpers/urls';
import Tooltip from '../Tooltips/Tooltip';
import { useAnalytics } from '@/app/providers/analytics';
import { useModal } from '@ebay/nice-modal-react';

const ShareButton = ({ disabled }: { disabled?: boolean }) => {
  const { track } = useAnalytics();
  const { currentTrack, trackType } = useAudioPlayer();
  const shareModal = useModal(ShareModal);

  const onShare = useCallback(async () => {
    if (currentTrack) {
      track({
        category: 'share',
        action: 'open_sharing',
        name: currentTrack.itemId,
      });

      if (navigator.share) {
        await navigator.share({
          url: absoluteURL(`/track/${currentTrack.itemId}`),
        });
      } else {
        // fallback without native sharing
        shareModal.show({ url: `/track/${currentTrack?.itemId}` });
      }
    }
  }, [currentTrack, track, shareModal]);

  return (
    <>
      <Tooltip content='Share this track'>
        <button
          className='group hover:cursor-pointer hover:disabled:cursor-not-allowed lg:block'
          disabled={disabled || !currentTrack || trackType != 'output'}
          onClick={onShare}
        >
          <ExternalLink className='text-white hover:text-purple-9a group-disabled:text-gray-999/50 transition-colors' />
        </button>
      </Tooltip>
    </>
  );
};

export default ShareButton;
