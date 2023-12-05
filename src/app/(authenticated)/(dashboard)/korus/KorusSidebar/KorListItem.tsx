import Image from 'next/image';

import { useMemo } from 'react';
import { useKors } from '@/app/providers/kors';
import LockIcon from '@/app/shared/assets/LockIcon';
import Tick from '@/app/shared/assets/Tick';
import { useBackgrounds } from '@/app/providers/backgrounds';
import { useMobileTray } from '@/app/providers/mobileTray';
import MobileKorPreview from './MobileKorPreview';

interface KorListItemProps {
  kor: Kor;
  index: number;
  inline?: boolean;
}

const KorListItem: React.FC<KorListItemProps> = ({
  kor,
  inline = false,
  index,
}) => {
  const {
    previewKorId,
    previewKorIndex,
    selectedKorId,
    selectedKorIndex,
    setPreviewKorId,
    setPreviewKorIndex,
    getKorCount,
    getKorCountByAsset,
  } = useKors();
  const { setPreviewBackgroundForKor } = useBackgrounds();
  const { openTray, setContent } = useMobileTray();

  const previewSelected = useMemo(() => {
    return (
      previewKorId === kor.korUnlockId &&
      (inline ? previewKorIndex === index : true)
    );
  }, [index, inline, kor.korUnlockId, previewKorId, previewKorIndex]);

  const selected = useMemo(() => {
    return (
      selectedKorId === kor.korUnlockId &&
      (inline ? selectedKorIndex === index : true)
    );
  }, [selectedKorId, kor.korUnlockId, inline, selectedKorIndex, index]);

  const count = useMemo(() => {
    return inline
      ? getKorCountByAsset(kor.korAsset)
      : getKorCount(kor.korUnlockId);
  }, [getKorCount, getKorCountByAsset, inline, kor.korAsset, kor.korUnlockId]);

  const locked = useMemo(() => kor.isLocked, [kor]);

  const handleClick = () => {
    setPreviewKorId(kor.korUnlockId);
    setPreviewKorIndex(index);

    setPreviewBackgroundForKor(kor);

    // if on mobile
    if (window.innerWidth < 1025) {
      setContent(<MobileKorPreview />);
      openTray();
    }
  };

  return (
    <div
      className={`
        flex flex-col
        relative justify-center
        ${inline ? 'h-[118px] w-[132px] backdrop-blur shrink-0' : 'h-[208px]'}
        border border-gray-36
        rounded-xl
        items-center
        cursor-pointer
        ${locked && 'opacity-50 '}
        transition-all
        ${previewSelected ? 'border-purple-9a' : 'hover:border-purple-9a/50'}
        select-none
      `}
      onClick={handleClick}
    >
      {locked && (
        <div className='absolute'>
          <LockIcon className='text-white' />
        </div>
      )}
      {
        <div
          className={`
        absolute
        flex
        left-2 top-2
        border border-gray-36
        p-1
        rounded-full
        text-xs
        text-gray-999
        w-[25px]
        h-[25px]
        justify-center items-center
        `}
        >
          {count}
        </div>
      }
      {selected && (
        <div
          className={`
        absolute
        flex
        ${inline ? 'right-0 top-0' : 'right-2 top-2'}

        px-1 py-1

        text-xs
        text-gray-999
        w-[30px]
        justify-center
        `}
        >
          <Tick />
        </div>
      )}
      <div className='self-center'>
        {kor.korImage && (
          <Image
            src={kor.korImage}
            alt='kor'
            width={inline ? 88 : 128}
            height={inline ? 88 : 150}
          />
        )}
      </div>
      <div className={`text-gray-999 ${inline ? 'text-xs' : ''}`}>
        {kor.korName}
      </div>
    </div>
  );
};

export default KorListItem;
