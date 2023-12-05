import { useCallback, useEffect, useMemo, useState } from 'react';
import PaperCreditCardCheckout from './PaperCreditCardCheckout';
import useMintFactorySdk from '@/utils/hooks/mints/useMintFactorySdk';
import ModalBody from '../../Modal/ModalBody';
import ModalHeader from '../../Modal/ModalHeader';
import Cart from './Cart';
import { getMintPrices } from '@/utils/helpers/mints';
import { PixelynxNftContract } from '@/lib/MintFactorySDK/PixelynxNftContract';
import WalletApproval from './steps/WalletApproval';
import Purchasing from './steps/Purchasing';
import Success from './steps/Success';
import ErrorStep from './steps/Error';
import usePaperMintCheckout from '@/utils/hooks/mints/usePaperMintCheckout';
import useIsPaperWalletConnected from '@/utils/hooks/mints/useIsPaperWalletConnected';

export type PaymentModalProps = {
  itemType: 'track' | 'kor';
  itemName: string;
  instanceId?: string;
  quantity: number;
  showQuantity?: boolean;
  onClose: () => void;
  onError: () => void;
  onPayWithCrypto: (quantity: number) => Promise<{
    success: boolean;
    transactionHash?: `0x${string}`;
    contract?: PixelynxNftContract;
    instanceId?: string;
    error?: any;
  }>;
  onSuccess: (() => Promise<any>) | (() => void);
  contract: Contract;
  successMessage?: JSX.Element;
  successCTAs?: JSX.Element;
};

export default function PaymentModal({
  itemType,
  itemName,
  instanceId,
  quantity,
  showQuantity = true,
  onClose,
  onError,
  onSuccess,
  onPayWithCrypto,
  contract,
  successMessage,
  successCTAs,
}: PaymentModalProps) {
  const paperWalletConnected = useIsPaperWalletConnected();
  const { onCheckoutSuccess } = usePaperMintCheckout();

  const { getMintPrice, getName, processMintNftTransaction } =
    useMintFactorySdk();
  const [loading, setLoading] = useState(false);
  const [mintPrice, setMintPrice] = useState<MintPrice>();
  const [collectionName, setCollectionName] = useState<string>();

  const [step, setStep] = useState('selectPaymentMode');

  useEffect(() => {
    setLoading(true);

    (async () => {
      const mintPriceReq = mintPrice
        ? null
        : getMintPrice(contract.contractAddress).then((price) =>
            setMintPrice(price)
          );

      const collectionNameReq = collectionName
        ? null
        : getName(contract.contractAddress).then((name) =>
            setCollectionName(name)
          );

      await Promise.all([mintPriceReq, collectionNameReq]);

      setLoading(false);
    })();
  }, [
    collectionName,
    contract.contractAddress,
    getMintPrice,
    getName,
    mintPrice,
  ]);

  const [transactionHash, setTransactionHash] = useState('');

  const handlePayWithCrypto = useCallback(async () => {
    try {
      if (paperWalletConnected) setStep('purchasing');
      else setStep('walletApproval');

      const {
        success,
        transactionHash,
        contract: pixelynxNftContract,
        instanceId,
      } = await onPayWithCrypto(quantity);

      if (success && transactionHash) {
        if (pixelynxNftContract) {
          setTransactionHash(transactionHash as string);
          setStep('purchasing');

          const { success } = await processMintNftTransaction({
            contract: pixelynxNftContract,
            contractAddress: contract.contractAddress,
            transactionHash,
            instanceId,
          });

          if (success) {
            await onSuccess();
            setStep('success');
          } else {
            throw new Error('Failed to process NFT');
          }
        } else {
          await onCheckoutSuccess({
            transactionHash,
            itemType,
            instanceId,
            onSuccess: async () => {
              await onSuccess();
              setStep('success');
            },
            onError: () => {
              setStep('error');
              onError();
            },
            contractAddress: contract.contractAddress,
          });
        }
      } else {
        throw new Error('Failed to pay with crypto');
      }
    } catch (e) {
      console.error(e);
      setStep('error');
      onError();
    }
  }, [
    contract.contractAddress,
    itemType,
    onCheckoutSuccess,
    onError,
    onPayWithCrypto,
    onSuccess,
    paperWalletConnected,
    processMintNftTransaction,
    quantity,
  ]);

  const handleCreditCardSuccess = useCallback(
    async (result: { transactionId: string }) => {
      setStep('purchasing');
      setTransactionHash(result.transactionId);
      await onCheckoutSuccess({
        transactionHash: result.transactionId,
        itemType,
        instanceId,
        onSuccess: async () => {
          await onSuccess();
          setStep('success');
        },
        onError: () => {
          setStep('error');
          onError();
        },
        contractAddress: contract.contractAddress,
      });
    },
    [
      contract.contractAddress,
      instanceId,
      itemType,
      onCheckoutSuccess,
      onError,
      onSuccess,
    ]
  );

  const cartComponent = useMemo(
    () => (
      <Cart
        {...{
          itemName,
          quantity,
          showQuantity,
          step,
          mintPrice,
          collectionName,
        }}
      />
    ),
    [collectionName, itemName, mintPrice, quantity, showQuantity, step]
  );

  if (step === 'walletApproval') {
    return <WalletApproval {...{ cartComponent }} />;
  }

  if (step === 'purchasing') {
    return <Purchasing {...{ cartComponent }} />;
  }

  if (step === 'success') {
    const { crypto } = getMintPrices({ mintPrice, quantity });

    return (
      <Success
        {...{
          onClose,
          successMessage,
          itemName,
          quantity,
          crypto,
          transactionHash,
          successCTAs,
        }}
      />
    );
  }

  if (step === 'error') {
    return <ErrorStep {...{ onClose }} />;
  }

  return (
    <ModalBody>
      <ModalHeader {...{ onClose }} title='Payment Method' />
      <div className='flex flex-col gap-4'>
        <div className='text-sm font-[350] text-center text-white/50'>
          <p>Approve this transaction in your wallet to complete.</p>
        </div>
        {step === 'creditCardCheckout' ? (
          <PaperCreditCardCheckout
            onSuccess={handleCreditCardSuccess}
            {...{ onError, contract, mintPrice, quantity }}
          />
        ) : null}
        {cartComponent}
        <div className='flex flex-col gap-2'>
          {step !== 'creditCardCheckout' && (
            <button
              disabled={loading}
              className='btn btn-secondary btn-pinched-br w-full'
              onClick={() => setStep('creditCardCheckout')}
            >
              Credit Card Payment
            </button>
          )}
          <button
            disabled={loading}
            className='btn btn-secondary btn-pinched-br w-full'
            onClick={
              step === 'creditCardCheckout'
                ? () => setStep('selectPaymentMode')
                : () => handlePayWithCrypto()
            }
          >
            {step === 'creditCardCheckout' ? 'Back' : 'Pay with Crypto'}
          </button>
        </div>
      </div>
    </ModalBody>
  );
}
