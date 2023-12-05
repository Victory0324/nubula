'use client';

import featureFlag from '@/utils/helpers/featureFlag';
import React, { useContext, useEffect, useState } from 'react';

type ContextType = {
  autogenerateCheck: boolean;
  setAutogenerateCheck: React.Dispatch<React.SetStateAction<boolean>>;
  outputVolume: number;
  setOutputVolume: React.Dispatch<React.SetStateAction<number>>;
  sfxVolume: number;
  setSfxVolume: React.Dispatch<React.SetStateAction<number>>;
  tooltips: boolean;
  setTooltips: React.Dispatch<React.SetStateAction<boolean>>;
  videoInventory: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = React.createContext<ContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: ProviderProps) => {
  const [autogenerateCheck, setAutogenerateCheck] = useState(true);
  const [outputVolume, setOutputVolume] = useState(100);
  const [sfxVolume, setSfxVolume] = useState(100);
  const [tooltips, setTooltips] = useState(true);

  const [videoInventory] = useState<boolean>(
    featureFlag('settings.videoInventory')
  );

  useEffect(() => {
    const cachedOutput = localStorage.getItem('outputVolume');
    const cachedSfx = localStorage.getItem('sfxVolume');

    if (cachedOutput) setOutputVolume(JSON.parse(cachedOutput));
    if (cachedSfx) setSfxVolume(JSON.parse(cachedSfx));
  }, []);

  useEffect(
    () => localStorage.setItem('outputVolume', JSON.stringify(outputVolume)),
    [outputVolume]
  );

  useEffect(
    () => localStorage.setItem('sfxVolume', JSON.stringify(sfxVolume)),
    [outputVolume, sfxVolume]
  );

  useEffect(() => {
    // global howler volume
    Howler.volume(outputVolume / 100);
  }, [outputVolume]);

  return (
    <Context.Provider
      value={{
        autogenerateCheck,
        setAutogenerateCheck,
        outputVolume,
        setOutputVolume,
        sfxVolume,
        setSfxVolume,
        tooltips,
        setTooltips,
        videoInventory,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSettings = (): ContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      'Called useSettings before setting SettingsProvider context'
    );

  return context;
};
