'use client';

import * as Yup from 'yup';

import { useRouter } from '@/app/providers/router';

import { useSignupContext } from '../../provider/signup';
import { useCallback, useState } from 'react';
import ButtonBottomRight from '../../../shared/Buttons/ButtonBottomRight';
import ResendEmailTimer from '../ResendEmailTimer';
import { resendVerificationCode } from '../../../../utils/api/auth/resend-verification-code';
import Loading from '@/app/shared/assets/Loading';
import { useAnalytics } from '@/app/providers/analytics';
import Step from '../../shared/Step';
import LoginPrompt from '../LoginPrompt';
import EmailVerificationInput from './CodeInput';
import useVerifyAndLogin from '@/utils/hooks/auth/useVerifyAndLogin';

export const UsernameSchema = Yup.object().shape({
  displayName: Yup.string().required('Username is required'),
});

const EmailVerification: React.FC = () => {
  const router = useRouter();

  const { userData, setStep } = useSignupContext();
  const { track } = useAnalytics();

  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const verifyAndLogin = useVerifyAndLogin();

  const confirmEmail = useCallback(
    async (code: string) => {
      if (loading) return;

      setError(undefined);
      setLoading(true);

      if (!userData?.email) throw 'Email required';

      const { success, message, userId } = await verifyAndLogin({
        email: userData?.email,
        code,
        password: userData?.password,
      });

      setLoading(false);

      if (success) {
        track({
          category: 'page_flow',
          action: 'registration_success',
          name: userId,
        });

        router.push('/connect-wallet');
      } else {
        setError(message);
      }
    },
    [
      loading,
      router,
      track,
      userData?.email,
      userData?.password,
      verifyAndLogin,
    ]
  );

  return (
    <Step
      title={
        loading
          ? "Verifying your details, won't take long..."
          : 'We just need to verify your email address'
      }
    >
      <div className='my-5 text-sm text-center text-gray-b7'>
        We’ve sent you a six-digit confirmation code to{' '}
        <span className='text-white'>{userData?.email}</span>. Please enter this
        code below to confirm your email address.
      </div>

      <EmailVerificationInput
        onFilled={confirmEmail}
        setVerificationCode={setVerificationCode}
      />

      {error && (
        <div className='mt-5 text-xs text-center text-red-error'>{error}</div>
      )}
      {!loading && verificationCode.length === 6 && (
        <div>
          <ButtonBottomRight
            type='submit'
            className='mt-5 w-[142px] flex justify-center items-center'
            onClick={() => confirmEmail(verificationCode)}
            disabled={loading}
          >
            {loading ? <></> : 'Continue'}
          </ButtonBottomRight>
        </div>
      )}
      {loading ? (
        <Loading className='mt-5 text-tiffany-9e' />
      ) : (
        <>
          <div className='mt-8 mb-4'>
            {userData?.email && (
              <ResendEmailTimer
                handleResendEmail={() => {
                  resendVerificationCode({
                    email: userData.email,
                  });
                }}
              />
            )}
          </div>
          <LoginPrompt {...{ setStep }} />
        </>
      )}
    </Step>
  );
};

export default EmailVerification;
