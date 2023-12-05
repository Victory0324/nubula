import Sidebar from '@/app/shared/Sidebar';

import { useKors } from '@/app/providers/kors';

import KorListItem from './KorListItem';

import BuySelectButton from './BuySelectButton';
import { useMemo } from 'react';

const KorusSidebar = () => {
  const { availableKors } = useKors();

  const kors = useMemo(() => {
    const unlockIds: Record<string, boolean> = {};
    return availableKors
      .map((kor, index) => {
        if (unlockIds[kor.korUnlockId as keyof typeof unlockIds]) {
          return undefined;
        } else {
          unlockIds[kor.korUnlockId as keyof typeof unlockIds] = true;
          return { kor, index };
        }
      })
      .filter((kor) => kor !== undefined) as { kor: Kor; index: number }[];
  }, [availableKors]);

  return (
    <>
      <div className='px-5 py-5'>
        <div
          className='pb-3 text-xl items-center
        '
        >
          <div>Your KORs</div>
        </div>
      </div>
      <div className='px-5 overflow-y-scroll no-scrollbar flex-grow h-full'>
        <div className='grid grid-cols-2 gap-4 content-start'>
          {kors.map(({ kor, index }) => (
            <KorListItem {...{ kor, index }} key={kor.korUnlockId + index} />
          ))}
        </div>
      </div>
      <div className='hidden lg:block'>
        <div className='flex justify-center gap-4 max-sm:mt-8 mb-5'>
          <BuySelectButton />
        </div>
      </div>
    </>
  );
};

export default KorusSidebar;
