import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { useBackgrounds } from '@/app/providers/backgrounds';
import { useAudioXYEffects } from '@/app/providers/audioXYEffects';

export const CameraRig = ({ resetCamera }: { resetCamera: boolean }) => {
  const { enabled: audioXyEffectsEnabled } = useAudioXYEffects();
  const { previewedBackground } = useBackgrounds();

  const camRef = useRef<CameraControls | null>(null);

  useEffect(() => {
    if (camRef.current) {
      if (previewedBackground && previewedBackground.defaultPosition) {
        const { x, y, z } =
          previewedBackground.defaultPosition as THREE.Vector3;

        camRef.current.setPosition(x, y, z, true);
        camRef.current.rotateTo(0, Math.PI / 2, true);
      } else {
        camRef.current.setPosition(0, 0, 7, true);
        camRef.current.rotateTo(0, Math.PI / 2, true);
      }
    }
  }, [resetCamera, previewedBackground]);

  return (
    <CameraControls
      ref={camRef}
      makeDefault
      mouseButtons={{ left: 1, middle: 0, right: 0, wheel: 8 }}
      touches={{ one: 32, two: 1024, three: 0 }}
      // minAzimuthAngle={-Math.PI / 4}
      // maxAzimuthAngle={Math.PI / 4}
      // minPolarAngle={Math.PI / 6}
      // maxPolarAngle={Math.PI - Math.PI / 6}
      // smoothTime={0.7}
      distance={7}
      minDistance={2.5}
      maxDistance={7}
      enabled={!audioXyEffectsEnabled}
    />
  );
};
