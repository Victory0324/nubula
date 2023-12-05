import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import { isDevOrPreview } from '@/utils/helpers/env';
import { useMemo } from 'react';

export default function Success({
  onClose,
  successMessage,
  itemName,
  quantity,
  crypto,
  transactionHash,
  successCTAs,
}: {
  onClose: () => void;
  successMessage?: JSX.Element;
  itemName: string;
  quantity: number;
  crypto: string;
  transactionHash: string;
  successCTAs?: JSX.Element;
}) {
  const openSeaUrl = useMemo(() => {
    return `https://${
      isDevOrPreview() ? 'mumbai.' : ''
    }polygonscan.com/tx/${transactionHash}`;
  }, [transactionHash]);

  const shortedTransactionHash = useMemo(
    () =>
      `${transactionHash.slice(0, 4)}...${transactionHash.slice(
        transactionHash.length - 4,
        transactionHash.length
      )}`,
    [transactionHash]
  );

  return (
    <ModalBody className='w-[427px]'>
      <ModalHeader {...{ onClose }} title='Own Completed!' />
      <div className='flex flex-col gap-4'>
        <div className='text-sm font-[350] text-center text-white/50'>
          {successMessage}
        </div>

        <div className='flex flex-col gap-2'>
          <div className='w-full flex justify-between'>
            <div>Mint status</div>
            <div className='flex gap-2 items-center justify-center'>
              <div className='mb-[2px] rounded-full w-3 h-3 bg-green-success' />
              Completed
            </div>
          </div>
          <div className='w-full flex justify-between'>
            <div>Drop</div>
            <div>{itemName}</div>
          </div>
          <div className='w-full flex justify-between'>
            <div>Quantity</div>
            <div>{quantity}</div>
          </div>
          <div className='w-full flex justify-between'>
            <div>Price</div>
            <div>{crypto}</div>
          </div>
          {transactionHash && (
            <div className='w-full flex justify-between'>
              <div>Transaction</div>
              <a
                href={openSeaUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                {shortedTransactionHash}
              </a>
            </div>
          )}
        </div>
        {successCTAs}
      </div>
    </ModalBody>
  );
}
