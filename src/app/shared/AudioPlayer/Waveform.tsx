import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';
import Equalizer from '@/app/(authenticated)/(dashboard)/nebula/assets/Equalizer';
import { useAnalytics } from '@/app/providers/analytics';
import { CurrentTrackType } from '@/app/(authenticated)/(dashboard)/nebula/providers/audioPlayer';
import { useSettings } from '@/app/providers/settings';
import { useAudioXYEffects } from '@/app/providers/audioXYEffects';

type Props = {
  track: CurrentTrackType;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  waveformReady: boolean;
  setWaveformReady: React.Dispatch<React.SetStateAction<boolean>>;
  waveformRef: React.MutableRefObject<WaveSurfer | undefined>;
  setAverageFrequency?: React.Dispatch<React.SetStateAction<number>>;
  options?: Omit<WaveSurferOptions, 'container' | 'url'>;
};

const Waveform = ({
  track,
  playing,
  setPlaying,
  waveformRef,
  waveformReady,
  setWaveformReady,
  setAverageFrequency,
  options,
}: Props) => {
  // NOTE: This component is used in both the
  // unauthenticated /track/:id page and in authenticated
  // routes. If you add hooks ensure their providers
  // are present in both trees.
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [streamRoyalty, setStreamRoyalty] = useState(false);

  const waveContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>();

  const { track: trackEvent } = useAnalytics();
  const { outputVolume } = useSettings();

  const { setupXYEffects, removeXYEffects, audioContextRef } =
    useAudioXYEffects();

  useEffect(() => {
    if (!waveformRef.current || !waveformReady) return;
    waveformRef.current?.setVolume(outputVolume / 100);
  }, [outputVolume, waveformReady, waveformRef]);

  useEffect(() => {
    if (!waveContainerRef.current || !track?.audioUrl) return;

    waveformRef.current?.destroy();
    setDuration(0);
    setWaveformReady(false);

    audioRef.current = new Audio();
    audioRef.current.controls = true;
    audioRef.current.src = `/api/proxy?path=${track?.audioUrl}`;

    waveformRef.current = WaveSurfer.create({
      barWidth: 1.46,
      cursorWidth: 1,
      container: waveContainerRef.current,
      height: 20,
      progressColor: '#9A6AFF',
      waveColor: '#404040',
      cursorColor: 'transparent',
      media: audioRef.current,
      ...options,
    });

    setDuration(waveformRef.current.getDuration());
    waveformRef.current.on('load', () => {
      setWaveformReady(false);
    });

    waveformRef.current.once('play', () => {
      // if the track has played at least once.
      if (track?.itemType === 'track') {
        trackEvent({
          category: 'song',
          action: 'plays',
          name: track.itemId,
        });
      }
    });

    waveformRef.current.on('play', () => {
      if (!waveformRef.current) return;

      setPlaying(true);

      if (!audioContextRef.current) {
        setupXYEffects({
          mediaElement: waveformRef.current.getMediaElement(),
          bpm: (track as OutputTrack).bpm,
        });
      }
    });

    waveformRef.current.on('ready', () => {
      setDuration(waveformRef.current?.getDuration() || 0);
      setWaveformReady(true);
    });

    waveformRef.current.on('timeupdate', (time: number) => {
      setCurrentTime(time);
    });

    waveformRef.current.on('finish', () => {
      setPlaying(false);
    });

    return () => {
      setWaveformReady(false);
      waveformRef?.current?.destroy();
      audioRef?.current?.remove();
      removeXYEffects();
    };
  }, [
    options,
    setPlaying,
    setWaveformReady,
    waveformRef,
    trackEvent,
    setAverageFrequency,
    track,
    audioContextRef,
    setupXYEffects,
    removeXYEffects,
  ]);

  useEffect(() => {
    if (currentTime > 30 && playing) {
      setStreamRoyalty(true);
    }
  }, [currentTime, playing]);

  useEffect(() => {
    if (streamRoyalty) {
      trackEvent({
        category: 'stream_royalty',
        action: 'listen_30s+',
        name: track?.itemId ? track?.itemId : null,
      });
    }
  }, [track?.itemId, streamRoyalty, trackEvent]);

  useEffect(() => {
    if (!track?.audioUrl) {
      setDuration(0);
      setCurrentTime(0);
      setPlaying(false);
    }
  }, [setPlaying, track?.audioUrl]);

  useEffect(() => {
    if (waveformRef.current && waveformReady) {
      if (waveformRef.current?.isPlaying() !== playing) {
        (async () => {
          try {
            await waveformRef.current?.playPause();
          } catch (e) {
            console.warn(e);
          }
        })();
      }
    }
  }, [waveformRef, playing, waveformReady]);

  const getTimeString = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    if (isNaN(minutes) || isNaN(seconds)) return '';
    return `${minutes}:${seconds.toFixed(0).padStart(2, '0')}`;
  }, []);

  const currentTimeString = useMemo(
    () => getTimeString(currentTime),
    [currentTime, getTimeString]
  );

  const durationString = useMemo(
    () => getTimeString(duration),
    [duration, getTimeString]
  );

  return (
    <div className='flex flex-row items-center justify-center w-full'>
      <div className='w-[40px] shrink-0 text-sm font-light'>
        {currentTimeString}
      </div>
      <div className='grow mx-2'>
        {track?.audioUrl ? (
          <div className={``} ref={waveContainerRef} />
        ) : (
          <div className='flex justify-center'>
            <Equalizer />
          </div>
        )}
      </div>
      <div className='w-[40px] shrink-0 text-sm font-light text-gray-999 text-end'>
        {durationString}
      </div>
    </div>
  );
};

export default Waveform;
