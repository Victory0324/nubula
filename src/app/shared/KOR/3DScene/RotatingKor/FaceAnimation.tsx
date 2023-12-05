'use client';

import { Sphere } from '@react-three/drei';

import { TextureLoader } from 'three/src/loaders/TextureLoader';

import IdleAsset from '../assets/idle.png';
import LoadingAsset from '../assets/loading.jpg';
import PlaybackAsset from '../assets/playback.jpg';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box3, RepeatWrapping, Texture } from 'three';

const FPS = 120;
const SHEET_ROWS = 12;
const SHEET_COLUMNS = 12;

export const AnimationFrames = {
  idle: [0, 143],
  loading: [144, 287],
  playback: [287, 383],
};

const FaceAnimation = ({
  state,
  eyeColor,
}: {
  state: keyof typeof AnimationFrames;
  eyeColor: string;
}) => {
  const [eyesSetup, setEyesSetup] = useState(false);

  const eyeSurfaceRef = useRef<any>();

  const idleTextureRef = useRef<any>();
  const loadingTextureRef = useRef<any>();
  const playbackTextureRef = useRef<any>();

  const [animationPages, setAnimationPages] = useState<Texture[]>([]);

  const setFrame = useCallback(
    (frame: number) => {
      if (!eyeSurfaceRef.current?.material) return;

      const [start, end] = AnimationFrames[state];
      // round to integer
      frame = frame | 0;
      // Calculate total frames in range
      const totalFramesInRange = end - start + 1;
      // Make sure the frame is within [start, end]
      let relativeFrame = start + ((frame - start) % totalFramesInRange);
      if (relativeFrame > end) {
        relativeFrame = start;
      }
      // get corresponding animation page for the given frame
      const page = (relativeFrame / (SHEET_ROWS * SHEET_COLUMNS)) | 0;
      // get frame within page
      const frameInPage = relativeFrame % (SHEET_ROWS * SHEET_COLUMNS);

      // get frame position in sheet
      let fy = (frameInPage / SHEET_COLUMNS) | 0;
      let fx = frameInPage % SHEET_COLUMNS | 0;

      fx /= SHEET_COLUMNS;
      fy /= SHEET_ROWS;

      // assign the frame
      eyeSurfaceRef.current.material.map = animationPages[page];
      eyeSurfaceRef.current.material.map.offset.set(fy, fx);
    },
    [animationPages, state]
  );

  useEffect(() => {
    if (animationPages.length) return;

    const texLoader = new TextureLoader();

    const onLoad = (tex: Texture) => {
      tex.wrapS = tex.wrapT = RepeatWrapping;
      tex.repeat.set(1 / SHEET_ROWS, 1 / SHEET_COLUMNS);
    };

    idleTextureRef.current = texLoader.load(IdleAsset.src, onLoad);
    loadingTextureRef.current = texLoader.load(LoadingAsset.src, onLoad);
    playbackTextureRef.current = texLoader.load(PlaybackAsset.src, onLoad);

    setAnimationPages([
      idleTextureRef.current,
      loadingTextureRef.current,
      playbackTextureRef.current,
    ]);
  }, [animationPages.length]);

  const setupEyes = useCallback(() => {
    if (!eyeSurfaceRef.current || eyesSetup) return;

    let bounds = new Box3().setFromObject(eyeSurfaceRef.current);

    let p = eyeSurfaceRef.current.geometry.attributes.position.array;
    let u = eyeSurfaceRef.current.geometry.attributes.uv.array;
    for (let i = 0, j = 0; i < p.length; i += 3, j += 2) {
      let x = p[i];
      let y = p[i + 1];
      x = (x - bounds.min.x) / (bounds.max.x - bounds.min.x);
      y = (y - bounds.min.y) / (bounds.max.y - bounds.min.y);
      u[j] = x;
      u[j + 1] = y;

      p[i + 2] *= 0.1;
    }

    eyeSurfaceRef.current.geometry.attributes.position.needsUpdate = true;
    eyeSurfaceRef.current.geometry.attributes.uv.needsUpdate = true;

    eyeSurfaceRef.current?.material.color.set(eyeColor);

    setEyesSetup(true);
  }, [eyeColor, eyesSetup]);

  useEffect(() => {
    eyeSurfaceRef.current?.material.color.set(eyeColor);
  }, [eyeColor]);

  useFrame(() => {
    const time = performance.now();
    setupEyes();
    setFrame(time / FPS);
  });

  return (
    <Sphere ref={eyeSurfaceRef} args={[1, 64, 64]} position={[0, 0, 1.2]} />
  );
};

export default FaceAnimation;
