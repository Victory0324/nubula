'use client';

import { useCallback } from 'react';
import HydraSketch from './Sketch';

export default function Brakdance({
  parent,
}: {
  parent: HTMLDivElement | null;
}) {
  const sketch = useCallback((synth: any) => {
    synth.a.setSmooth(0.5);

    synth.s0.initVideo('images/sketches/brakdance.mp4');
    synth
      .src(synth.s0)
      .rotate(() => Math.sin(synth.time))
      .modulate(synth.noise(() => (synth.mouse.y / window.innerHeight) * 10))
      .pixelate(
        () => {
          const au = synth.a.fft[0];
          return au < 0.3 ? window.innerWidth : au * 100;
        },
        () => {
          const au = synth.a.fft[0];
          return au < 0.3 ? window.innerHeight : au * 100;
        }
      )
      .out(synth.o0);
  }, []);

  return (
    <HydraSketch
      parent={parent}
      url='https://hydra.ojack.xyz/?sketch_id=naoto_0'
      author='@naoto_hieda'
      title='Vapor Rave'
      audio
      {...{ sketch }}
    />
  );
}
