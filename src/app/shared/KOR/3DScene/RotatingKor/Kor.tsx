'use client';

import { useGLTF } from '@react-three/drei';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GLTF } from 'three-stdlib/loaders/GLTFLoader';

export const AnimationFrames = {
  idle: [0, 143],
  loading: [144, 287],
  playback: [287, 383],
};

const ScaleMap: { [key: string]: number } = {
  kor_genesis: 2,
  kor_beatkor1: 0.02,
  Keyboard_Wooden: 7,
};

const KorModel = ({
  kor,
  rotation,
  slug,
  children,
}: {
  kor?: Kor;
  rotation: { x: number; y: number; z: number };
  slug: string;
  children?: JSX.Element;
}) => {
  const getAssetPath = useCallback(() => {
    return kor ? `api/proxy?path=${kor.korAsset}` : `renderings/${slug}.glb`;
  }, [kor, slug]);

  const [glb, setGlb] = useState<GLTF>();
  const loadedModel = useGLTF(getAssetPath());

  useEffect(() => {
    loadedModel.userData.scale = ScaleMap[slug];
    setGlb(loadedModel);
  }, [loadedModel, slug]);

  const groupRef = useRef<any>();

  useEffect(() => {
    groupRef.current?.rotation.set(rotation.x, rotation.y, rotation.z);
  }, [rotation.x, rotation.y, rotation.z]);

  return glb ? (
    <group ref={groupRef}>
      {children}
      <primitive object={glb.scene} scale={glb.userData.scale} />
    </group>
  ) : (
    <></>
  );
};

export default KorModel;
