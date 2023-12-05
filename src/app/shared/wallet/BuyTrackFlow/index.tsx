import { useEffect, useState } from 'react';
import Modal from '../../Modal';
import CenteredModalContent from '../../Modal/CenteredContent';
import WalletConnect from '../Connect';
import { useAnalytics } from '@/app/providers/analytics';
import TrackPaymentModal from './TrackPaymentModal';
import TrackRenameModal from './TrackRenameModal';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useWallet } from '@/app/providers/Wallet';

export type BuyTrackFlowSteps =
  | 'start'
  | 'rename'
  | 'walletConnect'
  | 'paymentModal';

const BuyTrackFlow = NiceModal.create(
  ({
    track,
    instanceId,
    onError,
    onClose,
  }: {
    track: OutputTrack;
    instanceId?: string;
    onSuccess?: () => void;
    onError?: () => void;
    onClose?: () => void;
  }) => {
    const { track: trackEvent } = useAnalytics();
    const modal = useModal();
    const [step, setStep] = useState<BuyTrackFlowSteps>('start');
    const { walletAddress } = useWallet();

    useEffect(() => {
      if (step === 'start') {
        trackEvent({
          category: 'song',
          action: 'mint_start',
          name: track.itemId,
        });
      }
    }, [trackEvent, step, track.itemId]);

    useEffect(() => {
      if (step === 'start') {
        if (!walletAddress) {
          setStep('walletConnect');
        } else {
          setStep('rename');
        }
      }
    }, [walletAddress, setStep, step]);

    if (!modal.visible) return null;

    return (
      <>
        {step === 'walletConnect' ? (
          <WalletConnect onConnect={() => setStep('rename')} />
        ) : (
          <Modal>
            <CenteredModalContent>
              {step === 'paymentModal' && (
                <TrackPaymentModal
                  track={track}
                  instanceId={instanceId}
                  onError={onError}
                  onClose={() => {
                    onClose && onClose();
                    modal.remove();
                  }}
                />
              )}
              {step === 'rename' && (
                <TrackRenameModal
                  {...{ track, instanceId }}
                  onAccept={() => setStep('paymentModal')}
                  onCancel={() => {
                    setStep('start');
                    onClose && onClose();
                    modal.remove();
                  }}
                />
              )}
            </CenteredModalContent>
          </Modal>
        )}
      </>
    );
  }
);

export default BuyTrackFlow;
