import { useRouter } from '@/app/providers/router';

import { useKors } from '@/app/providers/kors';
import { useAnalytics } from '@/app/providers/analytics';

import { useCallback, useEffect, useMemo, useState } from 'react';
import WalletConnect from '@/app/shared/wallet/Connect';
import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';

import useMintPreviewKor from '@/utils/hooks/mints/useMintPreviewKor';
import { useMints } from '@/app/providers/mints';
import Loading from '@/app/shared/assets/Loading';
import { useBackgrounds } from '@/app/providers/backgrounds';
import SwitchKorsModal from './SwitchKorsModal';
import BuyKorFlow from '@/app/shared/wallet/BuyKorFlow';
import { claimWithPaper } from '@/utils/api/authenticated/elyxnir/inventory/claimWithPaper';
import KorLockedModal from '../../korus/KorusSidebar/modals/KorLockedModal';
import SuccessModal from '../../korus/KorusSidebar/modals/SuccessModal';
import ErrorStep from '@/app/shared/wallet/PaymentModal/steps/Error';
import { getKorUnlockIds } from '@/utils/helpers/mints';
import { useWallet } from '@/app/providers/Wallet';
import { useModal } from '@ebay/nice-modal-react';

const ScenZBuySelectButton = () => {
  const korSuccessModal = useModal(SuccessModal);
  const router = useRouter();
  const { walletAddress } = useWallet();
  const { loading: mintsLoading, fetchMints } = useMints();
  const { selectedKor, setSelectedKorId, previewKor, loading, korUnlockIds } =
    useKors();
  const { track } = useAnalytics();

  const { previewedBackground, saveSelectedBackground } = useBackgrounds();

  const mintPreviewKor = useMintPreviewKor();

  const [step, setStep] = useState('');

  useEffect(() => {
    if (step === 'success') korSuccessModal.show({ kor: previewKor, setStep });
    else korSuccessModal.remove();
  }, [korSuccessModal, previewKor, step]);

  const checkKorSwitch = useCallback(() => {
    if (previewedBackground) {
      if (
        !selectedKor ||
        !previewedBackground.unlockIds?.includes(selectedKor.korUnlockId)
      ) {
        setStep('switchKors');
      } else {
        track({
          category: 'scenz',
          action: 'change_scenz',
          name: selectedKor.korName,
        });

        saveSelectedBackground({
          bg: previewedBackground,
          unlockId: selectedKor.korUnlockId,
        });
      }
    }
  }, [previewedBackground, saveSelectedBackground, selectedKor, track]);

  const handleSelectSuccess = useCallback(async () => {
    let updatedMints = [] as TokenData[];

    while (
      !getKorUnlockIds(updatedMints).includes(previewKor?.korUnlockId as string)
    ) {
      updatedMints = await fetchMints();
    }
    checkKorSwitch();
  }, [checkKorSwitch, fetchMints, previewKor?.korUnlockId]);

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

      await handleSelectSuccess();
    } else setStep('error');
  }, [handleSelectSuccess, previewKor, track]);

  const onUnlockButtonClick = useCallback(async () => {
    if (!walletAddress) {
      setStep('walletConnect');
    } else if (!previewKor?.isKORClaimed) {
      handleFreeUnlock();
    } else {
      setStep('paymentModal');
    }
  }, [walletAddress, handleFreeUnlock, previewKor?.isKORClaimed]);

  const isLoading = useMemo(
    () => loading || mintsLoading,
    [loading, mintsLoading]
  );

  const allowBuy = useMemo(() => {
    return (
      !isLoading &&
      previewedBackground &&
      previewedBackground.unlockIds &&
      !korUnlockIds?.some((u) => previewedBackground.unlockIds?.includes(u))
    );
  }, [isLoading, korUnlockIds, previewedBackground]);

  const onSelect = useCallback(() => {
    if (allowBuy) {
      setStep('intro');
    } else if (previewedBackground) {
      checkKorSwitch();
    }
  }, [allowBuy, checkKorSwitch, previewedBackground]);

  const switchKors = useCallback(() => {
    setSelectedKorId(previewedBackground?.unlockIds[0]);
    if (previewedBackground) {
      saveSelectedBackground({
        bg: previewedBackground,
        unlockId: previewedBackground?.unlockIds[0],
      });
    }
    setStep('');
  }, [previewedBackground, saveSelectedBackground, setSelectedKorId]);

  return (
    <>
      <button
        disabled={isLoading || !previewedBackground}
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

      {step === 'switchKors' && (
        <SwitchKorsModal
          shown
          close={() => setStep('')}
          onConfirm={switchKors}
          korUnlockId={previewedBackground?.unlockIds[0] || ''}
        />
      )}
      {step === 'intro' && (
        <KorLockedModal {...{ setStep, onUnlockButtonClick }} />
      )}
      {step === 'walletConnect' && (
        <WalletConnect onConnect={() => setStep('paymentModal')} />
      )}
      {step === 'error' && (
        <Modal close={() => setStep('')}>
          <CenteredModalContent>
            <ErrorStep onClose={() => setStep('')} />
          </CenteredModalContent>
        </Modal>
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
              onSuccess={handleSelectSuccess}
              successMessage={<p>Congratulations! You now own a GenKOR.</p>}
              successCTAs={
                <>
                  <button
                    className='btn btn-primary btn-pinched-br'
                    onClick={() => router.push('/inventory')}
                  >
                    Use
                  </button>
                  <button
                    className='btn btn-primary btn-pinched-br'
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
    </>
  );
};

export default ScenZBuySelectButton;
