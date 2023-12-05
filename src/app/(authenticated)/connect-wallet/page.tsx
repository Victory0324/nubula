'use client';

import ConnectWallet from '@/app/(unauthenticated)/register/ConnectWallet';
import UnauthenticatedPage from '@/app/(unauthenticated)/shared/UnauthenticatedPage';

export default function ConnectWalletPage() {
  return (
    <UnauthenticatedPage>
      <div className='w-full md:max-w-[400px] flex flex-col items-center grow justify-center'>
        <ConnectWallet />
      </div>
    </UnauthenticatedPage>
  );
}
