import { useCallback, useEffect, useMemo, useState } from 'react';
import { useKors } from '@/app/providers/kors';
import { useAnalytics } from '@/app/providers/analytics';
import { useMints } from '@/app/providers/mints';

import Loading from '@/app/shared/assets/Loading';
import useMintPreviewKor from '@/utils/hooks/mints/useMintPreviewKor';
import KorLockedModal from './modals/KorLockedModal';
import WalletConnect from '@/app/shared/wallet/Connect';
import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import BuyKorFlow from '@/app/shared/wallet/BuyKorFlow';
import SuccessModal from './modals/SuccessModal';
import Purchasing from '@/app/shared/wallet/PaymentModal/steps/Purchasing';
import { claimWithPaper } from '@/utils/api/authenticated/elyxnir/inventory/claimWithPaper';
import ErrorStep from '@/app/shared/wallet/PaymentModal/steps/Error';
import { getKorUnlockIds } from '@/utils/helpers/mints';
import { useWallet } from '@/app/providers/Wallet';
import { useModal } from '@ebay/nice-modal-react';

const BuySelectButton = () => {
  const korSuccessModal = useModal(SuccessModal);

  const { loading: mintsLoading, fetchMints } = useMints();
  const {
    previewKorId,
    previewKorIndex,
    saveSelectedKor,
    loading,
    korUnlockIds,
    previewKor,
    selectedKor,
  } = useKors();
  const { walletAddress } = useWallet();
  const mintPreviewKor = useMintPreviewKor();
  const { track } = useAnalytics();

  const [step, setStep] = useState('success');

  useEffect(() => {
    if (step !== 'success') korSuccessModal.remove();
  }, [korSuccessModal, previewKor, step]);

  const isLoading = useMemo(
    () => loading || mintsLoading,
    [loading, mintsLoading]
  );

  const allowBuy = useMemo(() => {
    return !isLoading && previewKorId && !korUnlockIds?.includes(previewKorId);
  }, [isLoading, previewKorId, korUnlockIds]);

  const onSelect = useCallback(() => {
    if (allowBuy) {
      setStep('intro');
    } else if (previewKor) {
      track({
        category: 'kor',
        action: 'change_kor',
        name: previewKor.korName,
      });

      saveSelectedKor({
        korUnlockId: previewKor.korUnlockId,
        selectedIndex: previewKorIndex,
      });
    }
  }, [allowBuy, previewKor, previewKorIndex, saveSelectedKor, track]);

  const handleOwnSuccess = useCallback(async () => {
    await saveSelectedKor({
      korUnlockId: previewKorId,
      selectedIndex: previewKorIndex,
    });

    let updatedMints = [] as TokenData[];

    while (!getKorUnlockIds(updatedMints).includes(previewKorId as string)) {
      updatedMints = await fetchMints();
    }

    setStep('success');
    korSuccessModal.show({ kor: previewKor, setStep });
  }, [
    fetchMints,
    korSuccessModal,
    previewKor,
    previewKorId,
    previewKorIndex,
    saveSelectedKor,
  ]);

  const handleFreeUnlock = useCallback(async () => {
    if (!previewKor) {
      setStep('');
      return;
    }

    setStep('processing');

    const { success } = await claimWithPaper({
      contractId: previewKor.contractAddresses.PaperContractId,
      type: 'unlock',
    });

    if (success) {
      track({
        category: 'kor',
        action: 'claim_kor',
        name: previewKor.korName,
      });

      await handleOwnSuccess();
    } else setStep('error');
  }, [handleOwnSuccess, previewKor, track]);

  const onUnlockButtonClick = useCallback(async () => {
    if (!walletAddress) {
      setStep('walletConnect');
    } else if (!previewKor?.isKORClaimed) {
      handleFreeUnlock();
    } else {
      setStep('paymentModal');
    }
  }, [walletAddress, handleFreeUnlock, previewKor]);

  return (
    <>
      <button
        disabled={isLoading || !previewKorId || previewKor === selectedKor}
        className='btn btn-primary btn-pinched-bl w-1/2 flex items-center justify-center'
        onClick={onSelect}
      >
        {isLoading ? (
          <Loading className='text-white' />
        ) : allowBuy ? (
          'Unlock'
        ) : (
          'Select'
        )}
      </button>

      {step === 'intro' && (
        <KorLockedModal {...{ setStep, onUnlockButtonClick }} />
      )}
      {step === 'walletConnect' && (
        <WalletConnect onConnect={() => setStep('paymentModal')} />
      )}
      {step === 'paymentModal' && (
        <Modal close={() => setStep('')}>
          <CenteredModalContent>
            <BuyKorFlow
              kor={previewKor}
              onClose={() => setStep('')}
              onPayWithCrypto={mintPreviewKor}
              quantity={1}
              showQuantity={false}
              onError={() => null}
              onSuccess={handleOwnSuccess}
              successMessage={<p>Congratulations! You now own a GenKOR.</p>}
              successCTAs={
                <>
                  <button
                    className='btn btn-primary btn-pinched-br w-full'
                    onClick={() => setStep('')}
                  >
                    Use
                  </button>
                  <button
                    className='btn btn-secondary btn-pinched-br w-full'
                    onClick={() => setStep('')}
                  >
                    Close
                  </button>
                </>
              }
            />
          </CenteredModalContent>
        </Modal>
      )}
      {step === 'processing' && (
        <Modal close={() => setStep('')}>
          <CenteredModalContent>
            <Purchasing />
          </CenteredModalContent>
        </Modal>
      )}
      {step === 'error' && (
        <Modal close={() => setStep('')}>
          <CenteredModalContent>
            <ErrorStep onClose={() => setStep('')} />
          </CenteredModalContent>
        </Modal>
      )}
    </>
  );
};

export default BuySelectButton;
