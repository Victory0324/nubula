'use client';

import { getInventoryInstances } from '@/utils/api/authenticated/elyxnir/inventory/getInstances';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import useAuthenticatedQuery from '@/utils/hooks/api/useAuthenticatedQuery';

type ContextType = {
  videos: VideoInstance[] | [];
  setVideos: React.Dispatch<React.SetStateAction<VideoInstance[]>>;
  error: string;
  loading: boolean;
  refetching: boolean;
  refetch: () => Promise<void>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const VideoContext = React.createContext<ContextType | undefined>(undefined);

export const VideosProvider = ({ children }: ProviderProps) => {
  const getInventoryInstancesQuery = useAuthenticatedQuery(
    useCallback(() => getInventoryInstances('Video'), [])
  );

  const [loading, setLoading] = useState(true);

  const [refetching, setRefetching] = useState(true);
  const [error, setError] = useState('');

  const [videos, setVideos] = useState<VideoInstance[]>([]);

  const getVideos = useCallback(async () => {
    const { data, success, message } = await getInventoryInstancesQuery();

    if (success) {
      const deduplicated = (data as VideoInstance[]).filter(
        (obj, index, self) =>
          self.findIndex((item) => item.instanceId === obj.instanceId) === index
      );

      setVideos(deduplicated);
    } else {
      setError(message);
    }
  }, [getInventoryInstancesQuery]);

  const refetch = useCallback(async () => {
    setRefetching(true);
    await getVideos();
    setRefetching(false);
  }, [getVideos]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getVideos();
      setLoading(false);
    })();
  }, [getVideos]);

  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        refetch,
        error,
        loading,
        refetching,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = (): ContextType => {
  const context = useContext(VideoContext);
  if (!context)
    throw new Error('Called useVideos before setting VideosProvider context');

  return context;
};
