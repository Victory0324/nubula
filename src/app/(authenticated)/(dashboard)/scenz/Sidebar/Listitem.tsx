import { useCallback, useMemo } from 'react';
import { useKors } from '@/app/providers/kors';
import { useMints } from '@/app/providers/mints';
import LockIcon from '@/app/shared/assets/LockIcon';
import Tick from '@/app/shared/assets/Tick';
import Image from 'next/image';

import Loading from '@/app/shared/assets/Loading';
import { useBackgrounds } from '@/app/providers/backgrounds';
import { ScenZBackground } from '@/utils/types/scenz';

interface BackgroundListItemProps {
  background: ScenZBackground;
}

const BackgroundListItem = ({ background }: BackgroundListItemProps) => {
  const { korUnlockIds } = useKors();

  const {
    setPreviewKorForBackground,
    previewedBackground,
    setPreviewedBackground,
    selectedBackground,
    korsForBackground,
  } = useBackgrounds();

  const { loading } = useMints();

  const kors = useMemo(
    () => korsForBackground(background),
    [background, korsForBackground]
  );

  const locked = useMemo(() => {
    return (
      background.unlockIds &&
      !korUnlockIds?.some((id) => background.unlockIds?.includes(id))
    );
  }, [background.unlockIds, korUnlockIds]);

  const previewing = useMemo(
    () => previewedBackground === background,
    [background, previewedBackground]
  );

  const selected = useMemo(
    () => selectedBackground === background,
    [background, selectedBackground]
  );

  const handleSelect = useCallback(() => {
    setPreviewedBackground(background);
    setPreviewKorForBackground(background);
  }, [background, setPreviewKorForBackground, setPreviewedBackground]);

  const korPreviews = useMemo(() => {
    return kors
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.korImage === value.korImage && t.korName === value.korName
          )
      )
      .map(
        (kor) =>
          kor.korImage && (
            <Image
              src={kor.korImage}
              alt={kor.korName}
              width={32}
              height={32}
              key={kor.korUnlockId + kor.korImage}
            />
          )
      );
  }, [kors]);

  return (
    <div>
      <div
        className={`
        group
        flex flex-col
        relative justify-end
        h-[208px]
        
        rounded-xl
        items-center
        cursor-pointer
        ${locked && 'opacity-50 '}
        transition-opacity
        
        select-none
      `}
        onClick={handleSelect}
      >
        <div
          className={`w-full h-full rounded-md border border-gray-36 transition-colors ${
            previewing ? 'border-purple-9a' : 'group-hover:border-purple-9a/50'
          }`}
        >
          {background.thumbnail && (
            <Image
              className={`w-full h-full rounded-md border border-gray-36 transition-colors ${
                previewing
                  ? 'border-purple-9a'
                  : 'group-hover:border-purple-9a/50'
              }`}
              src={`/images/thumbnails/backgrounds/${background.thumbnail}`}
              alt={background.name}
              fill
            />
          )}
        </div>
        <div className='absolute top-0 left-0 w-full m-2'>
          <div className='relative w-full flex'>{korPreviews}</div>
        </div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          {background.slug ? (
            loading ? (
              <Loading className='text-white' />
            ) : locked ? (
              <LockIcon className='text-white' />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
        {selected && (
          <div
            className='
        absolute
        flex
        right-2 top-2

        px-1 py-1

        text-xs
        text-gray-999
        w-[30px]
        justify-center
        '
          >
            <Tick />
          </div>
        )}
      </div>
      <div className=' text-gray-999 z-[2] text-center mt-1'>
        {background.name}
      </div>{' '}
    </div>
  );
};

export default BackgroundListItem;
