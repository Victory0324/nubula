import { FC, useEffect, useState } from 'react';
import Resend from '../../shared/icons/Resend';
import { add, differenceInSeconds } from 'date-fns';

const TIMER_DURATION_SECONDS = 59;

interface Props {
  handleResendEmail: () => void;
}

interface DiffDisplay {
  minutes: string;
  seconds: string;
}

const numberOr0 = (num: number) => (num > 0 ? num : 0);

const getDiffDisplay = (diffInSeconds: number) => ({
  minutes: '0',
  seconds: numberOr0(Math.round(diffInSeconds)).toString().padStart(2, '0'),
});

const ResendEmailTimer: FC<Props> = ({ handleResendEmail }) => {
  const [target, setTarget] = useState<Date>(
    add(new Date(), { seconds: TIMER_DURATION_SECONDS })
  );
  const [diffDisplay, setDiffDisplay] = useState<DiffDisplay>();
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Set initial state, and then set up timer
    const diffInSeconds = differenceInSeconds(target, new Date());

    setDiffDisplay(getDiffDisplay(diffInSeconds));

    const interval = setInterval(() => {
      const currentDiffInSeconds = differenceInSeconds(target, new Date());

      setDiffDisplay(getDiffDisplay(currentDiffInSeconds));

      const shouldFireOnComplete = !hasCompleted && currentDiffInSeconds <= 0;

      if (shouldFireOnComplete) {
        setHasCompleted(true);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [hasCompleted, target]);

  const sendEmailAndResetTimer = async () => {
    handleResendEmail();
    setTarget(add(new Date(), { seconds: TIMER_DURATION_SECONDS }));
    setHasCompleted(false);
  };

  return (
    <div className='flex min-h-[20px]'>
      {hasCompleted ? (
        <div
          onClick={sendEmailAndResetTimer}
          className='flex items-center text-xs cursor-pointer hover:opacity-80 transition-opacity'
        >
          <Resend className='text-tiffany-9e' />
          <span className='ms-2'>Resend code</span>
        </div>
      ) : (
        <div className='hover:cursor-not-allowed flex text-sm text-white items-end'>
          Resend after
          <span className='ms-1 text-tiffany-9e'>
            {diffDisplay?.minutes}:{diffDisplay?.seconds}
          </span>
        </div>
      )}
    </div>
  );
};

export default ResendEmailTimer;
