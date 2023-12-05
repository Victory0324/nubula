import { useKors } from '@/app/providers/kors';
import { ScenZBackground } from '@/utils/types/scenz';
import { useMemo } from 'react';
import { Vector3 } from 'three';

export default function useSceneBackgrounds() {
  const { availableKors } = useKors();

  const allKorUnlockIds = useMemo(() => {
    return Array.from(
      new Set(availableKors.map(({ korUnlockId }) => korUnlockId))
    );
  }, [availableKors]);

  const backgrounds = useMemo(() => {
    return [
      { unlockIds: allKorUnlockIds, name: 'Blank' },
      {
        unlockIds: ['kor_genesis'],
        slug: 'kor_genesis',
        thumbnail: 'kor_genesis.png',
        name: 'GenKOR',
      },
      {
        unlockIds: ['kor_beatkor1'],
        slug: 'kor_beatkor1',
        thumbnail: 'kor_beatkor1.jpg',
        name: 'BeatKOR',
      },
      {
        unlockIds: allKorUnlockIds,
        name: 'Dreamy Diamond',
        custom: true,
        slug: 'dreamy-diamond',
        thumbnail: 'dreamy-diamond.png',
      },
      {
        unlockIds: allKorUnlockIds,
        name: 'Sunrise Serenity',
        custom: true,
        slug: 'sunrise-serenity',
        thumbnail: 'sunrise-serenity.png',
      },
      {
        unlockIds: allKorUnlockIds,
        name: 'Vapor Rave',
        custom: true,
        slug: 'vapor-rave',
        thumbnail: 'vapor-rave.png',
      },
      {
        unlockIds: allKorUnlockIds,
        name: 'Earth Child',
        custom: true,
        slug: 'earth-child',
        thumbnail: 'earth-child.png',
      },
      {
        unlockIds: allKorUnlockIds,
        name: 'Stinger',
        custom: true,
        slug: 'stinger',
        thumbnail: 'stinger.png',
      },
      {
        unlockIds: allKorUnlockIds,
        name: 'Brakdance',
        custom: true,
        slug: 'brakdance',
        thumbnail: 'brakdance.png',
      },
      {
        unlockIds: ['kor_broadkor1'],
        slug: 'brandkor',
        thumbnail: 'broadkor.png',
        name: 'BroadKOR',
        url: 'https://codesandbox.io/s/12nmp',
        author: 'Paul Henschel',
        modifiedDate: '11/20/2023',
        modifiedAuthor: 'Sean Tai',
        modifiedUrl: 'https://codesandbox.io/s/12nmp',
        defaultPosition: new Vector3(0, 0, 5),
      },
      {
        unlockIds: allKorUnlockIds,
        name: 'Teixido',
        custom: true,
        slug: 'teixido',
        thumbnail: 'teixido.jpg',
      },
      {
        unlockIds: ['kor_broadkor1'],
        name: 'BroadsideVRM',
        slug: 'broadsideVRM',
        thumbnail: 'broadsideVRM.jpg',
        defaultPosition: new Vector3(0, 0, 2.5),
      },
      {
        unlockIds: ['kor_broadkor1'],
        name: 'Webcam',
        slug: 'webcam',
        thumbnail: 'broadsideVRM.jpg',
        // defaultPosition: new Vector3(0, 0, 2.5),
      },
    ] as ScenZBackground[];
  }, [allKorUnlockIds]);

  return backgrounds;
}
