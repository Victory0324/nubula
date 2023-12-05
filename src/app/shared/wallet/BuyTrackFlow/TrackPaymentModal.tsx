import useMintContractInfo from '@/utils/hooks/mints/useMintContract';
import useMintTrack from '@/utils/hooks/mints/useMintTrack';
import { useCallback } from 'react';
import PaymentModal from '../PaymentModal';
import useDownload from '@/utils/hooks/tracks/useDownload';
import { useSFX } from '@/app/providers/sfx';
import { useTracks } from '@/app/providers/tracks';
import useCompleteOn3Quest from '@/utils/hooks/quests/on3/useTrackOn3Quest';
import { useAnalytics } from '@/app/providers/analytics';

const TrackPaymentModal = ({
  track,
  instanceId,
  onSuccess = () => null,
  onError = () => null,
  onClose = () => null,
}: {
  track: OutputTrack;
  instanceId?: string;
  onSuccess?: () => void;
  onError?: () => void;
  onClose?: () => void;
}) => {
  const contractInfo = useMintContractInfo({
    track: true,
    unlockId: track?.unlockId,
  });
  const mintTrack = useMintTrack();
  const { download, preparing } = useDownload(track.itemId);
  const { onTrackOwned } = useSFX();
  const { refetch: refetchTracks } = useTracks();
  const { track: trackEvent } = useAnalytics();
  const completeOn3Quest = useCompleteOn3Quest();

  const wrappedOnSuccess = useCallback(() => {
    onSuccess();
    completeOn3Quest('MINT_ONE_TRACK');
    onTrackOwned();
    refetchTracks();
    trackEvent({
      category: 'song',
      action: 'mint_success',
      name: track.itemId,
    });
  }, [
    onSuccess,
    completeOn3Quest,
    onTrackOwned,
    refetchTracks,
    trackEvent,
    track.itemId,
  ]);

  return (
    <PaymentModal
      onClose={() => {
        onClose();
      }}
      onPayWithCrypto={(quantity: number) => {
        if (!instanceId) {
          console.error('No instanceId');
          return Promise.resolve({ success: false });
        } else
          return mintTrack({
            instanceId,
            quantity,
            transactionType: 'Wallet',
          });
      }}
      itemType='track'
      itemName={track.name || track.generatedTrackName}
      instanceId={instanceId}
      contract={contractInfo}
      quantity={1}
      showQuantity={false}
      onError={onError}
      onSuccess={wrappedOnSuccess}
      successMessage={
        <>
          <p>
            Congratulations! You now own your creation and it has been added to
            your inventory.
          </p>
          <p>Enjoy sharing it with the world!</p>
        </>
      }
      successCTAs={
        <>
          <button
            disabled={preparing}
            className='btn btn-primary btn-pinched-br w-full'
            onClick={download}
          >
            {preparing ? 'Preparing Download...' : 'Download'}
          </button>
          <button
            className='btn btn-secondary btn-pinched-br w-full'
            onClick={onClose}
          >
            Close
          </button>
        </>
      }
    />
  );
};

export default TrackPaymentModal;
