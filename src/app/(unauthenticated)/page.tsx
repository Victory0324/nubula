'use client';

import { redirect } from 'next/navigation';

import { useEffect, useState } from 'react';
import UnauthenticatedPage from './shared/UnauthenticatedPage';
import { useCookieBanner } from '../shared/CookieBanner';
import Version from '../Version';
import AuthForm from './AuthForm';
import { useSession } from './provider/session';

export default function Home() {
  const showCookieBanner = useCookieBanner();
  const { sessionData } = useSession();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionData?.userId) {
      redirect('/connect-wallet');
    } else {
      setLoading(false);
    }
  }, [sessionData?.userId]);

  useEffect(() => void showCookieBanner(), [showCookieBanner]);

  return (
    <UnauthenticatedPage {...{ loading }}>
      <AuthForm />
      <Version />
    </UnauthenticatedPage>
  );
}
