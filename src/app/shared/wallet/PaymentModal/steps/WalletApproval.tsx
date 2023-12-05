import ModalBody from '@/app/shared/Modal/ModalBody';
import ModalHeader from '@/app/shared/Modal/ModalHeader';
import ProgressBar from '@/app/shared/ProgressBar';

import { useState, useMemo, useRef, useEffect } from 'react';

export default function WalletApproval({
  cartComponent,
}: {
  cartComponent: JSX.Element;
}) {
  const [progressWidth, setProgressWidth] = useState(0);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressContainerRef.current)
      setProgressWidth(progressContainerRef.current?.clientWidth);
  }, []);

  return (
    <ModalBody>
      <ModalHeader title='Waiting Wallet Approval' />
      <div className='flex flex-col gap-4'>
        <div className='text-sm font-[350] text-center text-white/50'>
          <p>
            Approve this transaction in your wallet provider. We will be here
            waiting.
          </p>
        </div>
        {cartComponent}
        <div
          className='w-full grow flex justify-center'
          ref={progressContainerRef}
        >
          <ProgressBar percentage={0.3} width={progressWidth} />
        </div>
      </div>
    </ModalBody>
  );
}
