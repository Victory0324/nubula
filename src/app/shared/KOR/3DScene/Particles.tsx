import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { Sparkles } from '@react-three/drei';
import { useKors } from '@/app/providers/kors';

const COUNT = 3000;

function Particles() {
  const [korColor, setKorColor] = useState(new THREE.Color());

  const { previewKor } = useKors();

  useEffect(() => {
    if (previewKor) {
      setKorColor(new THREE.Color(previewKor.eyeColor));
    }
  }, [previewKor]);

  return (
    <Sparkles
      count={COUNT}
      scale={15}
      color={korColor}
      speed={0.2}
      noise={[0, 0, 1]}
    />
  );
}

export default Particles;
