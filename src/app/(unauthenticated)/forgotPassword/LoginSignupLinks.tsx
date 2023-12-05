import { StepMap, useSignupContext } from '../provider/signup';

export default function LoginSignupLinks() {
  const { setStep } = useSignupContext();
  return (
    <div className='flex items-center gap-1 w-full text-xs justify-center mt-8 text-white'>
      <span
        className='cursor-pointer inline text-tiffany-9e'
        onClick={() => setStep(StepMap.Login)}
      >
        Login
      </span>{' '}
      or{' '}
      <span
        className='cursor-pointer inline text-tiffany-9e'
        onClick={() => setStep(StepMap.Register)}
      >
        Sign up
      </span>
    </div>
  );
}
