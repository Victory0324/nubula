import { useCurrency } from '@/app/providers/currency';
import { useMints } from '@/app/providers/mints';
import CoinPrice from '@/app/shared/CoinPrice';
import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import Toast from '@/app/shared/Toasts/Toast';
import Loading from '@/app/shared/assets/Loading';
import { useAnalytics } from '@/app/providers/analytics';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const UnlockStemWithNoizModal = NiceModal.create(
  ({ unlockId, price = 50 }: { unlockId: string; price?: number }) => {
    const { setSessionUnlockedIds } = useMints();
    const { deductNoizBalance } = useCurrency();
    const { track } = useAnalytics();

    const modal = useModal();
    const [loading, setLoading] = useState(false);

    const handleUnlock = useCallback(async () => {
      setLoading(true);
      const success = await deductNoizBalance(price);
      setLoading(false);

      if (success) {
        track({
          category: 'spent_coins',
          action: 'stems_unlock',
          name: unlockId,
        });
        setSessionUnlockedIds((p) => [...p, unlockId]);
        toast(<Toast type='success' title={`Stem unlocked.`} />);
        modal.remove();
      }
    }, [
      deductNoizBalance,
      modal,
      price,
      setSessionUnlockedIds,
      track,
      unlockId,
    ]);

    if (!modal.visible) return null;

    return (
      <Modal close={modal.remove}>
        <CenteredModalContent>
          <ModalBody className='w-[327px]'>
            <ModalHeader title='Unlock Stem' onClose={modal.remove} />
            <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
              Create a track with this stem this session!
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <button
                disabled={loading}
                className='w-full btn btn-primary rounded-full flex justify-center items-center'
                onClick={() => handleUnlock()}
              >
                {loading ? (
                  <Loading className='text-white' />
                ) : (
                  <CoinPrice {...{ price }} />
                )}
              </button>
              <button
                disabled={loading}
                className='w-full btn btn-secondary rounded-full'
                onClick={() => modal.remove()}
              >
                Cancel
              </button>
            </div>
          </ModalBody>
        </CenteredModalContent>
      </Modal>
    );
  }
);

export default UnlockStemWithNoizModal;
