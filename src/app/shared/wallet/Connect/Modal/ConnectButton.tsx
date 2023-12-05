'use client';

import { useModal } from 'connectkit';

const ConnectButton = ({
  className,
  loading,
}: {
  className?: string;
  loading: boolean;
}) => {
  const connectKitModal = useModal();

  return (
    <button
      disabled={loading}
      className={className}
      onClick={() => connectKitModal.setOpen(true)}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectButton;
