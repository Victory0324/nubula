'use client';

import { Step } from 'react-joyride';

import React, { useEffect, useCallback, useContext, useState } from 'react';

type StepType = Step & { stem?: InputStem };
import { useCurrentUser } from './User';

type ContextType = {
  currentStepIndex: number;
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>;
  steps: StepType[];
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
  addStep: ({ step, index }: { step: any; index: number }) => void;
  showTour: boolean;
  setShowTour: React.Dispatch<React.SetStateAction<boolean>>;
  setAllowTour: React.Dispatch<React.SetStateAction<boolean>>;
  allowTour: boolean;
  loading: boolean;
  restartTour: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const TourContext = React.createContext<ContextType | undefined>(undefined);

export const TourProvider = ({ children }: ProviderProps) => {
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showTour, setShowTour] = useState<boolean>(false);
  const [allowTour, setAllowTour] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { user } = useCurrentUser();

  const addStep = useCallback(
    ({ step, index }: { step: any; index: number }) => {
      setSteps((previousSteps: any[]) => {
        let newSteps = [...previousSteps];

        newSteps[index] = step;

        return newSteps;
      });
    },
    []
  );

  const restartTour = useCallback(() => {
    setCurrentStepIndex(0);
    setShowTour(true);
  }, []);

  useEffect(() => {
    if (user && steps.length > 0) {
      setShowTour(!user.hasCompletedTutorial);
    }
  }, [user, setShowTour, steps]);

  return (
    <TourContext.Provider
      value={{
        steps,
        setSteps,
        currentStepIndex,
        setCurrentStepIndex,
        addStep,
        showTour,
        setShowTour,
        allowTour,
        setAllowTour,
        loading,
        restartTour,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = (): ContextType => {
  const context = useContext(TourContext);
  if (!context)
    throw new Error('Called useTour before setting TourProvider context');

  return context;
};
