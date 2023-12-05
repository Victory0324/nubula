import { useState, useRef, useMemo } from 'react';
import Play from '@/app/(authenticated)/(dashboard)/nebula/assets/Play';
import Pause from '@/app/(authenticated)/(dashboard)/nebula/assets/Pause';
import Waveform from './Waveform';
import WaveSurfer from 'wavesurfer.js';
import { useAnalytics } from '@/app/providers/analytics';

export default function SimpleAudioPlayer({ track }: { track: OutputTrack }) {
  const { track: trackEvent } = useAnalytics();
  const [playing, setPlaying] = useState(false);
  const [waveFormReady, setWaveFormReady] = useState(false);
  const options = useMemo(() => ({ waveColor: '#FFFFFF' }), []);

  const waveFormRef = useRef<WaveSurfer>();
  return (
    <div className='flex'>
      {playing ? (
        <Pause className='cursor-pointer' onClick={() => setPlaying(false)} />
      ) : (
        <Play
          className='cursor-pointer'
          onClick={() => {
            setPlaying(true);
            trackEvent({
              category: 'share',
              action: 'play',
              name: track.itemId,
            });
          }}
        />
      )}
      <Waveform
        track={track}
        playing={playing}
        setPlaying={setPlaying}
        waveformRef={waveFormRef}
        waveformReady={waveFormReady}
        setWaveformReady={setWaveFormReady}
        options={options}
      />
    </div>
  );
}
