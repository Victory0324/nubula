'use client';

import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

import ButtonBottomRight from '../../shared/Buttons/ButtonBottomRight';
import TransparentInput from '../../shared/TransparentInput';
import { useEffect, useMemo, useRef, useState } from 'react';
import TransparentPasswordInput from '../../shared/TransparentPasswordInput';
import Loading from '@/app/shared/assets/Loading';
import { toast } from 'react-toastify';
import Toast from '@/app/shared/Toasts/Toast';
import { useAnalytics } from '@/app/providers/analytics';
import OAuthOptions from '../OAuthOptions';
import Step from '../shared/Step';
import LegalLinks from '../LegalLinks';
import { signUp } from '@/utils/api/auth/sign-up';
import PasswordValidity, { PasswordValidation } from './PasswordValidity';
import { isMobile } from '@/utils/helpers/env';
import { StepMap, useSignupContext } from '../provider/signup';
import LoginPrompt from './LoginPrompt';
import Checkbox from '@/app/shared/Checkbox';
import { calculateFullAge } from '@/utils/helpers/dates';
import { isUS } from '@/utils/helpers/locale';

const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 120);

export const RegisterSchema = Yup.object().shape({
  dob: Yup.date()
    .min(minDate, 'Birthdate must be in the last 120 years')
    .max(new Date(), 'Birthdate must be in the past')
    .required('Birthdate is required'),
  email: Yup.string()
    .email('Invalid email')
    .test(
      'special characters',
      'Email must not contain special characters',
      (value) => {
        return !/[^\w\s\-\.\@]/.test(value ?? '');
      }
    )
    .required('Email is required')
    .default(''),
  displayName: Yup.string()
    .required('Username is required')
    .test('profanity', 'Username must not include profanity', (value) => {
      return !/\b(?:fuck|cock|shit)\b/.test(value ?? '');
    })
    .default(''),
  password: PasswordValidation,
});

const Register: React.FC = () => {
  const dobRef = useRef<HTMLInputElement>(null);

  const { track } = useAnalytics();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { setUserData, setStep } = useSignupContext();
  const [optedIntoMarketing, setOptedIntoMarketing] = useState(false);

  const initialValues = useMemo(
    () => RegisterSchema.getDefault() as RegisterValues,
    []
  );

  const onSubmit = async (values: RegisterValues) => {
    const body = {
      email: values.email.toLowerCase(),
      password: values?.password,
      displayName: values.displayName,
      optedIntoMarketing,
      // birthDate: values.dob,
    };

    setLoading(true);
    const response = await signUp(body);
    setLoading(false);

    if (response.ok) {
      setUserData(body);
      setStep(StepMap.VerificationCode);
    } else if (response.status === 409) {
      toast(<Toast type='error' title={`User already exists.`} />);
      setStep(StepMap.Login);
    } else {
      setError('SOMETHING WENT WRONG, PLEASE TRY AGAIN');
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: RegisterSchema,
  });

  useEffect(() => {
    track({ category: 'page_flow', action: 'registration_start', name: null });
  }, [track]);

  useEffect(() => {
    const { years } = calculateFullAge(formik.values.dob);

    if (years >= (isUS() ? 13 : 17)) {
      setOptedIntoMarketing(true);
    }
  }, [formik.values.dob]);

  return (
    <Step title='Create your account'>
      <OAuthOptions flow='signup' />
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        <form onSubmit={formik.handleSubmit} className='contents'>
          {error && (
            <div className='mb-4 text-xs text-center text-red-error'>
              {error}
            </div>
          )}
          <TransparentInput
            ref={dobRef}
            placeholder='MM/DD/YYYY'
            label='Date of birth'
            name='dob'
            type='date'
            error={formik.touched.dob ? formik.errors.dob : ''}
            showError
            value={formik.values.dob || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={(e) => e.target.showPicker()}
          />
          <TransparentInput
            label='Email address'
            placeholder='e.g john@gmail.com'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email : ''}
            showError
          />
          <TransparentInput
            label='Username'
            placeholder='e.g John123'
            name='displayName'
            value={formik.values.displayName}
            maxLength={30}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.displayName ? formik.errors.displayName : ''}
            showError
          />

          <TransparentPasswordInput
            tooltip={
              isMobile() ? undefined : (
                <PasswordValidity password={formik.values.password} />
              )
            }
            tooltipVisible={formik.touched.password}
            label='Password'
            placeholder='Enter password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldTouched('password', true)}
          />
          {isMobile() && (
            <div className='w-full mt-4'>
              <PasswordValidity password={formik.values.password} />
            </div>
          )}
          <ButtonBottomRight
            transparent
            className='mt-10 !h-[56px] !w-full flex justify-center items-center bg-gradient-to-r from-[#5F37B6] to-[#9A6AFF] border-none'
            type='submit'
            disabled={
              !formik.dirty ||
              (!formik.isValid && !formik.isSubmitting) ||
              loading
            }
          >
            {loading ? <Loading className='text-white' /> : 'Create Account'}
          </ButtonBottomRight>

          <div className='mt-8'>
            <Checkbox
              value={optedIntoMarketing}
              onChange={setOptedIntoMarketing}
              label='By opting in, you agree to receive promotions, offers, and messages, from KORUS and its affiliates.'
            />
          </div>

          <LegalLinks />

          <LoginPrompt {...{ setStep }} />
        </form>
      </Formik>
    </Step>
  );
};

export default Register;
