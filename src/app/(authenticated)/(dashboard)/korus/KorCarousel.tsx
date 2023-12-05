import { useKors } from '@/app/providers/kors';
import KorListItem from './KorusSidebar/KorListItem';
import { useMemo } from 'react';

export default function KorCarousel({ className }: { className?: string }) {
  const { previewKorId, availableKors } = useKors();

  const kors = useMemo(
    () =>
      // assign index across all kors and then filter out duplicates
      availableKors
        .map((kor, index) =>
          kor.korUnlockId === previewKorId ? { kor, index } : undefined
        )
        .filter(
          (value, index, self) =>
            value &&
            index ===
              self.findIndex((t) => t?.kor.korAsset === value.kor.korAsset)
        ) as { kor: Kor; index: number }[],
    [availableKors, previewKorId]
  );

  return (
    <div
      className={`absolute bottom-0 mb-8 flex gap-4 overflow-x-scroll w-full px-[20px] max-w-full ${className}`}
    >
      {kors.map(({ kor, index }) => (
        <KorListItem {...{ kor, index }} inline key={kor.korUnlockId + index} />
      ))}
    </div>
  );
}
