import * as Yup from 'yup';

const UppercaseCheck = (value: string) => {
  return /[A-Z]/.test(value ?? '');
};
const LowercaseCheck = (value: string) => {
  return /[a-z]/.test(value ?? '');
};
const NumberCheck = (value: string) => {
  return /[0-9]/.test(value ?? '');
};
const SpecialCheck = (value: string) => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(value ?? '');
};

const Dot = ({ valid }: { valid: boolean }) => (
  <div
    className={`rounded-full w-2 h-2 ${
      valid ? 'bg-green-success' : 'bg-red-error'
    }`}
  />
);

export const PasswordValidation = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .test(
    'uppercase',
    'Password must have at least one uppercase character',
    UppercaseCheck
  )
  .test(
    'uppercase',
    'Password must have at least one lowercase character',
    LowercaseCheck
  )
  .test('number', 'Password must have at least one number', NumberCheck)
  .test(
    'special',
    'Password must have at least one special character',
    SpecialCheck
  )
  .default('');

export default function PasswordValidity({ password }: { password: string }) {
  const lengthCheck = (password || '').length >= 8;
  const uppercaseCheck = password && UppercaseCheck(password);
  const lowercaseCheck = password && LowercaseCheck(password);
  const numberCheck = password && NumberCheck(password);
  const specialCheck = password && SpecialCheck(password);

  return (
    <div className='text-xs text-gray-b7 flex flex-col gap-2'>
      <div className='flex items-center mx-2'>
        <Dot valid={!!lengthCheck} />
        <span className='ms-2'>At least 8 characters long</span>
      </div>
      <div className='flex items-center mx-2'>
        <Dot valid={!!uppercaseCheck} />
        <span className='ms-2'>Must contain a uppercase letter</span>
      </div>
      <div className='flex items-center mx-2'>
        <Dot valid={!!lowercaseCheck} />
        <span className='ms-2'>Must contain a lowercase letter</span>
      </div>
      <div className='flex items-center mx-2'>
        <Dot valid={!!numberCheck} />
        <span className='ms-2'>Must contain a number</span>
      </div>
      <div className='flex items-center mx-2'>
        <Dot valid={!!specialCheck} />
        <span className='ms-2'>Must contain a special symbol</span>
      </div>
    </div>
  );
}
