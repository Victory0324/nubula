import * as Yup from 'yup';
import { Formik } from 'formik';

import TransparentInput from '../../shared/TransparentInput';
import { StepMap, useSignupContext } from '../provider/signup';
import { forgotPassword } from '../../../utils/api/auth/forgot-password';
import ButtonBottomRight from '@/app/shared/Buttons/ButtonBottomRight';
import Step from '../shared/Step';
import LegalLinks from '../LegalLinks';
import { useState } from 'react';
import Loading from '@/app/shared/assets/Loading';

import LoginSignupLinks from './LoginSignupLinks';

export const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordEmail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { userData, setUserData, setStep } = useSignupContext();
  const [error, setError] = useState<string | null>();

  const onSubmit = async (values: { email: string }) => {
    setUserData({ ...userData, email: values.email });

    setLoading(true);
    const res = await forgotPassword({
      email: values.email.toLowerCase(),
    });

    setLoading(false);

    if (res.ok) {
      setStep(StepMap.ForgotPassword.NewPassword);
    } else {
      if (res.status === 404) {
        setError("We couldn't find an account with that email address.");
      }
    }
  };

  return (
    <Step title='Forgot password'>
      <div className='text-xs my-7 text-gray-b7 text-center'>
        Enter the email address associated with your account. You will receive
        an email with instructions to reset your password.
      </div>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={EmailSchema}
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
              <TransparentInput
                placeholder='Enter your email'
                name='email'
                error={formik.errors.email}
                showError
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {error && (
                <div className='text-xs text-center text-red-error'>
                  {error}
                </div>
              )}
              <ButtonBottomRight
                className='my-5 flex items-center justify-center'
                type='submit'
                disabled={loading || !formik.isValid || formik.isSubmitting}
              >
                {loading ? <Loading /> : 'Continue'}
              </ButtonBottomRight>
              <LegalLinks />
              <LoginSignupLinks />
            </form>
          );
        }}
      </Formik>
    </Step>
  );
};

export default ForgotPasswordEmail;
