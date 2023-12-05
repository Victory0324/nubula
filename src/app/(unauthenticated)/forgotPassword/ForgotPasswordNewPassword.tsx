'use client';

import * as Yup from 'yup';

import { StepMap, useSignupContext } from '../provider/signup';
import { useEffect, useState } from 'react';

import ResendEmailTimer from '../register/ResendEmailTimer';
import { Formik } from 'formik';

import { confirmForgotPassword } from '../../../utils/api/auth/confirm-forgot-password';
import ButtonBottomRight from '@/app/shared/Buttons/ButtonBottomRight';
import { forgotPassword } from '../../../utils/api/auth/forgot-password';
import PasswordValidity, {
  PasswordValidation,
} from '../register/PasswordValidity';
import EmailVerificationInput from '../register/EmailVerification/CodeInput';
import Step from '../shared/Step';
import Loading from '@/app/shared/assets/Loading';
import LegalLinks from '../LegalLinks';
import LoginSignupLinks from './LoginSignupLinks';
import TransparentPasswordInput from '@/app/shared/TransparentPasswordInput';

const ForgotPasswordNewPassword: React.FC = () => {
  const { userData, setStep } = useSignupContext();
  const [passwordSectionDisabled, setPasswordSectionDisabled] = useState(true);

  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (verificationCode.length === 6) {
      setPasswordSectionDisabled(false);
    } else {
      setPasswordSectionDisabled(true);
    }
  }, [verificationCode]);

  const onSubmit = async (values: any) => {
    if (!userData || !userData.email) {
      setError('No email found');
      return;
    }

    setLoading(true);
    const resetResponse = await confirmForgotPassword({
      email: userData.email,
      newPassword: values.password,
      code: verificationCode,
    });

    if (resetResponse.ok) {
      setStep(StepMap.ForgotPassword.PasswordChanged);
    } else {
      setError(
        'There was an error resetting your password. Perhaps the code has expired.'
      );
    }
    setLoading(false);
  };

  return (
    <Step title='Confirmation code'>
      <div className='mt-7 text-xs text-gray-b7 text-center mx-4'>
        We’ve sent you a six-digit confirmation code to{' '}
        <span className='text-white'>{userData?.email}</span>. Please enter it
        below to reset your password.
      </div>
      <Formik
        initialValues={{
          password: '',
        }}
        validationSchema={Yup.object().shape({
          password: PasswordValidation,
        })}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <form
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  formik.handleSubmit();
                }
              }}
              onSubmit={formik.handleSubmit}
              className='contents'
            >
              <div className='text-center px-2'>
                <EmailVerificationInput
                  setVerificationCode={setVerificationCode}
                />

                <div className='mt-5 flex justify-center'>
                  {userData?.email && (
                    <ResendEmailTimer
                      handleResendEmail={async () => {
                        if (!userData || !userData.email) {
                          console.error('no email present');
                          return;
                        }

                        await forgotPassword({
                          email: userData.email,
                        });
                      }}
                    />
                  )}
                </div>
              </div>

              <div
                className={`text-center transition-opacity duration-300 px-2 ${
                  passwordSectionDisabled
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100'
                }`}
              >
                <div className='my-4 text-md text-center'>
                  NOW, SET YOUR PASSWORD
                </div>
                <TransparentPasswordInput
                  placeholder='Password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.password}
                />
                {error && (
                  <div className='mt-5 text-xs text-center text-red-error'>
                    {error}
                  </div>
                )}

                <div className='flex my-6'>
                  <PasswordValidity password={formik.values.password} />
                </div>

                <ButtonBottomRight
                  type='submit'
                  disabled={
                    loading ||
                    !(formik.isValid && formik.dirty) ||
                    formik.isSubmitting
                  }
                >
                  {loading ? <Loading /> : 'Continue'}
                </ButtonBottomRight>
              </div>
            </form>
          );
        }}
      </Formik>
      <LegalLinks />
      <LoginSignupLinks />
      <div>
        <button
          className=' mt-4 text-xs hover:text-tiffany-9e transition-colors flex justify-start w-full'
          onClick={() => setStep(StepMap.ForgotPassword.Email)}
        >
          Back to forgot password
        </button>
      </div>
    </Step>
  );
};

export default ForgotPasswordNewPassword;
