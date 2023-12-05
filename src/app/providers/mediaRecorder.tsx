'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAudioXYEffects } from './audioXYEffects';
import { getMetadata, getThumbnails } from 'video-metadata-thumbnails';
import { IThumbnail } from 'video-metadata-thumbnails/lib/video/ithumbnail';
import { useAudioPlayer } from '../(authenticated)/(dashboard)/nebula/providers/audioPlayer';

export type RecordedAsset = {
  video: Blob;
  image: Blob;
  thumbnails: IThumbnail[];
  duration: number;
};

type ContextType = {
  canvasRecorderRef: React.MutableRefObject<MediaRecorder | undefined>;
  state: 'idle' | 'recording' | 'paused';
  recordedAsset: RecordedAsset | null;
  selectedRecording: VideoInstance | null;
  setSelectedRecording: React.Dispatch<
    React.SetStateAction<VideoInstance | null>
  >;
  clearRecordedAsset: () => void;
  setupRecorder: (canvas: HTMLCanvasElement) => void;
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  clearRecording: () => void;
  customBackgroundCanvasRef?: HTMLCanvasElement;
  setCustomBackgroundCanvasRef: React.Dispatch<
    React.SetStateAction<HTMLCanvasElement | undefined>
  >;
  dimensions?: {
    width: number;
    height: number;
  };
  setDimensions: React.Dispatch<
    React.SetStateAction<
      | {
        width: number;
        height: number;
      }
      | undefined
    >
  >;
};

type ProviderProps = {
  children: React.ReactNode;
};

const Context = React.createContext<ContextType | undefined>(undefined);

export const MediaRecorderProvider = ({ children }: ProviderProps) => {
  const { setPlaying } = useAudioPlayer();
  const { enabled, mediaStreamRef } = useAudioXYEffects();

  const canvasRecorderRef = useRef<MediaRecorder>();

  const canvasChunks = useRef<Blob[]>([]);
  const [state, setState] = useState<'idle' | 'recording' | 'paused'>('idle');
  const [recordedAsset, setRecordedAsset] = useState<RecordedAsset | null>(
    null
  );
  const [selectedRecording, setSelectedRecording] =
    useState<VideoInstance | null>(null);

  const [customBackgroundCanvasRef, setCustomBackgroundCanvasRef] =
    useState<HTMLCanvasElement>();

  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>();

  const clearRecordedAsset = useCallback(() => {
    setRecordedAsset(null);
  }, []);

  const startRecording = useCallback(() => {
    canvasRecorderRef.current?.start();
    setState('recording');
  }, []);

  const pauseRecording = useCallback(() => {
    canvasRecorderRef.current?.pause();
    setState('paused');
  }, []);

  const resumeRecording = useCallback(() => {
    canvasRecorderRef.current?.resume();
    setState('recording');
  }, []);

  const stopRecording = useCallback(() => {
    canvasRecorderRef.current?.stop();
    setState('idle');
  }, []);

  const clearRecording = useCallback(() => {
    canvasChunks.current = [];
    clearRecordedAsset();
    setState('idle');
  }, [clearRecordedAsset]);

  useEffect(() => {
    if (state === 'recording' && !enabled) stopRecording();
  }, [enabled, state, stopRecording]);

  const setupRecorder = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvasRecorderRef.current) {
        stopRecording();
        clearRecording();
      }

      let canvasStream: MediaStream;

      if (customBackgroundCanvasRef) {
        const mergeCanvas = canvas.cloneNode() as HTMLCanvasElement;
        const ctx = mergeCanvas.getContext('2d');
        if (ctx) {
          const toMerge = [customBackgroundCanvasRef, canvas];

          const anim = () => {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            toMerge.forEach((layer) => {
              ctx.drawImage(layer, 0, 0);
            });
            requestAnimationFrame(anim);
          };
          anim();
        }
        canvasStream = mergeCanvas.captureStream(60);
      } else canvasStream = canvas.captureStream(60);

      const sources = [];

      sources.push(...canvasStream.getVideoTracks());

      if (mediaStreamRef.current)
        sources.push(...mediaStreamRef.current.stream.getAudioTracks());

      try {
        const stream = new MediaStream(sources);
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            canvasChunks.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          const video = new Blob(canvasChunks.current, { type: 'video/webm' });

          const { duration } = await getMetadata(video);
          const thumbnails = await getThumbnails(video, {
            start: 0,
            quality: 0.6,
            interval: duration / 6,
          });

          setRecordedAsset({
            video,
            image: thumbnails[0].blob as Blob,
            thumbnails,
            duration,
          });
        };

        canvasRecorderRef.current = recorder;
        startRecording();
      } catch (error) {
        console.error(error);
      }
    },
    [
      clearRecording,
      customBackgroundCanvasRef,
      mediaStreamRef,
      startRecording,
      stopRecording,
    ]
  );

  useEffect(() => {
    if (selectedRecording) setPlaying(false);
  }, [selectedRecording, setPlaying]);

  return (
    <Context.Provider
      value={{
        canvasRecorderRef,
        state,
        setupRecorder,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
        clearRecording,
        customBackgroundCanvasRef,
        setCustomBackgroundCanvasRef,
        dimensions,
        setDimensions,
        recordedAsset,
        clearRecordedAsset,
        selectedRecording,
        setSelectedRecording,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMediaRecorder = (): ContextType => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      'Called useMediaRecorder before setting MediaRecorderProvider context'
    );

  return context;
};
