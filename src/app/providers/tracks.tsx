'use client';

import { getInventoryInstances } from '@/utils/api/authenticated/elyxnir/inventory/getInstances';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';

type ContextType = {
  tracks: TrackInstance[] | [];
  setTracks: React.Dispatch<React.SetStateAction<TrackInstance[]>>;
  error: string;
  loading: boolean;
  refetching: boolean;
  refetch: () => Promise<void>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const TracksContext = React.createContext<ContextType | undefined>(undefined);

export const TracksProvider = ({ children }: ProviderProps) => {
  const getInventoryInstancesQuery = useAuthenticatedQuery(
    useCallback(() => getInventoryInstances('Track'), [])
  );

  const [loading, setLoading] = useState(true);

  const [refetching, setRefetching] = useState(true);
  const [error, setError] = useState('');

  const [tracks, setTracks] = useState<TrackInstance[]>([]);

  const getTracks = useCallback(async () => {
    const { data, success, message } = await getInventoryInstancesQuery();

    if (success) {
      const deduplicated = (data as TrackInstance[]).filter(
        (obj, index, self) =>
          self.findIndex((item) => item.instanceId === obj.instanceId) === index
      );

      setTracks(deduplicated);
    } else {
      setError(message);
    }
  }, [getInventoryInstancesQuery]);

  const refetch = useCallback(async () => {
    setRefetching(true);
    await getTracks();
    setRefetching(false);
  }, [getTracks]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getTracks();
      setLoading(false);
    })();
  }, [getTracks]);

  return (
    <TracksContext.Provider
      value={{
        tracks,
        setTracks,
        refetch,
        error,
        loading,
        refetching,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};

export const useTracks = (): ContextType => {
  const context = useContext(TracksContext);
  if (!context)
    throw new Error('Called useTracks before setting TracksProvider context');

  return context;
};
