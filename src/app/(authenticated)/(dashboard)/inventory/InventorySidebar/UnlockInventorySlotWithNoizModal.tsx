import { useCurrentUser } from '@/app/providers/User';
import CoinPrice from '@/app/shared/CoinPrice';
import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import Toast from '@/app/shared/Toasts/Toast';
import Loading from '@/app/shared/assets/Loading';
import useRewards from '@/utils/hooks/rewards/useRewards';
import { useAnalytics } from '@/app/providers/analytics';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const UNLOCK_SLOT_VALUES = {
  '1-5': 200,
  '6-10': 1500,
  '11-15': 4500,
  '16-20': 10000,
  '21-25': 20000,
  '25-30': 50000,
};

const UnlockInventorySlotWithNoizModal = NiceModal.create(
  ({ numSlots = 5 }: { numSlots: number; price?: number }) => {
    const { user } = useCurrentUser();

    const { unlockInventorySlots } = useRewards();
    const modal = useModal();

    const { track } = useAnalytics();
    const [loading, setLoading] = useState(false);

    const price = useMemo(() => {
      const nextAdditionalSlot = (user?.allowedInventoryTrackSlots || 10) - 9;

      const [result] =
        Object.entries(UNLOCK_SLOT_VALUES).find(([range]) => {
          const [start, end] = range.split('-').map(Number);
          return nextAdditionalSlot >= start && nextAdditionalSlot <= end;
        }) || [];

      return UNLOCK_SLOT_VALUES[
        (result || '25-30') as keyof typeof UNLOCK_SLOT_VALUES
      ];
    }, [user?.allowedInventoryTrackSlots]);

    const handleUnlock = useCallback(async () => {
      setLoading(true);

      const success = await unlockInventorySlots({ price, slots: numSlots });

      setLoading(false);

      if (success) {
        track({
          category: 'spent_coins',
          action: 'track_slots',
          name: 'slots',
        });

        toast(<Toast type='success' title={`${numSlots} slots unlocked.`} />);

        modal.remove();
      }
    }, [modal, numSlots, price, track, unlockInventorySlots]);

    if (!modal.visible) return null;

    return (
      <Modal close={modal.remove}>
        <CenteredModalContent>
          <ModalBody className='w-[327px]'>
            <ModalHeader title='Save Slots' onClose={modal.remove} />
            <div className='text-sm font-[350] mb-[22px] text-center text-white/50'>
              Would you like to get more save slots to collect more songs?
            </div>
            <div className='mb-8 rounded-md border border-purple-9a bg-purple-9a/10 w-[85px] h-[85px] flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <div>{numSlots} slots</div>
                <CoinPrice {...{ price }} />
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <button
                disabled={loading}
                className='w-full btn btn-primary rounded-full flex justify-center items-center'
                onClick={() => handleUnlock()}
              >
                {loading ? <Loading className='text-white' /> : 'Get'}
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

export default UnlockInventorySlotWithNoizModal;
