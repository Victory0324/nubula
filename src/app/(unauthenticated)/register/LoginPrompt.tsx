import { StepMap } from '../provider/signup';

export default function LoginPrompt({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className='flex items-center gap-1 w-full text-xs justify-center mt-8 text-white'>
      Already have an account?{' '}
      <span
        className='cursor-pointer inline text-tiffany-9e'
        onClick={() => setStep(StepMap.Login)}
      >
        Log in
      </span>
    </div>
  );
}
