import { useMemo } from 'react';
import Voronoi from '../Sketches/Voronoi';
import { useBackgrounds } from '@/app/providers/backgrounds';
import { useElementSize } from '@/utils/hooks/dom/useElementSize';
import DreamyDiamond from '../Sketches/Hydra/DreamyDiamond';
import SunriseSerenity from '../Sketches/Hydra/SunriseSerenity';
import VaporRave from '../Sketches/Hydra/VaporRave';
import EarthChild from '../Sketches/Hydra/EarthChild';
import Stinger from '../Sketches/Hydra/Stinger';
import Brakdance from '../Sketches/Hydra/Brakdance';
import Teixido from '../Sketches/Hydra/Teixido';

export default function CustomBackground() {
  const { previewedBackground } = useBackgrounds();
  const [backgroundRef, setBackgroundRef, { width, height }] = useElementSize();

  const sketch = useMemo(() => {
    switch (previewedBackground?.slug) {
      case 'voronoi':
        return <Voronoi width={width} height={height} />;
      case 'dreamy-diamond':
        return <DreamyDiamond parent={backgroundRef} />;
      case 'sunrise-serenity':
        return <SunriseSerenity parent={backgroundRef} />;
      case 'vapor-rave':
        return <VaporRave parent={backgroundRef} />;
      case 'earth-child':
        return <EarthChild parent={backgroundRef} />;
      case 'stinger':
        return <Stinger parent={backgroundRef} />;
      case 'brakdance':
        return <Brakdance parent={backgroundRef} />;
      case 'teixido':
        return <Teixido parent={backgroundRef} />;
    }
  }, [backgroundRef, height, previewedBackground?.slug, width]);

  return (
    <div
      ref={setBackgroundRef}
      id='custom-sketch'
      className='absolute w-full h-full bg-transparent'
    >
      {sketch}
    </div>
  );
}
