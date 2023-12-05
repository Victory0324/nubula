'use client';

import { useFrame, useThree } from '@react-three/fiber';

import { useCallback, useState } from 'react';
import Kor, { AnimationFrames } from './Kor';
import { Euler, Quaternion, Vector2 } from 'three';
import AnimatingKorModel from './AnimatingKor';

const RotatingKor = (props: {
  state: keyof typeof AnimationFrames;
  slug: string;
  eyeColor: string;
  kor?: Kor;
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const { viewport } = useThree();

  const followMouse = useCallback(
    (pointer: Vector2) => {
      const x = (pointer.x * viewport.width) / 2;
      const y = (pointer.y * viewport.height) / 2;

      const newX = -y * 0.05 - 0.1;
      const newY = x * 0.05;

      const currentEuler = new Euler(rotation.x, rotation.y, rotation.z, 'XYZ');
      const targetEuler = new Euler(newX, newY, rotation.z, 'XYZ');

      const currentQuaternion = new Quaternion().setFromEuler(currentEuler);
      const targetQuaternion = new Quaternion().setFromEuler(targetEuler);

      const rotationSpeed = 0.05;

      const resultQuaternion = new Quaternion();
      resultQuaternion.slerpQuaternions(
        currentQuaternion,
        targetQuaternion,
        rotationSpeed
      );

      const resultEuler = new Euler().setFromQuaternion(
        resultQuaternion,
        'XYZ'
      );

      setRotation(resultEuler);
    },
    [rotation.x, rotation.y, rotation.z, viewport.height, viewport.width]
  );

  useFrame(({ pointer }) => {
    followMouse(pointer);
  });

  return props.kor?.animationsAvailable ? (
    <AnimatingKorModel {...props} {...{ rotation }} />
  ) : (
    <Kor {...props} {...{ rotation }} />
  );
};

export default RotatingKor;
