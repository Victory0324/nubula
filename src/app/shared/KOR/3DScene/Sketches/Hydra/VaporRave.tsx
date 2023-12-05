'use client';

import { useCallback } from 'react';
import HydraSketch from './Sketch';

export default function VaporRave({
  parent,
}: {
  parent: HTMLDivElement | null;
}) {
  const sketch = useCallback((synth: any) => {
    synth
      .osc(20, 0.1, 0)
      .color(0, 1, 2)
      .rotate(1.57 / 2)
      .out(synth.o1);
    synth
      .osc(30, 0.01, 0)
      .color(2, 0.7, 1)
      .modulate(synth.o1, 0)
      .add(synth.o1, 1)
      .modulatePixelate(synth.o1, 1, 10)
      .out(synth.o0);
  }, []);

  return (
    <HydraSketch
      parent={parent}
      url='https://hydra.ojack.xyz/?sketch_id=naoto_0'
      author='@naoto_hieda'
      title='Vapor Rave'
      {...{ sketch }}
    />
  );
}
