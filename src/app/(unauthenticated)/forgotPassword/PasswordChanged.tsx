import ButtonBottomRight from '@/app/shared/Buttons/ButtonBottomRight';
import Step from '../shared/Step';
import { StepMap, useSignupContext } from '../provider/signup';

const PasswordChanged: React.FC = () => {
  const { setStep } = useSignupContext();
  return (
    <Step title='Password changed'>
      <div className='text-xs my-6 text-gray-b7 text-center mx-4'>
        Congratulations, your password has been changed. You may now login with
        your new password.
      </div>

      <ButtonBottomRight
        className='mt-5'
        type='submit'
        onClick={() => setStep(StepMap.Login)}
      >
        Login
      </ButtonBottomRight>
    </Step>
  );
};

export default PasswordChanged;
