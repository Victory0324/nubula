import { useAccount, useDisconnect } from 'wagmi';
import { useCurrentUser } from '@/app/providers/User';
import { useState, useCallback } from 'react';
import { useModal } from 'connectkit';
import Loading from '@/app/shared/assets/Loading';
import EyeOpen from '../icons/EyeOpen';
import CopyLink from '../ShareModal/CopyLink';
import EyeClosed from '../icons/EyeClosed';
import Toast from '@/app/shared/Toasts/Toast';
import { toast } from 'react-toastify';
import { useSSR } from '@/app/providers/SSR';

const WalletAddress = () => {
  const { loading } = useCurrentUser();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const connectKitModal = useModal();
  const [showAddress, setShowAddress] = useState(false);
  const { isSSR } = useSSR();

  const clickConnect = useCallback(async () => {
    if (!address) connectKitModal.setOpen(true);
    else disconnect();
  }, [address, connectKitModal, disconnect]);

  return (
    <div className='flex items-center bg-purple-9a/10 rounded-full py-2 px-4 self-start'>
      <div className='flex gap-2 items-center  max-w-full overflow-hidden'>
        {loading ? (
          <Loading className='text-white' />
        ) : (
          <div
            className={`transition-colors rounded-full w-2 h-2 ${
              address
                ? 'bg-green-success'
                : 'bg-gray-999 group-hover:bg-blue-500'
            }`}
          />
        )}

        {showAddress && address ? (
          <span className='text-xs overflow-hidden text-ellipsis'>
            {address}
          </span>
        ) : (
          <span onClick={clickConnect} className='text-xs cursor-pointer'>
            Wallet Address
          </span>
        )}
        {!isSSR && address && (
          <>
            {showAddress ? (
              <EyeClosed
                className={'cursor-pointer'}
                onClick={() => {
                  setShowAddress((prev) => !prev);
                }}
              />
            ) : (
              <EyeOpen
                className={'cursor-pointer'}
                onClick={() => {
                  setShowAddress((prev) => !prev);
                }}
              />
            )}
            <CopyLink
              className={'cursor-pointer'}
              onClick={() => {
                if (address) {
                  navigator.clipboard.writeText(address);
                  toast(<Toast type='success' title='Successfully copied!' />);
                } else {
                  toast(<Toast type='error' title='Failed to copy!' />);
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default WalletAddress;
