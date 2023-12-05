import poll from '@/utils/helpers/pollRequest';
import { useCallback } from 'react';
import useMintFactorySdk from './useMintFactorySdk';
import getTransactionStatus from '@/utils/api/paper/getTransactionStatus';
import { useRecordMintTransaction } from '@/utils/api/authenticated/elyxnir/inventory/recordMintTransaction';

export default function usePaperMintCheckout() {
  const recordMintTransaction = useRecordMintTransaction();

  const { completeMintingTracks } = useMintFactorySdk();

  const onCheckoutSuccess = useCallback(
    async ({
      transactionHash,
      itemType,
      instanceId,
      onSuccess,
      onError,
      contractAddress,
    }: {
      transactionHash: string;
      itemType: 'track' | 'kor';
      instanceId?: string;
      onSuccess: () => Promise<void>;
      onError: () => void;
      contractAddress: string;
    }) => {
      try {
        if (itemType === 'track' && !instanceId) {
          throw "Can't mint track without instanceId";
        } else if (itemType === 'track') {
          const { success } = await recordMintTransaction({
            transactionType: 'Card',
            transactionHash,
            instanceId: instanceId as string,
          });

          if (!success) {
            throw 'Error posting transaction hash';
          }
        }

        // Poll process transaction with inventory/transaction-status
        let { success, data } = await poll(
          () => {
            return getTransactionStatus({
              transactionId: transactionHash,
            });
          },
          ({ success, data }) => {
            if (data?.status === 'PAYMENT_REFUNDED') throw 'Payment refunded';
            return success && data?.status !== 'TRANSFER_SUCCEEDED';
          },
          3000
        );

        if (!success) {
          throw 'Error getting transaction status';
        }

        if (itemType !== 'track') {
          onSuccess();
        } else {
          const transfers = data?.claimedTokens.tokens;

          if (transfers) {
            const { success } = await completeMintingTracks({
              transfers,
              instanceId: instanceId as string,
              contractAddress,
            });

            if (success) {
              onSuccess();
            } else {
              throw 'Error completing minting tracks';
            }
          }
        }
      } catch (e) {
        console.error(e);
        onError();
      }
    },
    [completeMintingTracks, recordMintTransaction]
  );

  return { onCheckoutSuccess };
}
