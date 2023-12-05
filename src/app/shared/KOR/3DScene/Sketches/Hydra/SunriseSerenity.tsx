'use client';

import { useCallback } from 'react';
import HydraSketch from './Sketch';

export default function SunriseSerenity({
  parent,
}: {
  parent: HTMLDivElement | null;
}) {
  const sketch = useCallback((synth: any) => {
    synth
      .osc(8, -0.5, 1)
      .color(-1.5, -1.5, -1.5)
      .blend(synth.o0)
      .rotate(-0.5, -0.5)
      .modulate(
        synth
          .shape(4)
          .rotate(0.5, 0.5)
          .scale(2)
          .repeatX(2, 2)
          .modulate(synth.o0, () => synth.mouse.x * 0.0005)
          .repeatY(2, 2)
      )
      .out(synth.o0);
  }, []);

  return (
    <HydraSketch
      parent={parent}
      url='https://hydra.ojack.xyz/?sketch_id=example_4'
      author='Nelson Vera (twitter: @nel_sonologia)'
      title='Sunrise Serenity'
      {...{ sketch }}
    />
  );
}
