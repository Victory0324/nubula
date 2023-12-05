'use client';

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';

interface LocalSessionData {
  email?: string;
  userId?: string;
}

interface SessionContextProps {
  sessionData?: LocalSessionData;
  setSessionData: (data: LocalSessionData) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionData, setSessionData] = useState<Partial<LocalSessionData>>(
    () => {
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('sessionData') || '{}');
      }
      return {};
    }
  );

  const handleSetSessionData = useCallback((data: LocalSessionData) => {
    localStorage.setItem('sessionData', JSON.stringify(data));
    setSessionData(data);
  }, []);

  const sessionContextValue: SessionContextProps = useMemo(
    () => ({
      sessionData,
      setSessionData: handleSetSessionData,
    }),
    [handleSetSessionData, sessionData]
  );

  return (
    <SessionContext.Provider value={sessionContextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, useSession };
