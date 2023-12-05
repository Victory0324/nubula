import { VRMCore, VRMHumanBoneName, VRMLoaderPlugin } from '@pixiv/three-vrm';
import { FaceLandmarker, useFaceLandmarker } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Euler, Matrix4, Object3D, Quaternion, Bone, MathUtils } from 'three';
import { GLTFLoader } from 'three-stdlib';
import { WebcamProvider, useWebcam } from '../Webcam';
import { useAudioXYEffects } from '@/app/providers/audioXYEffects';

export default function BroadsideVRM() {
  return (
    <>
      <FaceLandmarker>
        <WebcamProvider>
          <Model modelUrl={'renderings/backgrounds/Stinger_2969.vrm'} />
          <ambientLight intensity={15} />
        </WebcamProvider>
      </FaceLandmarker>
    </>
  );
}

type BonesStore = {
  head: Object3D;
  neck: Bone;
  hips: Bone;
  spine: Bone;
  upperChest: Bone;
  leftArm: Object3D;
  rightArm: Object3D;
};

const Model = ({ modelUrl }: { modelUrl: string }) => {
  const faceLandmarker = useFaceLandmarker();
  const { videoElement, startWebcam, stopWebcam, webcamStream } = useWebcam();
  const [vrmModel, setVrmModel] = useState<VRMCore | null>(null);
  const vrmModelRef = useRef();
  const [bonesStore, setBones] = useState<BonesStore | null>(null);
  const { clock } = useThree();
  const isCancelled = useRef(false);
  const { setXy } = useAudioXYEffects();
  const prevX = useRef(0.5);
  const prevY = useRef(0.5);

  useEffect(() => {
    if (!webcamStream?.active) {
      startWebcam();
    }
    return () => stopWebcam();
  }, [startWebcam, stopWebcam, webcamStream]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.loadAsync(modelUrl).then((gltf) => {
      const vrm = gltf.userData.vrm;
      setVrmModel(vrm);

      const bones = {
        head: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head),
        neck: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Neck),
        hips: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips),
        spine: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Spine),
        upperChest: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.UpperChest),
        leftArm: vrm.humanoid.getNormalizedBoneNode(
          VRMHumanBoneName.LeftUpperArm
        ),
        rightArm: vrm.humanoid.getNormalizedBoneNode(
          VRMHumanBoneName.RightUpperArm
        ),
      };

      bones.leftArm.rotation.z = 1.3;
      bones.rightArm.rotation.z = -1.3;

      setBones(bones);
    });
  }, [modelUrl]);

  const detectApplyMotion = useCallback(async () => {
    if (!webcamStream?.active || isCancelled.current || !videoElement) return;

    const targetEuler = new Euler();
    const currentQuaternion = new Quaternion();
    const targetQuaternion = new Quaternion();
    const headRotation = new Euler();
    const matrix = new Matrix4();

    const elapsedTime = clock.elapsedTime;

    if (faceLandmarker) {
      const faceLandmarkerResult = faceLandmarker?.detectForVideo(
        videoElement,
        performance.now()
      );

      if (
        faceLandmarkerResult?.faceBlendshapes &&
        faceLandmarkerResult?.faceBlendshapes.length > 0 &&
        faceLandmarkerResult?.faceBlendshapes[0].categories &&
        bonesStore &&
        vrmModel
      ) {
        const blendshapes = faceLandmarkerResult.faceBlendshapes[0].categories;

        vrmModel.expressionManager?.setValue(
          'blinkRight',
          blendshapes[9].score
        );
        vrmModel.expressionManager?.setValue(
          'blinkLeft',
          blendshapes[10].score
        );

        if (bonesStore.head) {
          matrix.fromArray(
            faceLandmarkerResult.facialTransformationMatrixes[0].data
          );

          headRotation.setFromRotationMatrix(matrix);

          const smoothTime = 0.05;

          const currentRotation = bonesStore.head.rotation;

          targetEuler.set(-headRotation.x, -headRotation.y, headRotation.z);

          currentQuaternion.setFromEuler(targetEuler);
          targetQuaternion.setFromEuler(currentRotation);

          currentQuaternion.slerp(targetQuaternion, smoothTime);

          bonesStore.head.rotation.setFromQuaternion(currentQuaternion);

          let x = -Math.sin(headRotation.y) * Math.cos(headRotation.x) + 0.5;
          let y = Math.sin(headRotation.x) + 0.5;

          if (x < 0.02) x = 0.02;
          if (x > 0.98) x = 0.98;
          if (y < 0) y = 0;
          if (y > 0.98) y = 0.98;

          const t = 0.3;
          x = MathUtils.lerp(prevX.current, x, t);
          y = MathUtils.lerp(prevY.current, y, t);

          prevX.current = x;
          prevY.current = y;

          setXy({
            x,
            y,
          });
        }

        if (bonesStore.upperChest) {
          bonesStore.upperChest.rotation.y =
            (Math.PI / 600) * Math.sin((elapsedTime / 8) * Math.PI);
          bonesStore.spine.position.y =
            (Math.PI / 400) * Math.sin((elapsedTime / 3) * Math.PI) + 0.1;
          bonesStore.spine.position.z =
            (Math.PI / 600) * Math.sin((elapsedTime / 3) * Math.PI);
        }

        vrmModel.update(elapsedTime);
      }
    }

    window.requestAnimationFrame(detectApplyMotion);
  }, [
    bonesStore,
    clock,
    faceLandmarker,
    videoElement,
    vrmModel,
    webcamStream,
    setXy,
  ]);

  useEffect(() => {
    if (videoElement) {
      videoElement.addEventListener('loadeddata', detectApplyMotion);
    }

    return () => {
      if (videoElement) {
        isCancelled.current = true;
        videoElement.removeEventListener('loadeddata', detectApplyMotion);
      }
    };
  }, [videoElement, vrmModel, detectApplyMotion, webcamStream]);

  return (
    <>
      {vrmModel && (
        <primitive
          ref={vrmModelRef}
          object={vrmModel.scene}
          rotation={[0, Math.PI, 0]}
          position={[0, -4.5, 1]}
          scale={3}
        />
      )}
    </>
  );
};
