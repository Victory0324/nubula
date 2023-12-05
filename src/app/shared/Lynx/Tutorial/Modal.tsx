import Modal from '@/app/shared/Modal';
import CenteredModalContent from '@/app/shared/Modal/CenteredContent';
import ModalBody from '@/app/shared/Modal/ModalBody';
import { useCallback, useMemo, useState } from 'react';
import Step1 from './assets/1.png';
import Step2 from './assets/2.png';
import Step3 from './assets/3.png';
import Step4 from './assets/4.png';
import Image from 'next/image';
import StepIndicators from '../../Tour/StepIndicators';
import ModalHeader from '../../Modal/ModalHeader';
import { useAnalytics } from '@/app/providers/analytics';

export default function TutorialModal({
  shown,
  close,
}: {
  shown: boolean;
  close: Function;
}) {
  const numSteps = 4;
  const [step, setStep] = useState(0);
  const images = useMemo(() => [Step1, Step2, Step3, Step4], []);
  const { track } = useAnalytics();

  const closeWithAnalytics = useCallback(() => {
    const isFinished = step === numSteps - 1;
    if (isFinished) {
      track({
        category: 'tutorial_lynx',
        action: 'tutorial_finished',
        name: null,
      });
    } else {
      track({
        category: 'tutorial_lynx',
        action: 'tutorial_skip',
        name: `${step}`,
      });
    }

    close();
  }, [step, track, close]);

  const body = useMemo(() => {
    const titleClass = 'font-light text-2xl uppercase';
    const subtitleClass = 'font-[350] text-lg text-gray-999 text-center';

    switch (step) {
      case 0:
        return (
          <>
            <div className={titleClass}>1. HEY, I&apos;M LYNX!</div>
            <div className={subtitleClass}>
              I am your new <span className='text-purple-9a'>AI companion</span>
              . I love making music and work with the prompts you give me.
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className={titleClass}>2. LET&apos;S START CHATTING</div>
            <div className={subtitleClass}>
              If you{' '}
              <span className='text-purple-9a'>type in the box below</span>, I
              can start helping you discover all the cool things we can do here.
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={titleClass}>3. LET&apos;S CHAT!</div>
            <div className={subtitleClass}>
              You can{' '}
              <span className='text-purple-9a'>ask me to create a track</span>,
              give instructions, or make impromptu requests.
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={titleClass}>4. TRACK PREVIEW</div>
            <div className={subtitleClass}>
              <span className='text-purple-9a'>Press play</span>, to preview.
            </div>
          </>
        );
    }
  }, [step]);

  if (!shown) return null;
  return (
    <Modal close={closeWithAnalytics}>
      <CenteredModalContent className='h-2/3'>
        <ModalHeader onClose={() => closeWithAnalytics()} />
        <ModalBody>
          <div className='flex flex-col items-center gap-4 max-w-[600px] h-full'>
            {step === 0 && (
              <div className='flex-auto text-[34px] text-purple-9a font-bold text-center'>
                LYNX AI BOT TUTORIAL
              </div>
            )}
            <div className='flex-auto'>
              <div className='flex items-center flex-col'>{body}</div>
            </div>
            <div className='flex-auto min-h-0'>
              <Image
                width={600}
                height={600}
                className='max-h-full w-auto'
                src={images[step]}
                alt={`Lynx tutorial step ${step}`}
              />
            </div>
            <div className='flex-auto'>
              <StepIndicators
                {...{ numSteps }}
                currentStepIndex={step}
                setCurrentStepIndex={setStep}
                onEnd={() => closeWithAnalytics()}
              />
            </div>
          </div>
        </ModalBody>
      </CenteredModalContent>
    </Modal>
  );
}
