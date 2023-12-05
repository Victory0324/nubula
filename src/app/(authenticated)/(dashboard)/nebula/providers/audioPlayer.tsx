'use client';

import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { capitalize } from 'lodash';
import WaveSurfer from 'wavesurfer.js';

import { useOutputTrack } from '@/app/providers/outputTrack';
import { useStems } from './stems';
import { getStemTitle } from '@/utils/helpers/stems';

export type CurrentTrackType =
  | OutputTrack
  | InputStem
  | OutputTrackStem
  | undefined;

type ContextType = {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  waveformReady: boolean;
  setWaveformReady: React.Dispatch<React.SetStateAction<boolean>>;
  waveformRef: React.MutableRefObject<WaveSurfer | undefined>;
  currentTrack: CurrentTrackType;
  trackType: TrackType;
  trackName: string;
  averageFrequency: number;
  setAverageFrequency: React.Dispatch<React.SetStateAction<number>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const AudioPlayerContext = React.createContext<ContextType | undefined>(
  undefined
);

export type TrackType = 'output' | 'output-stem' | 'input' | 'empty';

export const AudioPlayerProvider = ({ children }: ProviderProps) => {
  const [playing, setPlaying] = useState(false);
  const waveformRef = useRef<WaveSurfer>();
  const [waveformReady, setWaveformReady] = useState(false);

  const { selectedStem, selectedOutputStem, inventoryStems } = useStems();
  const { outputTrack, creating } = useOutputTrack();
  const [averageFrequency, setAverageFrequency] = useState(0);

  useEffect(() => {
    if (creating) {
      setPlaying(false);
    }
  }, [creating]);

  const currentTrack = useMemo(() => {
    if (outputTrack && selectedOutputStem) {
      return selectedOutputStem;
    } else if (outputTrack) {
      return outputTrack;
    } else if (selectedStem) {
      return selectedStem;
    }
  }, [outputTrack, selectedStem, selectedOutputStem]);

  const trackType: TrackType = useMemo(() => {
    if (currentTrack === outputTrack && outputTrack) {
      return 'output';
    } else if (currentTrack === selectedOutputStem && selectedOutputStem) {
      return 'output-stem';
    } else if (currentTrack === selectedStem && selectedStem) {
      return 'input';
    } else {
      return 'empty';
    }
  }, [currentTrack, outputTrack, selectedStem, selectedOutputStem]);

  const trackName = useMemo(() => {
    if (trackType === 'empty') {
      return '---';
    } else if (trackType === 'output') {
      return outputTrack?.name || outputTrack?.generatedTrackName || '';
    } else if (trackType === 'output-stem') {
      return capitalize(selectedOutputStem?.category) || '';
    } else if (trackType === 'input') {
      return getStemTitle(inventoryStems, currentTrack as InputStem);
    } else {
      return '';
    }
  }, [
    currentTrack,
    inventoryStems,
    outputTrack?.generatedTrackName,
    outputTrack?.name,
    selectedOutputStem?.category,
    trackType,
  ]);

  return (
    <AudioPlayerContext.Provider
      value={{
        playing,
        setPlaying,
        waveformReady,
        setWaveformReady,
        waveformRef,
        currentTrack,
        trackType,
        trackName,
        averageFrequency,
        setAverageFrequency,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): ContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context)
    throw new Error(
      'Called useAudioPlayer before setting AudioPlayerProvider context'
    );

  return context;
};
