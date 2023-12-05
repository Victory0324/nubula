import Google from '../login/assets/Google';
import Link from 'next/link';
import ButtonBottomRight from '../../shared/Buttons/ButtonBottomRight';
import { useMemo } from 'react';
import OAuthOption from './Option';

const OAuthOptions = ({ flow }: { flow: 'login' | 'signup' }) => {
  const providers = useMemo(() => ['Google'], []);

  return (
    <div className='flex items-center justify-center w-full my-6'>
      <div className='flex flex-col gap-6 w-full items-center'>
        {providers.map((provider) => (
          <OAuthOption key={provider} {...{ provider, flow }} />
        ))}
        <div className='flex gap-2 items-center justify-center'>
          <hr className='grow border-white/25' />
          or
          <hr className='grow border-white/25' />
        </div>
      </div>
    </div>
  );
};

export default OAuthOptions;
