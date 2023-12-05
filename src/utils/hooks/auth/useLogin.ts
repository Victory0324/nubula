import { login } from '@/utils/api/auth/login';
import { useCallback } from 'react';
import usePaperEmbeddedWalletSdk from '../paper/usePaperEmbeddedWalletSdk';
import { useUpdateUser } from '@/utils/api/authenticated/elyxnir/user/updateUser';
import { useSession } from '@/app/(unauthenticated)/provider/session';
import { useCurrentUser } from '@/app/providers/User';

export function useLoginSuccess() {
  const { fetchUser } = useCurrentUser();
  const { setSessionData } = useSession();
  const { getPaperWallet } = usePaperEmbeddedWalletSdk();
  const updateUser = useUpdateUser();

  return useCallback(
    async ({ userId, email }: { userId: string; email?: string }) => {
      setSessionData({
        userId,
        email,
      });

      const user = await fetchUser();

      if (user && !user.paperWalletAddress) {
        // if user does not have a paper wallet set yet
        const { success, walletAddress, recoveryCode } = await getPaperWallet({
          recoveryCode: user.paperRecoveryCode,
        });

        if (success && walletAddress && recoveryCode) {
          await updateUser({
            paperRecoveryCode: recoveryCode,
            paperWalletAddress: walletAddress,
          });
        }
      }
    },
    [fetchUser, getPaperWallet, setSessionData, updateUser]
  );
}

export default function useLogin() {
  const onLoginSuccess = useLoginSuccess();

  return useCallback(
    async (body: LoginValues) => {
      let errorMessage = 'SOMETHING WENT WRONG, TRY LOGGING IN WITH YOUR EMAIL';

      const loginResponse = await login(body);

      try {
        if (!loginResponse.ok) throw errorMessage;

        const { userId, email } = await loginResponse.json();

        await onLoginSuccess({ userId, email });

        return {
          success: true,
          status: loginResponse.status,
          userId,
          email,
        };
      } catch (e) {
        console.error(e);
        return {
          success: false,
          status: loginResponse.status,
          message: errorMessage,
        };
      }
    },
    [onLoginSuccess]
  );
}
