'use client';

import { useMemo } from 'react';
import Login from './login/Login';
import EmailVerification from './register/EmailVerification';
import { StepMap, useSignupContext } from './provider/signup';
import ForgotPasswordEmail from './forgotPassword/ForgotPasswordEmail';
import ForgotPasswordNewPassword from './forgotPassword/ForgotPasswordNewPassword';
import PasswordChanged from './forgotPassword/PasswordChanged';
import Register from './register';

const SignupForm = () => {
  const { step } = useSignupContext();

  const stepBody = useMemo(() => {
    switch (step) {
      case StepMap.Login:
        return <Login />;
      case StepMap.VerificationCode:
        return <EmailVerification />;
      case StepMap.ForgotPassword.Email:
        return <ForgotPasswordEmail />;
      case StepMap.ForgotPassword.NewPassword:
        return <ForgotPasswordNewPassword />;
      case StepMap.ForgotPassword.PasswordChanged:
        return <PasswordChanged />;
      case StepMap.Register:
      default:
        return <Register />;
    }
  }, [step]);

  return (
    <div className='w-full md:max-w-[400px] flex flex-col items-center grow justify-center'>
      {stepBody}
    </div>
  );
};

export default SignupForm;
