import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { WebcamMaterial, WebcamProvider, useWebcam } from '../Webcam';
import { OrthographicCamera } from '@react-three/drei';

function WebcamBackground() {
  return (
    <WebcamProvider>
      <WebcamBackgroundImpl />
    </WebcamProvider>
  );
}

function WebcamBackgroundImpl() {
  const { webcamStream, startWebcam, stopWebcam } = useWebcam();
  const { viewport } = useThree();

  useEffect(() => {
    if (!webcamStream?.active) {
      startWebcam();
    }
    return () => stopWebcam();
  }, [startWebcam, stopWebcam, webcamStream]);

  return (
    <>
      <OrthographicCamera makeDefault zoom={100} position-z={100} />
      {webcamStream && (
        <group scale={[-viewport.width, viewport.height, 1]} position-z={-2}>
          <mesh>
            <planeGeometry />

            <WebcamMaterial webcamStream={webcamStream} />
          </mesh>
        </group>
      )}
    </>
  );
}

export default WebcamBackground;
