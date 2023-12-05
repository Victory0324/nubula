'use client';

import { useCallback } from 'react';
import HydraSketch from './Sketch';

declare global {
  interface Array<T> {
    fast(value: number): Array<T>;
  }
}

export default function Teixido({ parent }: { parent: HTMLDivElement | null }) {
  const sketch = useCallback((synth: any) => {
    synth.a.setSmooth(0.5);
    synth
      .osc(5, 0.2, 0.001)
      .kaleid([3, 4, 5, 7, 8, 9, 10].fast(0.1))
      .color(0.5, 0.3)
      .colorama(0.4)
      .rotate(0.009, () => Math.sin(synth.time) * -0.001)
      .modulateRotate(synth.o0, () => Math.sin(synth.time) * 0.003)
      .modulate(synth.o0, 0.9)
      .scale(0.9)
      .out(synth.o0);
  }, []);

  return (
    <HydraSketch
      parent={parent}
      url='https://hydra.ojack.xyz/?sketch_id=marianne_0'
      author='Marianne Teixido (https://marianneteixido.github.io/)'
      title='Teixido'
      audio
      {...{ sketch }}
    />
  );
}
