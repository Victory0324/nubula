import { useCallback } from 'react';
import { oauthLogin } from '@/utils/api/auth/oauth/login';
import { absoluteURL } from '@/utils/helpers/urls';
import { useLoginSuccess } from './useLogin';

export default function useOauthLogin() {
  const onLoginSuccess = useLoginSuccess();

  return useCallback(
    async (code: string) => {
      const response = await oauthLogin({
        code: `${code}`,
        redirectUri: absoluteURL('/oauth'),
      });

      try {
        if (!response.ok) throw 'Something went wrong. Please try again.';

        const { userId } = await response.json();

        await onLoginSuccess({ userId });

        return {
          success: true,
          status: response.status,
          userId,
        };
      } catch (e) {
        console.error(e);
        return {
          success: false,
          status: response.status,
          message: e,
        };
      }
    },
    [onLoginSuccess]
  );
}
