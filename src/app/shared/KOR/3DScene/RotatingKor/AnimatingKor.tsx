'use client';

import FaceAnimation, { AnimationFrames } from './FaceAnimation';
import Kor from './Kor';

const AnimatingKorModel = ({
  kor,
  rotation,
  state,
  slug,
  eyeColor,
}: {
  kor?: Kor;
  rotation: { x: number; y: number; z: number };
  state: keyof typeof AnimationFrames;
  slug: string;
  eyeColor: string;
}) => {
  return (
    <Kor
      {...{
        kor,
        rotation,
        state,
        slug,
        eyeColor,
      }}
    >
      <FaceAnimation {...{ state, eyeColor }} />
    </Kor>
  );
};

export default AnimatingKorModel;
