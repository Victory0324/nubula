'use client';

import { useCallback, useState } from 'react';
import { useStems } from '../../providers/stems';

import { useOutputTrack } from '@/app/providers/outputTrack';
import ConfirmationModal from './ConfirmationModal';
import { useAudioPlayer } from '../../providers/audioPlayer';
import Tooltip from '@/app/shared/Tooltips/Tooltip';
import { useAnalytics } from '@/app/providers/analytics';
import X from '../../assets/X';

const ClearButton: React.FC = () => {
  const { setPlaying } = useAudioPlayer();
  const { outputTrack, setOutputTrack, creating } = useOutputTrack();
  const { reset } = useStems();
  const { track } = useAnalytics();

  const [showClearConfirmationModal, setShowClearConfirmationModal] =
    useState(false);

  const handleClear = useCallback(() => {
    reset();
    setOutputTrack(undefined);
    setShowClearConfirmationModal(false);

    if (outputTrack) {
      track({
        category: 'song',
        action: 'clear',
        name: outputTrack.itemId,
      });
    }
  }, [reset, setOutputTrack, track, outputTrack]);

  const onClear = useCallback(() => {
    setPlaying(false);
    if (outputTrack && !outputTrack.instanceId) {
      setShowClearConfirmationModal(true);
    } else {
      setShowClearConfirmationModal(false);
      handleClear();
    }
  }, [handleClear, outputTrack, setPlaying]);

  return (
    <div className='flex items-center'>
      <Tooltip content='This button will clear your currently selected track.'>
        <button type='button' disabled={creating} onClick={onClear}>
          <X />
        </button>
      </Tooltip>
      <ConfirmationModal
        shown={showClearConfirmationModal}
        close={() => setShowClearConfirmationModal(false)}
        onConfirm={handleClear}
      />
    </div>
  );
};

export default ClearButton;
