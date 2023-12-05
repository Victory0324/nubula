'use client';

import { Bvh, Environment } from '@react-three/drei';
import Lighting from './Lighting';
import { AnimationFrames } from './RotatingKor/Kor';
import Background from './Background';
import Particles from './Particles';
import RotatingKor from './RotatingKor';
import { useKors } from '@/app/providers/kors';
import { useBackgrounds } from '@/app/providers/backgrounds';
import { CameraRig } from './CameraRig';
// import { Perf } from 'r3f-perf';

const Scene = ({
  state,
  kor,
  resetCamera,
}: {
  state: keyof typeof AnimationFrames;
  kor?: Kor;
  resetCamera: boolean;
}) => {
  const { previewedBackground } = useBackgrounds();
  const { previewKor } = useKors();

  return (
    <>
      <CameraRig {...{ resetCamera }} />
      <Environment files='renderings/backgrounds/neutral.hdr' />
      <Lighting color={previewKor?.eyeColor} />
      {kor && kor.korAsset && (
        <RotatingKor
          slug={kor.korUnlockId}
          eyeColor={kor.eyeColor}
          {...{ state, kor }}
        />
      )}
      {!previewedBackground?.custom && (
        <>
          <Bvh firstHitOnly>
            <Background />
          </Bvh>
          <Particles />
        </>
      )}
      {/* <Perf /> */}
    </>
  );
};

export default Scene;
