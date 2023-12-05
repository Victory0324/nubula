import { useCallback } from 'react';
import PaymentModal, { PaymentModalProps } from './PaymentModal';
import { useAnalytics } from '@/app/providers/analytics';
import useMintContractInfo from '@/utils/hooks/mints/useMintContract';

type Props = Omit<PaymentModalProps, 'itemType' | 'itemName' | 'contract'> & {
  kor: Pick<Kor, 'korUnlockId' | 'korName'> | undefined;
};

// convenience wrapper around PaymentModal for kor owned.
export default function BuyKorFlow({ kor, onSuccess, ...props }: Props) {
  const { track } = useAnalytics();

  const contractInfo = useMintContractInfo({
    unlockId: kor?.korUnlockId,
  });

  const wrappedOnSuccess = useCallback(async () => {
    await onSuccess();

    if (kor) {
      track({
        category: 'kor',
        action: 'buy_kor',
        name: kor.korUnlockId,
      });
    }
  }, [onSuccess, kor, track]);

  if (!kor) {
    return;
  }

  return (
    <PaymentModal
      {...props}
      itemType='kor'
      itemName={kor?.korName || 'Need name'}
      onSuccess={wrappedOnSuccess}
      contract={contractInfo}
    />
  );
}
