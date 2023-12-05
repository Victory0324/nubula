'use client';

import { useBackgrounds } from '@/app/providers/backgrounds';
import { Clone, useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import BrandKorBackground from './BrandKOR';
import BroadsideVRM from './BroadsideVRM';
import WebcamBackground from './WebcamBackground';

const GLB = ({ slug }: { slug: string }) => {
  const glb = useGLTF(`renderings/backgrounds/${slug}.glb`);

  return <Clone key={slug} object={glb.scene} scale={5} />;
};

const Background = () => {
  const { previewedBackground } = useBackgrounds();

  const background = useMemo(() => {
    if (!previewedBackground || !previewedBackground.slug)
      return <primitive object={{}} />;

    switch (previewedBackground.slug) {
      case 'brandkor':
        return <BrandKorBackground />;
      case 'broadsideVRM':
        return <BroadsideVRM />;
      case 'webcam':
        return <WebcamBackground />;
      default:
        return <GLB slug={previewedBackground.slug} />;
    }
  }, [previewedBackground]);

  return background;
};

export default Background;
