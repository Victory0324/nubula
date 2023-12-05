'client only';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CookiesIcon from './assets/Cookies';
import X from '@/app/(authenticated)/(dashboard)/nebula/assets/X';

export default function CookieBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className='flex w-full justify-center rounded-xl'>
      <div className='bg-gray-13 max-sm:hidden border-[1px] border-white/50 rounded-xl p-4 flex items-center justify-center'>
        <CookiesIcon className='text-purple-9a' />
      </div>
      <div className='bg-gray-13 border-[1px] border-white/50 rounded-xl py-4 px-8 flex max-sm:flex-col md:items-center gap-4 text-white uppercase relative'>
        <button
          className='absolute top-0 right-0 m-2'
          onClick={() => onClose()}
        >
          <X className='w-4 h-4' />
        </button>

        <div className='text-[12px] leading-[20px] md:text-[14px] md:leading-[22px] xl:text-[16px] xl:leading-[28px] font-light w-[288px] md:w-[400px] xl:w-[550px] '>
          This website uses cookies to provide the best experience. Please read
          our{' '}
          <a
            href='https://pixelynx.io/privacy-policy'
            className='text-purple-9a'
          >
            cookie / Privacy Policy
          </a>{' '}
          to find out more
        </div>
        <div>
          <button
            className='shrink grow-0 text-[12px] md:text-[14px] border border-white/50 rounded-full text-purple-9a py-1 px-4 font-light transition-colors hover:border-white/75'
            onClick={() => onClose()}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export function useCookieBanner() {
  const [shouldShow, setShouldShow] = useState(false);

  const onClose = useCallback(() => {
    localStorage.setItem('acceptedCookies', 'true');
    toast.dismiss('cookie-banner');
  }, []);

  useEffect(() => {
    const accepted = localStorage.getItem('acceptedCookies');
    if (!!accepted) onClose();
    else setShouldShow(true);
  }, [onClose]);

  return useCallback(
    () =>
      shouldShow &&
      toast(<CookieBanner {...{ onClose }} />, {
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
        hideProgressBar: true,
        position: 'bottom-left',
        toastId: 'cookie-banner',
        draggable: false,
        className: '!ml-0',
        bodyClassName: '!p-0 flex justify-center',
      }),
    [onClose, shouldShow]
  );
}
