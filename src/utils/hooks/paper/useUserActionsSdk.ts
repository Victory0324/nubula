import { PixelynxOnChainUserActionContract } from '@/lib/UserActionsSDK';
import { isDevOrPreview } from '@/utils/helpers/env';

import { useCallback, useEffect, useState } from 'react';
import usePaperEmbeddedWalletSdk from './usePaperEmbeddedWalletSdk';
import { useWallet } from '@/app/providers/Wallet';

const CHAIN_IDS = { polygon: 137, mumbai: 80001 };

export default function useUserActionsSdk() {
  const { paperRecoveryCode } = useWallet();

  const { sdk: paperWalletSdk, getPaperWallet } = usePaperEmbeddedWalletSdk();

  const [sdk, setSdk] = useState<PixelynxOnChainUserActionContract>();

  useEffect(() => {
    if (!paperWalletSdk || sdk) return;

    (async () => {
      const chainId = isDevOrPreview() ? CHAIN_IDS.mumbai : CHAIN_IDS.polygon;
      await getPaperWallet({
        recoveryCode: paperRecoveryCode,
      });
      setSdk(new PixelynxOnChainUserActionContract(paperWalletSdk, chainId));
    })();
  }, [getPaperWallet, paperRecoveryCode, paperWalletSdk, sdk]);

  const userAction = useCallback(
    async (actionId: string) => {
      if (!sdk) return;

      return await sdk.userAction(actionId);
    },
    [sdk]
  );

  return { sdk, userAction };
}
