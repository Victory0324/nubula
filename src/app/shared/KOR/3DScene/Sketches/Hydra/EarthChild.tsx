'use client';

import { useCallback } from 'react';
import HydraSketch from './Sketch';

export default function EarthChild({
  parent,
}: {
  parent: HTMLDivElement | null;
}) {
  const sketch = useCallback((synth: any) => {
    synth
      .noise(3, 0.1, 7)
      .rotate(1, -1, -2)
      .mask(synth.shape(20))
      .colorama(0.5)
      .modulateScale(synth.o0)
      .modulateScale(synth.o0, 1)
      .blend(synth.o0)
      .blend(synth.o0)
      .blend(synth.o0)
      .blend(synth.o0)
      .out(synth.o0);
  }, []);

  return (
    <HydraSketch
      parent={parent}
      url='https://hydra.ojack.xyz/?sketch_id=asdrubal_0'
      author='Asdrúbal Gomez'
      title='Earth Child'
      {...{ sketch }}
    />
  );
}
