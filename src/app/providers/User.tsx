'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { logout } from '@/utils/api/auth/logout';
import { useRouter } from 'next/navigation';
import { useSession } from '../(unauthenticated)/provider/session';
import { useGetUser } from '@/utils/api/authenticated/elyxnir/user/getUser';
import usePaperEmbeddedWalletSdk from '@/utils/hooks/paper/usePaperEmbeddedWalletSdk';

type ContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<User | undefined>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const UserContext = React.createContext<ContextType | undefined>(undefined);

export const UserProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const { sessionData, setSessionData } = useSession();
  const getUser = useGetUser();
  const { sdk: paperSDK } = usePaperEmbeddedWalletSdk();

  const handleLogout = useCallback(async () => {
    await paperSDK?.auth.logout();
    setUser(undefined);
    await logout();
    setSessionData({});
    router.push('/');
  }, [setUser, router, setSessionData, paperSDK?.auth]);

  const fetchUser = useCallback(async () => {
    setLoading(true);

    const { data, status } = await getUser();

    if (status === 401) handleLogout();
    else if (data) setUser(data);

    setLoading(false);

    return user;
  }, [getUser, handleLogout, user]);

  useEffect(() => {
    if (sessionData?.userId && !loading && !user) {
      fetchUser();
    }
  }, [fetchUser, loading, sessionData?.userId, user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        logout: handleLogout,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = (): ContextType => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error(
      'Called useCurrentUser before setting UserProvider context'
    );

  return context;
};
