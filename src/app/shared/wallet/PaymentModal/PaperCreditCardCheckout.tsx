import { useWallet } from '@/app/providers/Wallet';
import { CheckoutWithCard, PaperSDKError } from '@paperxyz/react-client-sdk';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Toast from '../../Toasts/Toast';

export default function PaperCreditCardCheckout({
  mintPrice,
  quantity,
  contract,
  onSuccess,
  onError,
}: {
  contract: Contract;
  onSuccess: (result: { transactionId: string }) => void;
  onError: () => void;
  mintPrice?: MintPrice;
  quantity: number;
}) {
  const { walletAddress } = useWallet();

  useEffect(() => {
    if (!walletAddress)
      toast(<Toast type='error' title='Unable to connect to Paper' />);
  }, [mintPrice, walletAddress]);

  if (!walletAddress) return;

  return (
    <CheckoutWithCard
      configs={{
        contractId: contract.contractId,
        walletAddress,
        quantity,
        mintMethod: {
          name: 'mint',
          args: {
            to: '$WALLET',
            numToMint: '$QUANTITY',
          },
          payment: {
            value: `${mintPrice ? mintPrice.crypto.price : 0} * $QUANTITY`,
            currency: 'MATIC',
          },
        },
      }}
      onPaymentSuccess={({ transactionId }) => {
        onSuccess({ transactionId });
      }}
      onError={(error: PaperSDKError) => {
        console.error(error);
        onError();
      }}
      appName={'KORUS'}
      options={{
        colorBackground: '',
        colorPrimary: '#9eFFFF',
        colorText: '#fff',
        borderRadius: 12,
        inputBackgroundColor: '',
        inputBorderColor: '#ffffff',
      }}
    />
  );
}
