import { useCallback, useMemo, useState } from 'react';

import { useAudioPlayer } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';

import { useMints } from '../../../providers/mints';

import BuyTrackFlow from '../../wallet/BuyTrackFlow';
import usePostTrack from '@/utils/hooks/tracks/usePostTrack';
import Loading from '../../assets/Loading';
import { useOutputTrack } from '@/app/providers/outputTrack';
import { useModal } from '@ebay/nice-modal-react';
import { useIsStemUnlocked } from '@/utils/hooks/stems/useIsStemUnlocked';

const BuyButton = ({
  disabled = false,
  className,
}: {
  disabled?: boolean;
  className: string;
}) => {
  const [loading, setLoading] = useState(false);
  const isStemUnlocked = useIsStemUnlocked();

  const { unlockedIds } = useMints();
  const { currentTrack, trackType } = useAudioPlayer();
  const { setOutputTrack } = useOutputTrack();
  const buyTrackFlow = useModal(BuyTrackFlow);

  const postTrack = usePostTrack();

  const allowBuy = useMemo(() => {
    if (!currentTrack) return false;

    if (trackType === 'input') {
      return !isStemUnlocked(currentTrack as InputStem);
    } else {
      return trackType === 'output';
    }
  }, [currentTrack, isStemUnlocked, trackType]);

  const onBuyButtonClick = useCallback(async () => {
    setLoading(true);

    const track = currentTrack as OutputTrack;
    let instanceId = track.instanceId;

    if (!instanceId) {
      try {
        instanceId = await postTrack({
          outputTrack: track,
          ignoreLimit: true,
          saveType: 'own',
        });

        setOutputTrack((p) => ({ ...p, instanceId }) as OutputTrack);
      } catch (e) {
        setLoading(false);
      }
    }

    if (currentTrack && currentTrack.itemType === 'track') {
      buyTrackFlow.show({
        track: track,
        instanceId: instanceId,
        onError: () => setLoading(false),
        onClose: () => setLoading(false),
      });
    }
  }, [currentTrack, postTrack, setOutputTrack, buyTrackFlow]);

  return (
    <>
      <button
        disabled={disabled || !allowBuy || loading}
        onClick={onBuyButtonClick}
        className={`btn btn-primary w-full py-2 ${className} flex justify-center`}
      >
        {loading ? <Loading className='text-white' /> : 'Own'}
      </button>
    </>
  );
};

export default BuyButton;
