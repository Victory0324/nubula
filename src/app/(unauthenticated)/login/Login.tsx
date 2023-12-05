'use client';

import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

import ButtonBottomRight from '../../shared/Buttons/ButtonBottomRight';
import TransparentInput from '../../shared/TransparentInput';
import { useRouter } from '@/app/providers/router';
import { useSession } from '../provider/session';

import { useMemo, useState } from 'react';
import TransparentPasswordInput from '../../shared/TransparentPasswordInput';
import Loading from '@/app/shared/assets/Loading';
import { toast } from 'react-toastify';
import Toast from '@/app/shared/Toasts/Toast';
import { resendVerificationCode } from '@/utils/api/auth/resend-verification-code';
import { useAnalytics } from '@/app/providers/analytics';
import OAuthOptions from '../OAuthOptions';
import Step from '../shared/Step';
import LegalLinks from '../LegalLinks';
import { StepMap, useSignupContext } from '../provider/signup';
import useLogin from '@/utils/hooks/auth/useLogin';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const router = useRouter();
  const { track } = useAnalytics();

  const login = useLogin();

  const { setUserData, setStep } = useSignupContext();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: LoginValues) => {
    track({
      category: 'page_flow',
      action: 'login_start',
      name: null,
    });
    router.prefetch('/universe');

    setLoading(true);
    const { success, status, userId } = await login({
      password: values.password,
      email: values.email?.toLowerCase(),
    });

    if (success && userId) {
      track({
        category: 'page_flow',
        action: 'login_success',
        name: userId,
        user_id: userId,
      });

      router.push('/universe');
    } else if (status === 409) {
      setUserData({ email: values.email, password: values.password });
      resendVerificationCode({
        email: values.email as string,
      });
      track({
        category: 'page_flow',
        action: 'login_failed',
        status_code: status,
        name: null,
      });

      setStep(StepMap.VerificationCode);
      toast(<Toast type='error' body={`Account requires verification.`} />);
    } else {
      setError('Invalid username or password');
      track({
        category: 'page_flow',
        action: 'login_failed',
        status_code: status,
        name: null,
      });
    }
    setLoading(false);
  };

  const initialValues = useMemo(
    () => LoginSchema.getDefault() as LoginValues,
    []
  );

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: LoginSchema,
  });

  return (
    <Step title='Login'>
      <OAuthOptions flow='login' />
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        <form onSubmit={formik.handleSubmit} className='contents'>
          {error && (
            <div className='mb-4 text-xs text-center text-red-error'>
              {error}
            </div>
          )}
          <TransparentInput
            placeholder='Enter your email'
            label='Email'
            name='email'
            error={formik.errors.email}
            showError
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TransparentPasswordInput
            label='Password'
            error={formik.errors.password}
            showError
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div
            className='text-xs self-end mt-2 cursor-pointer'
            onClick={() => {
              setStep(StepMap.ForgotPassword.Email);
            }}
          >
            Forgot Password?
          </div>
          <ButtonBottomRight
            transparent
            className='mt-10 !h-[56px] !w-full flex justify-center items-center'
            type='submit'
            disabled={
              !formik.dirty ||
              (!formik.isValid && !formik.isSubmitting) ||
              loading
            }
          >
            {loading ? <Loading className='text-white' /> : 'Login'}
          </ButtonBottomRight>

          <LegalLinks />

          <div className='flex items-center gap-1 w-full text-xs justify-center mt-8 text-white'>
            Want to create an account?{' '}
            <span
              className='cursor-pointer inline text-tiffany-9e'
              onClick={() => setStep(StepMap.Register)}
            >
              Sign up
            </span>
          </div>
        </form>
      </Formik>
    </Step>
  );
};

export default Login;
