import { useCallback, useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useTour } from '@/app/providers/tour';

import Kor from '../../../../../../public/images/kor.png';
import Image from 'next/image';
import X from '../assets/X';
import TourBody from './Body';

import Cursor from '@/app/shared/assets/Cursor';
import { useStems } from '../providers/stems';

import { CallBackProps, STATUS } from 'react-joyride';

const JoyRideNoSSR = dynamic(() => import('react-joyride'), { ssr: false });
import { isMobile } from '@/utils/helpers/env';
import StepIndicators from '@/app/shared/Tour/StepIndicators';
import { useAnalytics } from '@/app/providers/analytics';
import { useUpdateUser } from '@/utils/api/authenticated/elyxnir/user/updateUser';

const defaultOptions = {
  arrowColor: '#fbfcff',
  backgroundColor: '#fbfcff',
  beaconSize: 36,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  primaryColor: '#7485F3',
  spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
  textColor: '#211c20',
  width: undefined,
  zIndex: 100,
};

export default function Tour() {
  const {
    steps,
    addStep,
    currentStepIndex,
    setCurrentStepIndex,
    showTour,
    setShowTour,
  } = useTour();

  const { setSelectedStem } = useStems();

  const { track } = useAnalytics();
  const updateUser = useUpdateUser();

  useEffect(() => {
    addStep({
      step: {
        disableBeacon: true,
        target: '#nebula',
        content: (
          <>
            <span className='text-purple-9a'>Well done!</span>
            <span className='text-gray-999'>
              {' '}
              You&apos;ve successfully completed the tutorial.
            </span>
          </>
        ),
        title: 'Tutorial Complete!',
      },
      index: isMobile() ? 4 : 5,
    });
  }, [addStep]);

  const handleTourEnd = useCallback(() => {
    setShowTour(false);
    updateUser({
      hasCompletedTutorial: true,
    });

    const isFinished = currentStepIndex === steps.length - 1;
    if (isFinished) {
      track({
        category: 'tutorial_nebula',
        action: 'tutorial_finished',
        name: null,
      });
    } else {
      track({
        category: 'tutorial_nebula',
        action: 'tutorial_skip',
        name: `${currentStepIndex}`,
      });
    }
  }, [setShowTour, updateUser, currentStepIndex, steps.length, track]);

  const handleJoyrideCallback = useCallback(
    async (data: CallBackProps) => {
      if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
        handleTourEnd();
      }
    },
    [handleTourEnd]
  );

  useEffect(() => {
    if (
      steps[currentStepIndex] &&
      steps[currentStepIndex].target === '.tour-node-active'
    ) {
      setSelectedStem(steps[currentStepIndex].stem);
    }
  }, [currentStepIndex, setSelectedStem, steps]);

  const hideTooltip = useMemo(
    () => [0, steps.length - 1].includes(currentStepIndex),
    [currentStepIndex, steps.length]
  );

  const hugTooltip = useMemo(
    () => [1, 2].includes(currentStepIndex),
    [currentStepIndex]
  );

  // TODO: Style the tour for mobile
  return showTour ? (
    <>
      <div className='hidden lg:flex shadow-glow backdrop-blur-xl m-4 pt-8 bg-gray-13/50 rounded-xl border border-white fixed md:absolute bottom-0 left-0 rounded-br-[100px] items-end z-20'>
        <button
          className='absolute right-6 top-6'
          onClick={() => handleTourEnd()}
        >
          <X className='w-6 h-6' />
        </button>
        <Image src={Kor} className='w-[156px] h-[164px]' alt='Korus Logo' />
        <div className='mb-8 pr-12 px-4'>
          <div className='uppercase text-lg mb-4'>
            {steps[currentStepIndex].title}
          </div>
          <TourBody content={steps[currentStepIndex].content} />
          <StepIndicators
            {...{ currentStepIndex, setCurrentStepIndex }}
            onEnd={handleTourEnd}
            numSteps={steps.length}
          />
        </div>
      </div>
      <JoyRideNoSSR
        tooltipComponent={({ tooltipProps }) => (
          <div
            {...tooltipProps}
            className={`${hideTooltip ? 'hidden' : ''} ${
              hugTooltip ? 'absolute top-[-90px]' : ''
            }`}
          >
            <Cursor className='shadow-glow w-[34px] h-[34px] bg-purple-9a/50 rounded-full' />
          </div>
        )}
        callback={handleJoyrideCallback}
        run={true}
        debug
        showProgress
        disableOverlayClose
        disableScrolling={isMobile()}
        continuous
        floaterProps={{ hideArrow: true }}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Done',
          next: 'Next',
          open: 'Open the dialog',
          skip: 'Skip',
        }}
        styles={{
          options: {
            ...defaultOptions,
          },
        }}
        {...{ steps }}
        stepIndex={currentStepIndex}
        disableOverlay
      />
    </>
  ) : (
    <></>
  );
}
