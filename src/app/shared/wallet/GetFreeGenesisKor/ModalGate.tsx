import { useGetFreeGenesisKorNft } from '@/utils/api/authenticated/elyxnir/inventory/getFreeGenesisKorNft';
import Modal from '../../Modal';
import CenteredModalContent from '../../Modal/CenteredContent';
import { toast } from 'react-toastify';
import Toast from '../../Toasts/Toast';
import { useCurrentUser } from '../../../providers/User';
import { useCallback, useEffect, useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import useMintGenesisKor from '@/utils/hooks/mints/useMintGenesisKor';
import { useMints } from '@/app/providers/mints';
import Loading from '../../assets/Loading';
import { Link } from '@/app/providers/router';
import { useKors } from '@/app/providers/kors';
import { useAnalytics } from '@/app/providers/analytics';
import BuyKorFlow from '../BuyKorFlow';
import poll from '@/utils/helpers/pollRequest';
import getTransactionStatus from '@/utils/api/paper/getTransactionStatus';
import { getKorUnlockIds } from '@/utils/helpers/mints';
import { useUpdateUser } from '@/utils/api/authenticated/elyxnir/user/updateUser';
import ClaimModal from './ClaimModal';

export default function GetFreeGenesisKor({
  onClose,
}: {
  onClose: () => void;
}) {
  const { loading: mintsLoading, fetchMints } = useMints();
  const { loading, setLoading, isGenKorUnlocked, isGenKorMinted } = useKors();
  const { track } = useAnalytics();
  const getFreeGenesisKorNft = useGetFreeGenesisKorNft();
  const mintGenesisKor = useMintGenesisKor();

  const [step, setStep] = useState<'loading' | 'claim' | 'own' | 'pay'>(
    'loading'
  );

  const onConfirm = useCallback(() => {
    setStep('pay');
  }, []);

  const onPaymentSuccess = useCallback(async () => {
    toast(
      <Toast
        type={'success'}
        title={'Success!'}
        body='Your GenesisKOR has been added to your inventory.'
      />,
      {
        toastId: 'minted-genesis-kor-nft-success',
      }
    );

    setStep('loading');

    // poll for minted kor to be added to inventory
    await poll(
      fetchMints,
      (mints) => {
        return !getKorUnlockIds(mints).includes('kor_genesis');
      },
      1000
    );
  }, [fetchMints]);

  const onPaymentError = useCallback(() => {
    toast(
      <Toast
        type={'error'}
        title={'Failure'}
        body='Your GenesisKOR could not be added. Please try again.'
      />,
      {
        toastId: 'minted-genesis-kor-nft-error',
      }
    );
  }, []);

  const onNotPreviouslyClaimed = useCallback(async () => {
    try {
      setLoading(true);
      const { success: getFreeGenesisKorNftSuccess, data: genKorData } =
        await getFreeGenesisKorNft();

      if (!getFreeGenesisKorNftSuccess)
        throw 'Error getting free genesis kor nft';

      // Poll process transaction with inventory/transaction-status
      let { success } = await poll(
        () => {
          return getTransactionStatus({
            transactionId: genKorData.transactionId,
          });
        },
        ({ success, data }) => {
          return success && data?.status !== 'TRANSFER_SUCCEEDED';
        }
      );

      if (!success) {
        throw 'Error getting free genesis kor nft transaction status';
      }

      await onPaymentSuccess();
    } catch (e) {
      toast(
        <Toast
          type={'error'}
          title={'Failure'}
          body='Your GenKOR could not be added. Please try again.'
        />,
        {
          toastId: 'free-genesis-kor-nft-error',
        }
      );
    }

    setLoading(false);
    onClose();
  }, [getFreeGenesisKorNft, onClose, onPaymentSuccess, setLoading]);

  const handleClick = useCallback(async () => {
    if (!isGenKorUnlocked) {
      await onNotPreviouslyClaimed();
      track({
        category: 'kor',
        action: 'claim_kor',
        name: 'kor_genesis',
      });
    } else {
      setStep('own');
    }
  }, [isGenKorUnlocked, onNotPreviouslyClaimed, track]);

  useEffect(() => {
    if (loading || mintsLoading) return;

    if (!isGenKorMinted) {
      setStep('claim');
    } else onClose();
  }, [isGenKorMinted, loading, mintsLoading, onClose, step]);

  return (
    <Modal close={() => {}}>
      <div className='flex items-center justify-center m-auto'>
        {step === 'loading' ? (
          <Loading className='text-white' />
        ) : step === 'claim' ? (
          <ClaimModal onClick={handleClick} />
        ) : step === 'own' ? (
          <CenteredModalContent>
            <ConfirmationModal
              onBack={() => {
                setStep('claim');
              }}
              onConfirm={onConfirm}
            />
          </CenteredModalContent>
        ) : step === 'pay' ? (
          <CenteredModalContent>
            <BuyKorFlow
              kor={{
                korName: 'KOR',
                korUnlockId: 'kor_genesis',
              }}
              quantity={1}
              onPayWithCrypto={mintGenesisKor}
              onClose={() => {
                setStep('claim');
              }}
              onSuccess={onPaymentSuccess}
              onError={onPaymentError}
              successMessage={<p>Congratulations!You now own a GenKOR.</p>}
              successCTAs={
                <>
                  <button
                    className='btn btn-primary btn-pinched-br w-full'
                    onClick={() => onClose()}
                  >
                    Start Creating
                  </button>
                  <div className='btn btn-primary btn-pinched-br w-full'>
                    <Link href='/inventory'>Inventory</Link>
                  </div>
                </>
              }
            />
          </CenteredModalContent>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}
