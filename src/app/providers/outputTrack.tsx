'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useStems } from '@/app/(authenticated)/(dashboard)/nebula/providers/stems';
import { useMints } from './mints';
import { getOutputTrack } from '@/utils/api/soundMosaic/outputTrack';
import { useRouter } from '@/app/providers/router';
import { getRecreateTrack } from '../../utils/api/soundMosaic/recreateTrack';
import useCompleteOn3Quest from '@/utils/hooks/quests/on3/useTrackOn3Quest';
import { useSFX } from './sfx';
import { useCurrentUser } from './User';
import { useAnalytics } from './analytics';
import { useKors } from './kors';
import { useCurrency } from './currency';

type ContextType = {
  creating: boolean;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
  outputTrack?: OutputTrack;
  setOutputTrack: React.Dispatch<React.SetStateAction<OutputTrack | undefined>>;
  createTrack: () => Promise<void>;
  recreateTrack: (changeAmount: number) => Promise<void>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const OutputTrackContext = React.createContext<ContextType | undefined>(
  undefined
);

export const OutputTrackProvider = ({ children }: ProviderProps) => {
  const router = useRouter();

  const { claimReward } = useCurrency();

  const { selectedStem, setSelectedStem } = useStems();
  const { selectedKorId } = useKors();

  const { unlockedIds, sessionUnlockedIds } = useMints();
  const { user } = useCurrentUser();
  const { track } = useAnalytics();

  const completeOn3Quest = useCompleteOn3Quest();

  const [creating, setCreating] = useState(false);
  const [outputTrack, setOutputTrack] = useState<OutputTrack | undefined>();
  const { onTrackCreate, onTrackCreated } = useSFX();

  useEffect(() => {
    if (!user) setOutputTrack(undefined);
  }, [user]);

  useEffect(() => {
    const cachedOutputTrack = localStorage.getItem('outputTrack');
    if (cachedOutputTrack) setOutputTrack(JSON.parse(cachedOutputTrack));
  }, []);

  useEffect(
    () =>
      outputTrack
        ? localStorage.setItem('outputTrack', JSON.stringify(outputTrack))
        : localStorage.removeItem('outputTrack'),
    [outputTrack]
  );

  const createTrack = useCallback(async () => {
    if (!selectedStem) return;

    setCreating(true);

    claimReward('track-create');

    onTrackCreate();

    getOutputTrack({
      stemId: selectedStem?.itemId,
      unlockIds: [
        ...(unlockedIds || []),
        ...(sessionUnlockedIds || []),
        selectedKorId as string,
      ],
      creator: user?.displayName,
    })
      .then((output) => {
        setOutputTrack(output);
        setSelectedStem(undefined);

        onTrackCreated();
        track({
          category: 'song',
          action: 'generated_create_b',
          name: output.itemId,
        });
        track({
          category: 'song',
          action: 'source',
          name: output.inputStemId,
        });
        track({
          category: 'received_coins',
          action: 'track_created',
          name: output.inputStemId,
        });

        completeOn3Quest('SOUND_NEBULA_TRACK_CREATED');
        completeOn3Quest('CREATE_ONE_TRACK');
        if (unlockedIds?.includes('beatport')) {
          completeOn3Quest('CREATE_ONE_TRACK_WITH_BEATPORT_STEM');
        }
      })
      .finally(() => {
        setCreating(false);
      });

    router.push('/output');
  }, [
    selectedStem,
    claimReward,
    onTrackCreate,
    unlockedIds,
    sessionUnlockedIds,
    selectedKorId,
    user?.displayName,
    router,
    setSelectedStem,
    onTrackCreated,
    track,
    completeOn3Quest,
  ]);

  const recreateTrack = useCallback(
    async (changeAmount: number) => {
      if (!outputTrack || !outputTrack.itemId) {
        return;
      }

      setCreating(true);
      onTrackCreate();

      getRecreateTrack({
        trackid: outputTrack.itemId,
        changeAmount,
      })
        .then((output) => {
          onTrackCreated();
          setOutputTrack(output);
          track({
            category: 'song',
            action: 'recreate',
            name: output.itemId,
          });
          track({
            category: 'song',
            action: 'source',
            name: output.inputStemId,
          });
        })
        .finally(() => {
          setCreating(false);
        });

      router.push('/output');
    },
    [router, outputTrack, track, onTrackCreate, onTrackCreated]
  );

  return (
    <OutputTrackContext.Provider
      value={{
        outputTrack,
        setOutputTrack,
        creating,
        setCreating,
        createTrack,
        recreateTrack,
      }}
    >
      {children}
    </OutputTrackContext.Provider>
  );
};

export const useOutputTrack = (): ContextType => {
  const context = useContext(OutputTrackContext);
  if (!context)
    throw new Error('Called useTracks before setting TracksProvider context');

  return context;
};
