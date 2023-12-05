import Toast from '../../Toasts/Toast';

export default function WalletToast({
  label,
}: {
  label: 'connect' | 'disconnect';
}) {
  return (
    <Toast
      type={'success'}
      title={`Wallet ${label}ed`}
      body={`Your wallet has been successfully ${label}ed.`}
    />
  );
}
