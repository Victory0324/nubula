'use client';

import { useRouter } from '@/app/providers/router';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAnalytics } from '../../providers/analytics';
import { Link } from '@/app/providers/router';
import ButtonTopLeft from '../../shared/Buttons/ButtonTopLeft';
import UnauthenticatedPage from '../shared/UnauthenticatedPage';
import { useSession } from '../provider/session';
import useOauthLogin from '@/utils/hooks/auth/useOAuthLogin';

function decodeState(s: URLSearchParams) {
  try {
    const state = s.get('state') || '{}';
    return JSON.parse(atob(state));
  } catch (err) {
    console.error('could not decode state');
    return {};
  }
}

export default function OAuthPage() {
  const [loading, setLoading] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();
  const { track } = useAnalytics();

  const { setSessionData } = useSession();

  const searchParams = useSearchParams();

  const oauthLogin = useOauthLogin();

  useEffect(() => {
    if (redirected) return;

    const code = searchParams.get('code');

    const { identity_provider } = decodeState(searchParams);

    if (!code) {
      redirect('/');
    } else if (!loading && !error) {
      (async () => {
        setLoading(true);

        const { success, userId } = await oauthLogin(code);

        if (success && userId) {
          setSessionData({
            userId: userId || 'oauth-user',
          });

          track({
            category: 'page_flow',
            action: 'oauth_login_success',
            name: userId,
            // we manually set it here
            // because it won't be available
            // in the session context when this is called.
            user_id: userId,
            provider: identity_provider as OauthIdentityProviders,
          });

          router.push('/universe');
          setRedirected(true);
        } else {
          setError('Sorry, that code is invalid.');
        }
        setLoading(false);
      })();
    }
  }, [
    error,
    loading,
    oauthLogin,
    redirected,
    router,
    searchParams,
    setSessionData,
    track,
  ]);

  return (
    <UnauthenticatedPage loading={!error}>
      <div className='flex flex-col gap-8 items-center'>
        <div className='text-red-error'>{error}</div>
        <Link href='/'>
          <ButtonTopLeft>Home</ButtonTopLeft>
        </Link>
      </div>
    </UnauthenticatedPage>
  );
}
