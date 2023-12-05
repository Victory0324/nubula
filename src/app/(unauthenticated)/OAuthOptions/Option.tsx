import Loading from '@/app/shared/assets/Loading';
import { absoluteURL } from '@/utils/helpers/urls';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Google from '../login/assets/Google';
import Link from 'next/link';

import ButtonBottomRight from '@/app/shared/Buttons/ButtonBottomRight';
import getOAuthLoginUrl from '@/utils/api/auth/oauth/getOAuthLoginUrl';

const OAuthOption = ({
  provider,
  flow,
}: {
  provider: string;
  flow: 'login' | 'signup';
}) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string>();

  const handleOnClick = useCallback(async () => {
    if (url) window.open(url, '_blank');
    else {
      setLoading(true);
      const { success, data } = await getOAuthLoginUrl({
        redirectUri: absoluteURL('/oauth'),
        identityProvider: provider,
      });
      if (success) {
        setUrl(data);
        window.open(data, '_blank');
      }
      setLoading(false);
    }
  }, [provider, url]);

  return (
    <ButtonBottomRight
      transparent
      className='!h-[56px] !w-full'
      onClick={handleOnClick}
      disabled={loading}
    >
      <div className='flex items-center justify-center gap-2 p-2'>
        {loading ? (
          <Loading className='text-white' />
        ) : (
          <>
            <Google />
            {flow === 'login' ? 'Log in with Google' : 'Sign up with Google'}
          </>
        )}
      </div>
    </ButtonBottomRight>
  );
};

export default OAuthOption;
