'use client';

import { useCallback, useMemo, useState } from 'react';
import Heart from '@/app/shared/assets/Heart';
import { useStems } from '../../providers/stems';
import {
  canTemporarilyUnlock,
  getStemFavorited,
  getStemTitle,
} from '@/utils/helpers/stems';
import Pill from '@/app/shared/Pill';
import { useOutputTrack } from '@/app/providers/outputTrack';
import usePatchStem from '@/utils/hooks/stems/usePatchStem';
import DownArrow from '@/app/shared/assets/DownArrow';
import { useAnalytics } from '@/app/providers/analytics';
import SmallCoin from '@/app/shared/assets/SmallCoin';
import LockIcon from '@/app/shared/assets/LockIcon';
import { useModal } from '@ebay/nice-modal-react';
import UnlockStemWithNoizModal from '../UnlockStemWithNoizModal';
import { useIsStemUnlocked } from '@/utils/hooks/stems/useIsStemUnlocked';

export const EXPANDED_TOOLTIP_HEIGHT = 175;

export default function StemDetails({
  stem,
  corner,
  expandDown,
}: {
  stem?: InputStem;
  corner: string;
  expandDown: boolean;
}) {
  const isStemUnlocked = useIsStemUnlocked();
  const unlockModal = useModal(UnlockStemWithNoizModal);
  const patchStem = usePatchStem();

  const { createTrack, creating } = useOutputTrack();
  const { inventoryStems } = useStems();
  const { track } = useAnalytics();

  const [expanded, setExpanded] = useState(false);

  const isUnlocked = useMemo(
    () => isStemUnlocked(stem),
    [isStemUnlocked, stem]
  );

  const title = useMemo(() => {
    return getStemTitle(inventoryStems, stem);
  }, [inventoryStems, stem]);

  const favorited = useMemo(() => {
    return getStemFavorited(inventoryStems, stem);
  }, [inventoryStems, stem]);

  const corners = useMemo(() => {
    switch (corner) {
      case 'br':
        return 'rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl';
      case 'bl':
        return 'rounded-br-2xl rounded-tl-2xl rounded-tr-2xl';
      case 'tl':
        return 'rounded-br-2xl rounded-bl-2xl rounded-tr-2xl';
      case 'tr':
        return 'rounded-br-2xl rounded-bl-2xl rounded-tl-2xl';
      case 'all':
        return 'rounded-2xl';
      default:
        return 'rounded-none';
    }
  }, [corner]);

  const handleFavorite = useCallback(() => {
    if (!stem) return;

    patchStem({
      stem,
      title: stem.trackTitle,
      shouldFavorite: true,
    });
  }, [patchStem, stem]);

  const handleUnlock = useCallback(() => {
    if (!stem || !canTemporarilyUnlock(stem)) return;

    unlockModal.show({ unlockId: stem.unlockId });
  }, [stem, unlockModal]);

  if (!stem) return;

  return (
    <div
      className={`bg-gray-1e ${corners} p-5 relative transition-height ease-in-out overflow-hidden ${
        expanded
          ? expandDown
            ? isUnlocked
              ? 'h-[170px]'
              : 'h-[240px]'
            : isUnlocked
            ? 'top-[-120px]'
            : 'top-[-210px]'
          : isUnlocked
          ? 'h-[65px]'
          : 'h-[56px]'
      }`}
    >
      <div className='bg-gray-cc h-2 absolute top-0 left-0 right-0'></div>
      <div className='flex gap-4 items-center shrink-0 border-b border-gray-42 pb-4'>
        <div
          className={`flex gap-4 justify-between items-center shrink-0 grow w-full ${
            isUnlocked ? 'mr-4' : ''
          }`}
        >
          <div className='flex gap-2 items-center'>
            <div
              className={`${
                expanded ? 'rotate-180' : ''
              } transition-transform duration-300 cursor-pointer`}
              onClick={() => setExpanded(!expanded)}
            >
              <DownArrow />
            </div>
            {title}
            <button className='scale-75' onClick={handleFavorite}>
              <Heart
                className={`${
                  favorited ? 'text-purple-9a' : 'hover-purple text-white/25'
                }`}
              />
            </button>
          </div>
          <div className='flex gap-2 items-center'>
            {isUnlocked ? (
              <Pill
                disabled={creating}
                onClick={() => {
                  track({
                    category: 'stem',
                    action: 'click_create',
                    name: stem.itemId,
                  });
                  createTrack();
                }}
              >
                <span className='max-sm:hidden ml-2 mt-1'>CREATE</span>
                <DownArrow className='-rotate-90' />
              </Pill>
            ) : (
              <LockIcon
                className={`text-white/25 ${
                  canTemporarilyUnlock(stem)
                    ? 'hover-purple'
                    : 'hover:cursor-not-allowed'
                }`}
                onClick={handleUnlock}
              />
            )}
          </div>
        </div>
      </div>
      {expanded && (
        <div>
          <div className={`flex flex-col gap-2 my-4`}>
            <div className='capitalize text-xs text-white/50'>
              {stem.category}
            </div>
            <div className='capitalize text-xs text-white/50'>{stem.genre}</div>
            <div className='capitalize text-xs text-white/50'>
              {stem.korDisplayName}
            </div>

            {!isUnlocked && (
              <>
                <div className='flex gap-2 items-center'>
                  <SmallCoin />
                  <span className='font-bold text-[15px]'>50</span>
                </div>
                <button
                  disabled={!canTemporarilyUnlock(stem)}
                  className='btn btn-secondary w-full flex justify-center items-center rounded-full border-white bg-transparent'
                  onClick={handleUnlock}
                >
                  Get
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
