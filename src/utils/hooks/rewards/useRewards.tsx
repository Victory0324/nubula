import { useCurrency } from '@/app/providers/currency';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/app/providers/User';
import { useUpdateUser } from '@/utils/api/authenticated/elyxnir/user/updateUser';
import Toast from '@/app/shared/Toasts/Toast';

export default function useRewards() {
  const { noizBalance, deductNoizBalance } = useCurrency();
  const { user } = useCurrentUser();
  const updateUser = useUpdateUser();

  const unlockInventorySlots = useCallback(
    async ({ price, slots }: { price: number; slots: number }) => {
      if ((noizBalance || 0) - price <= 0) {
        toast(<Toast type='error' title={`Insufficient balance.`} />);
        return false;
      } else {
        try {
          const slotsBeforeUpdate = user?.allowedInventoryTrackSlots || 10;

          const { success: patchSuccess } = await updateUser({
            allowedInventoryTrackSlots: slotsBeforeUpdate + slots,
          });

          if (!patchSuccess) throw new Error('Failed to update user slots.');

          const success = await deductNoizBalance(price);

          if (!success) {
            const { success: rollbackPatchSuccess } = await updateUser({
              allowedInventoryTrackSlots: slotsBeforeUpdate,
            });

            if (!rollbackPatchSuccess)
              throw new Error('Failed to rollback user slots.');

            throw new Error('Failed to deduct balance.');
          }
        } catch (e) {
          console.error(e);
          toast(<Toast type='error' title={`Sorry, something went wrong.`} />);

          return false;
        }
      }

      return true;
    },
    [
      deductNoizBalance,
      noizBalance,
      updateUser,
      user?.allowedInventoryTrackSlots,
    ]
  );

  return { unlockInventorySlots };
}
