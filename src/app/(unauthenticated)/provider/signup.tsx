'use client';
import { useGLTF } from '@react-three/drei';
import React, { createContext, useState, useContext } from 'react';

useGLTF.preload(`renderings/kor_genesis.glb`);

interface UserData {
  dob?: string;
  email?: string;
  displayName?: string;
  password?: string;
}

interface SignupContextProps {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const StepMap = {
  Login: 1,
  Register: 2,
  VerificationCode: 3,
  ForgotPassword: {
    Email: 4,
    NewPassword: 5,
    PasswordChanged: 6,
  },
};

const SignupContext = createContext<SignupContextProps | undefined>(undefined);

const useSignupContext = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignupContext must be used within a SignupProvider');
  }
  return context;
};

const SignupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(StepMap.Login);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleSetUserData = (data: UserData) => {
    setUserData(data);
  };

  const signupContextValue: SignupContextProps = {
    step,
    setStep,
    userData,
    setUserData: handleSetUserData,
  };

  return (
    <SignupContext.Provider value={signupContextValue}>
      {children}
    </SignupContext.Provider>
  );
};

export { SignupProvider, useSignupContext };
