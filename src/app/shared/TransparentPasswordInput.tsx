import { ReactNode, useState } from 'react';
import TransparentInput, { TransparentInputProps } from './TransparentInput';
import EyeOpen from './icons/EyeOpen';
import EyeClosed from './icons/EyeClosed';

const TransparentPasswordInput: React.FC<TransparentInputProps> = ({
  className,
  ...props
}: TransparentInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TransparentInput
      placeholder='Enter your password'
      type={showPassword ? 'text' : 'password'}
      name='password'
      className={`
        ${className}
      `}
      icon={
        <div
          onClick={() => setShowPassword(!showPassword)}
          className={`cursor-pointer h-[24px] flex items-center justify-center text-white`}
        >
          {showPassword ? <EyeClosed /> : <EyeOpen />}
        </div>
      }
      {...props}
    />
  );
};

export default TransparentPasswordInput;
