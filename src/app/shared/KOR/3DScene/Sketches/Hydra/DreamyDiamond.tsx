'use client';

import { useCallback } from 'react';
import HydraSketch from './Sketch';

export default function DreamyDiamond({
  parent,
}: {
  parent: HTMLDivElement | null;
}) {
  const sketch = useCallback((synth: any) => {
    synth
      .osc(7, -0.125)
      .modulate(synth.voronoi(1))
      .diff(synth.voronoi(1).mult(synth.gradient(-1).luma(0.125)))
      .luma(0.125)
      .add(
        synth
          .shape(7, 0.5)
          .mult(
            synth
              .voronoi(10, 2)
              .blend(synth.o0)
              .diff(synth.gradient(1))
              .modulate(synth.voronoi())
          )
      )
      .scrollY(-0.1)
      .scrollX(0.125)
      .blend(synth.o0)
      .blend(synth.o0)
      .out();
  }, []);

  return (
    <HydraSketch
      parent={parent}
      url='https://hydra.ojack.xyz/?sketch_id=rangga_0'
      author='Rangga Purnama Aji (https://ranggapurnamaaji1.wixsite.com/portfolio)'
      title='Dreamy Diamond'
      {...{ sketch }}
    />
  );
}
