'use client';

import { EffectsChain, effectsChain } from '@/utils/audio/effects';
import getRelativeMousePosition from '@/utils/helpers/dom/getRelativeMousePosition';
import React, {
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type ContextType = {
  setupXYEffects: ({
    mediaElement,
    bpm,
  }: {
    mediaElement: HTMLMediaElement;
    bpm: number;
  }) => void;
  removeXYEffects: () => void;
  audioContextRef: React.MutableRefObject<AudioContext | undefined>;
  mediaStreamRef: React.MutableRefObject<
    MediaStreamAudioDestinationNode | undefined
  >;
  effectsChainRef?: React.MutableRefObject<EffectsChain | undefined>;
  enabled: boolean;
  setEnabled: React.Dispatch<SetStateAction<boolean>>;
  mapMouseToXYEffects: MouseEventHandler<HTMLElement>;
  xy: Coordinates;
  setXy: React.Dispatch<SetStateAction<Coordinates>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = React.createContext<ContextType | undefined>(undefined);

export const AudioXYEffectsProvider = ({ children }: ProviderProps) => {
  const audioContextRef = useRef<AudioContext>();
  const sourceRef = useRef<MediaElementAudioSourceNode>();
  const gainRef = useRef<GainNode>();
  const effectsChainRef = useRef<EffectsChain>();
  const mediaStreamRef = useRef<MediaStreamAudioDestinationNode>();

  const [xy, setXy] = useState({ x: 0.5, y: 0.5 });

  const [enabled, setEnabled] = useState(true);

  const setupXYEffects = useCallback(
    ({
      mediaElement,
      bpm = 120,
    }: {
      mediaElement: HTMLMediaElement;
      bpm: number;
    }) => {
      if (audioContextRef.current) return;

      const audioContext = new AudioContext();
      const gainNode = new GainNode(audioContext);

      const fxChain = effectsChain(audioContext, gainNode, bpm);

      const source = new MediaElementAudioSourceNode(audioContext, {
        mediaElement,
      });

      source.connect(fxChain.destination);
      gainNode.connect(audioContext.destination);

      // Create a MediaStreamAudioDestinationNode
      const mediaStream = audioContext.createMediaStreamDestination();

      gainNode.connect(mediaStream);

      sourceRef.current = source;
      gainRef.current = gainNode;
      effectsChainRef.current = fxChain;
      audioContextRef.current = audioContext;
      mediaStreamRef.current = mediaStream;
    },
    []
  );

  const removeXYEffects = useCallback(() => {
    if (audioContextRef.current?.state !== 'closed')
      audioContextRef.current?.close();

    sourceRef.current?.disconnect();
    gainRef.current?.disconnect();
    mediaStreamRef.current?.disconnect();
    effectsChainRef.current?.close();
    audioContextRef.current = undefined;
  }, []);

  useEffect(() => removeXYEffects, [removeXYEffects]);

  const mapMouseToXYEffects = useCallback((e: MouseEvent) => {
    const { x, y } = getRelativeMousePosition(e);

    setXy({ x, y });
  }, []);

  useEffect(() => {
    effectsChainRef.current?.xyEffect(xy.x, xy.y);
  }, [effectsChainRef, xy, xy.x, xy.y]);

  return (
    <Context.Provider
      value={{
        setupXYEffects,
        removeXYEffects,
        audioContextRef,
        effectsChainRef,
        mediaStreamRef,
        enabled,
        setEnabled,
        mapMouseToXYEffects,
        xy,
        setXy,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAudioXYEffects = (): ContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      'Called useAudioXYEffects before setting AudioXYEffectsProvider context'
    );

  return context;
};
