'use client';

import React, { useRef, useCallback, useContext, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { useSettings } from './settings';

type ContextType = {
  onTrackCreate: () => void;
  onTrackCreated: () => void;
  onTrackOwned: () => void;
  onTrackSaved: () => void;
  onFaucetDailyReward: () => void;
  onFaucet: () => void;
  onVideoSaved: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const SFXContext = React.createContext<ContextType | undefined>(undefined);

const loadSFX = (k: string, loop: boolean = false) => {
  return new Howl({ src: `/sfx/${k}`, loop });
};

export const SFXProvider = ({ children }: ProviderProps) => {
  const { sfxVolume } = useSettings();

  useEffect(() => {
    Howler.volume(sfxVolume / 100);
  }, [sfxVolume]);

  const processingRefs = useRef([
    loadSFX('Echo_Processing_wait_music_v1.mp3', true),
    loadSFX('processing_wait_music_v3.mp3', true),
    loadSFX('processing_wait_music_v5.mp3', true),
    loadSFX('processing_wait_music_v6.mp3', true),
    loadSFX('processing_wait_music_v7.mp3', true),
    loadSFX('processing_wait_music_v8.mp3', true),
    loadSFX('processing_wait_music_v9.mp3', true),
  ]);
  const onBuy = useRef(loadSFX('ui_buy_v1.wav'));
  const onSave = useRef(loadSFX('ui_save_v2.wav'));
  const onProcessed = useRef(loadSFX('Processing_Complete.wav'));
  const faucetDailyReward = useRef(loadSFX('faucet_dailyreward.mp3'));
  const faucet = useRef(loadSFX('faucet.mp3'));

  const onTrackCreate = useCallback(() => {
    const i = Math.floor(Math.random() * processingRefs.current.length);
    const sfx = processingRefs.current[i];

    sfx.play();
  }, [processingRefs]);

  const onTrackCreated = useCallback(() => {
    processingRefs.current.map((p) => {
      if (p.playing()) {
        p.stop();
      }
    });

    onProcessed.current.play();
  }, []);

  const onTrackOwned = useCallback(() => {
    onBuy.current.play();
  }, [onBuy]);

  const onTrackSaved = useCallback(() => {
    onSave.current.play();
  }, [onSave]);

  const onFaucetDailyReward = useCallback(() => {
    faucetDailyReward.current.play();
  }, [faucetDailyReward]);

  const onFaucet = useCallback(() => {
    faucet.current.play();
  }, [faucet]);

  const onVideoSaved = useCallback(() => {
    onSave.current.play();
  }, [onSave]);

  return (
    <SFXContext.Provider
      value={{
        onTrackCreate,
        onTrackCreated,
        onTrackOwned,
        onTrackSaved,
        onFaucetDailyReward,
        onFaucet,
        onVideoSaved,
      }}
    >
      {children}
    </SFXContext.Provider>
  );
};

export const useSFX = (): ContextType => {
  const context = useContext(SFXContext);
  if (!context)
    throw new Error('Called useSFX before setting SFXProvider context');

  return context;
};
