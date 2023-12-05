import { getIdToken } from '@/utils/api/auth/id-token';
import { refreshToken } from '@/utils/api/auth/refresh-token';
import { isDevOrPreview } from '@/utils/helpers/env';
import {
  AuthProvider,
  PaperEmbeddedWalletSdk,
  RecoveryShareManagement,
} from '@paperxyz/embedded-wallet-service-sdk';

import { useCallback, useEffect, useState } from 'react';

export default function usePaperEmbeddedWalletSdk() {
  const [sdk, setSdk] =
    useState<PaperEmbeddedWalletSdk<RecoveryShareManagement.USER_MANAGED>>();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PAPER_CLIENT_ID)
      throw 'Missing Paper Client ID';

    const chain = isDevOrPreview() ? 'Mumbai' : 'Polygon';

    const sdk = new PaperEmbeddedWalletSdk({
      clientId: process.env.NEXT_PUBLIC_PAPER_CLIENT_ID,
      chain,
    });

    setSdk(sdk);
  }, []);

  const loginWithJwtAuth = useCallback(
    async ({
      idToken,
      recoveryCode,
    }: {
      idToken: string;
      recoveryCode?: string;
    }) => {
      if (!sdk) return { success: false };

      const response = await sdk.auth.loginWithJwtAuth({
        token: idToken, // ID token returned by Cognito
        authProvider: AuthProvider.CUSTOM_JWT,
        recoveryCode,
      });

      return {
        success: true,
        walletAddress: response.user.walletAddress as `0x${string}`,
        recoveryCode: response.user.authDetails.recoveryCode,
      };
    },
    [sdk]
  );

  const refreshTokenAndRetry = useCallback(
    async ({ recoveryCode }: { recoveryCode?: string }) => {
      try {
        await refreshToken();
        const idTokenResponse = await getIdToken();
        const { idToken } = await idTokenResponse.json();
        return await loginWithJwtAuth({ idToken, recoveryCode });
      } catch (e) {
        return { success: false, status: 401 };
      }
    },
    [loginWithJwtAuth]
  );

  const getPaperWallet = useCallback(
    async ({
      recoveryCode,
    }: {
      recoveryCode?: string;
    }): Promise<{
      success: boolean;
      recoveryCode?: string;
      walletAddress?: `0x${string}`;
      status?: number;
    }> => {
      if (!sdk) return { success: false, status: 401 };

      const idTokenResponse = await getIdToken();
      const { idToken } = await idTokenResponse.json();

      try {
        if (idToken) {
          return await loginWithJwtAuth({ idToken, recoveryCode });
        } else {
          return refreshTokenAndRetry({ recoveryCode });
        }
      } catch (e: any) {
        console.error('Error getting paper wallet', e);
        try {
          if (e.message.includes('JWT authentication error')) {
            return refreshTokenAndRetry({ recoveryCode });
          } else {
            const errMsg = JSON.parse(e.message);
            if (errMsg.token) {
              return refreshTokenAndRetry({ recoveryCode });
            }
          }
        } catch (e) {
          console.error('Unhandled paper error', e);
          return { success: false, status: 401 };
        }
        return { success: false, status: 401 };
      }
    },
    [loginWithJwtAuth, refreshTokenAndRetry, sdk]
  );

  return { sdk, getPaperWallet };
}
