import { verifyEmail } from '@/utils/api/auth/email-confirmation';
import { useCallback } from 'react';
import useLogin from './useLogin';

export default function useVerifyAndLogin() {
  const login = useLogin();

  return useCallback(
    async (body: ConfirmSignupValues & LoginValues) => {
      let errorMessage = 'SOMETHING WENT WRONG, TRY LOGGING IN WITH YOUR EMAIL';

      try {
        const verifyResponse = await verifyEmail(body);

        if (!verifyResponse.ok) {
          if (verifyResponse.status === 401) {
            errorMessage = 'TOKEN IS INCORRECT';
          }

          return { success: false, message: errorMessage, userId: undefined };
        }

        return await login(body);
      } catch (e) {
        console.error(e);
        return { success: false, message: errorMessage };
      }
    },
    [login]
  );
}
