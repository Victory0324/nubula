'use client';

import { postChat } from '@/utils/api/authenticated/elyxnir/userProfile/postChat';
import { getGeneratedLynxTrack } from '@/utils/helpers/lynx';
import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useStems } from '../(authenticated)/(dashboard)/nebula/providers/stems';
import { useAnalytics } from './analytics';
import { useMints } from './mints';
import { useTracks } from './tracks';

const CHAT_HISTORY_KEY = 'chat_history';
const CHAT_HISTORY_LENGTH = 12;

type ContextType = {
  history: LynxHistoryItem[];
  loading: boolean;
  error: string;
  send: (args?: {
    content: string;
    onSuccess?: (history: LynxHistoryItem[]) => void;
  }) => Promise<any>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = React.createContext<ContextType | undefined>(undefined);

export const ChatProvider = ({ children }: ProviderProps) => {
  const { unlockedIds } = useMints();
  const { tracks } = useTracks();
  const { track } = useAnalytics();
  const { inventoryStems } = useStems();
  const [history, setHistory] = useState<LynxPostBody['history']>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const send = useAuthenticatedQuery(
    useCallback(
      async ({
        content,
        onSuccess,
      }: {
        content: string;
        onSuccess?: (history: LynxHistoryItem[]) => void;
      }) => {
        const newData = {
          user: {
            unlockIds: unlockedIds || [],
            number_of_tracks_created: tracks.length,
            // owned stems will have a tokenId.
            number_of_stems_owned: inventoryStems.filter((stem) => stem.tokenId)
              .length,
          },
          history: [
            ...history,
            {
              role: 'user' as LynxHistoryItem['role'],
              content,
              hidden: false,
            },
          ],
        };

        // push the users message into the chat
        setHistory((p) => {
          return newData.history;
        });
        setLoading(true);
        const { success, data: resData, status } = await postChat(newData);
        setLoading(false);

        if (success) {
          setHistory(resData.history);
          if (onSuccess) onSuccess(resData.history);

          const outputTrack = getGeneratedLynxTrack(resData.history);

          if (outputTrack) {
            track({
              category: 'song',
              action: 'generated_lynx',
              name: outputTrack.itemId,
            });
            track({
              category: 'song',
              action: 'source',
              name: outputTrack.inputStemId,
            });
          }

          // persist the last n items to localstorage.
          localStorage.setItem(
            CHAT_HISTORY_KEY,
            JSON.stringify(resData.history.slice(-CHAT_HISTORY_LENGTH))
          );
        } else {
          setError('Something went wrong');
        }

        return { status };
      },
      [history, unlockedIds, tracks.length, setHistory, inventoryStems, track]
    )
  );

  useEffect(() => {
    // if no history we load it from cache.
    if (history.length == 0) {
      const data = localStorage.getItem(CHAT_HISTORY_KEY);
      if (data) {
        setHistory(JSON.parse(data));
      }
    }
  }, [history, setHistory]);

  return (
    <Context.Provider value={{ history, loading, error, send }}>
      {children}
    </Context.Provider>
  );
};

export const useChat = (): ContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error('Called useChat before setting ChatProvider context');

  return context;
};
