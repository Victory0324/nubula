'use client';

import { isDev, isDevOrPreview, isProd } from '@/utils/helpers/env';
import React, { useCallback, useContext, useEffect } from 'react';
import Helika, { EventsBaseURL } from 'helika-sdk';
import { useSession } from '../(unauthenticated)/provider/session';
import UAParser from 'ua-parser-js';
// crypto.randomUUID polyfill for ie11
import '@ungap/random-uuid';

type ContextType = {
  track: (event: AnalyticsEventData) => void;
};

type ProviderProps = {
  children: React.ReactNode;
  clientIPAddress: string | undefined;
};

const AnalyticsContext = React.createContext<ContextType | undefined>(
  undefined
);

// everytime browser reloads we start a new session.
const sessionId = crypto.randomUUID();
const ua = new UAParser().getResult();

const helika = new Helika.EVENTS(
  `${process.env.NEXT_PUBLIC_HELIKA_API_KEY}`,
  isProd() ? 2 : isDevOrPreview() ? 1 : 0
);

export const AnalyticsProvider = ({
  children,
  clientIPAddress,
}: ProviderProps) => {
  const { sessionData } = useSession();

  const track = useCallback(
    async (data: AnalyticsEventData) => {
      const event = {
        created_at: new Date().toISOString(),
        game_id: 'korus-web' as AnalyticsEvent['game_id'],
        event_type: `${data.category}-${data.action}`,
        event: {
          user_id: sessionData?.userId,
          session_id: sessionId,
          client_ip: clientIPAddress,
          ...data,
          ...ua,
        },
      };

      console.info(`tracking: ${event.event_type}`, event);

      if (!isDev()) {
        await helika.startSession();
        await helika.createEvent([event]);
      }
    },
    [sessionData?.userId, clientIPAddress]
  );

  useEffect(() => {
    if (sessionId) {
      track({
        category: 'session',
        action: 'session_start',
        name: sessionId,
      });
    }

    // Note here we only ever want one session_start event
    // so we are purposely ignoring dependencys
    // useSession will have data on first render if user
    // is already signed in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{
        track,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): ContextType => {
  const context = useContext(AnalyticsContext);
  if (!context)
    throw new Error(
      'Called useAnalytics before setting AnalyticsProvider context'
    );

  return context;
};
