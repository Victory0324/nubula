import { useCallback, useState } from 'react';
import WalletConnect from '../Connect';
import ModalGate from './ModalGate';

export default function GetFreeGenesisKor({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => {
    onComplete();
    setShowModal(false);
  }, [onComplete]);

  const handleOnConnectStart = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleOnConnect = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      <WalletConnect
        onConnectStart={handleOnConnectStart}
        onConnect={handleOnConnect}
      />
      {showModal && <ModalGate onClose={handleClose} />}
    </>
  );
}
